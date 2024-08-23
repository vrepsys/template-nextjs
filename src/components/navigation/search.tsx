'use client'

import { forwardRef, Suspense, useCallback, useEffect, useId, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  type AutocompleteApi,
  type AutocompleteCollection,
  type AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import {
  Search as SearchIcon,
  SearchX as NoResultsIcon,
  LoaderCircle as LoadingIcon,
} from 'lucide-react'
import { classes } from '@portal-dev/ui'
import { type Result, populate, search } from '@/components/search-index'
import { useSearchIndex } from '../search-index-context'

type EmptyObject = Record<string, never>
type Autocomplete = AutocompleteApi<
  Result,
  React.SyntheticEvent,
  React.MouseEvent,
  React.KeyboardEvent
>

function useAutocomplete({ close }: { close: () => void }) {
  const id = useId()
  const router = useRouter()
  const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<Result> | EmptyObject
  >({})

  function navigate({ itemUrl }: { itemUrl?: string }) {
    if (!itemUrl) {
      return
    }

    router.push(itemUrl)

    if (itemUrl === window.location.pathname + window.location.search + window.location.hash) {
      close()
    }
  }

  const [autocomplete] = useState<Autocomplete>(() =>
    createAutocomplete<Result, React.SyntheticEvent, React.MouseEvent, React.KeyboardEvent>({
      id,
      placeholder: 'Find something...',
      defaultActiveItemId: 0,
      onStateChange({ state }) {
        setAutocompleteState(state)
      },
      shouldPanelOpen({ state }) {
        return state.query !== ''
      },
      navigator: { navigate },
      getSources({ query }) {
        return [
          {
            sourceId: 'documentation',
            getItems: () => search(query, { limit: 5 }),
            getItemUrl: ({ item }) => item.url,
            onSelect: navigate,
          },
        ]
      },
    }),
  )

  return { autocomplete, autocompleteState }
}

const HighlightQuery = ({ text, query }: { text: string; query: string }) => (
  <Highlighter
    highlightClassName="bg-transparent font-bold text-inherit"
    searchWords={[query]}
    autoEscape={true}
    textToHighlight={text}
  />
)

type SearchResultProps = {
  result: Result
  resultIndex: number
  autocomplete: Autocomplete
  collection: AutocompleteCollection<Result>
  query: string
}

const SearchResult = ({
  result,
  resultIndex,
  autocomplete,
  collection,
  query,
}: SearchResultProps) => {
  const id = useId()

  return (
    <li
      className="group block"
      aria-labelledby={`${id}-hierarchy ${id}-title`}
      {...autocomplete.getItemProps({
        item: result,
        source: collection.source,
      })}
    >
      <div
        id={`${id}-title`}
        aria-hidden="true"
        className={classes(
          'cursor-default px-6 py-4 font-normal text-portal-content-label group-aria-selected:bg-portal-background-dialog-selected group-aria-selected:text-portal-content-body',
          resultIndex > 0 && 'border-t border-portal-border-dialog',
        )}
      >
        <HighlightQuery text={result.title} query={query} />
      </div>
    </li>
  )
}

type SearchResultsProps = {
  autocomplete: Autocomplete
  query: string
  collection: AutocompleteCollection<Result>
}

const SearchResults = ({ autocomplete, query, collection }: SearchResultsProps) => {
  if (collection.items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-8">
        <NoResultsIcon size={16} aria-hidden="true" className="text-portal-content-icon" />

        <p className="text-portal-content-body">
          Nothing found for{' '}
          <strong className="break-words font-semibold">&lsquo;{query}&rsquo;</strong>. Please try
          again.
        </p>
      </div>
    )
  }

  return (
    <ul {...autocomplete.getListProps()}>
      {collection.items.map((result, resultIndex) => (
        <SearchResult
          key={result.url}
          result={result}
          resultIndex={resultIndex}
          autocomplete={autocomplete}
          collection={collection}
          query={query}
        />
      ))}
    </ul>
  )
}

const SearchInput = forwardRef<
  React.ElementRef<'input'>,
  {
    autocomplete: Autocomplete
    autocompleteState: AutocompleteState<Result> | EmptyObject
    onClose: () => void
  }
>(function SearchInput({ autocomplete, autocompleteState, onClose }, inputRef) {
  const inputProps = autocomplete.getInputProps({ inputElement: null })

  return (
    <div className="group relative flex items-center rounded pl-6">
      <SearchIcon size={16} aria-hidden="true" className="text-portal-content-icon" />

      <input
        ref={inputRef}
        data-autofocus
        className={classes(
          'flex-auto appearance-none bg-transparent py-4 pl-4 pr-6 text-portal-content-body outline-none placeholder:text-portal-content-label focus:w-full [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden',
          autocompleteState.status === 'stalled' ? 'pr-11' : 'pr-4',
        )}
        {...inputProps}
        onKeyDown={(event) => {
          if (
            event.key === 'Escape' &&
            !autocompleteState.isOpen &&
            autocompleteState.query === ''
          ) {
            // In Safari, closing the dialog with the escape key can sometimes cause the scroll position to jump to the
            // bottom of the page. This is a workaround for that until we can figure out a proper fix in Headless UI.
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur()
            }

            onClose()
          } else {
            inputProps.onKeyDown(event)
          }
        }}
      />
      {autocompleteState.status === 'stalled' && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <LoadingIcon
            aria-hidden="true"
            size={16}
            className="h-5 w-5 animate-spin text-portal-content-icon"
          />
        </div>
      )}
    </div>
  )
})

const SearchDialog = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const formRef = useRef<React.ElementRef<'form'>>(null)
  const panelRef = useRef<React.ElementRef<'div'>>(null)
  const inputRef = useRef<React.ElementRef<typeof SearchInput>>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { autocomplete, autocompleteState } = useAutocomplete({
    close: () => setOpen(false),
  })

  useEffect(() => {
    setOpen(false)
  }, [pathname, searchParams, setOpen])

  useEffect(() => {
    if (open) {
      return
    }

    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, setOpen])

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
        autocomplete.setQuery('')
      }}
      className="fixed inset-0 z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-portal-background-dialog-overlay backdrop-blur data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
        <DialogPanel
          transition
          className="mx-auto transform-gpu overflow-hidden rounded-md bg-portal-background-dialog shadow-lg ring-1 ring-portal-outline-dialog data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:max-w-xl"
        >
          <div {...autocomplete.getRootProps({})}>
            <form
              ref={formRef}
              {...autocomplete.getFormProps({
                inputElement: inputRef.current,
              })}
            >
              <SearchInput
                ref={inputRef}
                autocomplete={autocomplete}
                autocompleteState={autocompleteState}
                onClose={() => setOpen(false)}
              />

              <div
                ref={panelRef}
                className="border-t border-portal-border-dialog empty:hidden"
                {...autocomplete.getPanelProps({})}
              >
                {autocompleteState.isOpen && (
                  <SearchResults
                    autocomplete={autocomplete}
                    query={autocompleteState.query}
                    collection={autocompleteState.collections[0]}
                  />
                )}
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

const KeyBadge = ({ text }: { text: string }) => (
  <kbd className="rounded bg-portal-background-keyboard px-1 font-sans text-xs font-semibold text-portal-content-label">
    {text}
  </kbd>
)

export const Search = () => {
  const [modifierKey, setModifierKey] = useState<string>()
  const searchIndex = useSearchIndex()
  const buttonRef = useRef<React.ElementRef<'button'>>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    populate(searchIndex)
    setModifierKey(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl')
  }, [])

  return (
    <>
      <button
        type="button"
        className="hidden w-full cursor-pointer items-center gap-2 rounded bg-portal-background-button px-2 py-1.5 text-sm text-portal-content-button transition hover:bg-portal-background-button-hover hover:text-portal-content-button-hover active:translate-y-[1px] md:mx-portal-padding-article-sides md:flex lg:flex-1"
        ref={buttonRef}
        onClick={() => setOpen(true)}
      >
        <SearchIcon aria-hidden="true" size={16} className="text-portal-content-icon" />
        Search
        {modifierKey && (
          <span className="ml-auto flex gap-0.5">
            <KeyBadge text={modifierKey} />
            <KeyBadge text="K" />
          </span>
        )}
      </button>

      <Suspense fallback={null}>
        <SearchDialog
          open={open}
          setOpen={useCallback(
            (open: boolean) => {
              const { width = 0, height = 0 } = buttonRef.current?.getBoundingClientRect() ?? {}

              if (!open || (width !== 0 && height !== 0)) {
                setOpen(open)
              }
            },
            [setOpen],
          )}
        />
      </Suspense>
    </>
  )
}
