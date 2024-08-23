import FlexSearch from 'flexsearch'
import { type Section } from '../components/navigation/table-of-contents'
import { type SearchOptions } from 'flexsearch'

export type Result = {
  url: string
  title: string
  pageTitle?: string
}

export type Search = {
  index: FlexSearch.Document<unknown, string[]>
  content: { [url: string]: Section[] }
}

const createIndex = () =>
  new FlexSearch.Document({
    tokenize: 'full',
    document: {
      id: 'url',
      index: ['title', 'pageTitle', 'content', 'children:title', 'children:content'],
      store: ['title', 'pageTitle'],
    },
    context: {
      resolution: 9,
      depth: 3,
      bidirectional: true,
    },
  })

// using IIFE, to ensure we have only one instance of the index
const getIndex = (() => {
  let instance: FlexSearch.Document<unknown, string[]> | null = null

  return () => {
    if (!instance) {
      instance = createIndex()
    }
    return instance
  }
})()

export const populate = (allSections: Search['content']) => {
  const index = getIndex()

  for (const url in allSections) {
    const sections = allSections[url]

    for (const section of sections) {
      index.add({
        url: url + (section.tagName !== 'h1' ? '#' + section.id : ''),
        title: section.title,
        pageTitle: section.title,
        content: [
          section.title,
          section.content,
          ...(section.children ?? []).map((child) => child.content),
        ].join('\n'),
      })

      // Index children separately to allow direct access to sub-sections
      for (const child of section.children ?? []) {
        index.add({
          url: url + '#' + child.id,
          title: child.title,
          pageTitle: section.title,
          content: [child.title, child.content].join('\n'),
        })
      }
    }
  }

  return index
}

export function search(query: string, options: SearchOptions = {}): Result[] {
  const index = getIndex()
  const result = index.search(query, {
    ...options,
    enrich: true,
  })

  if (result.length === 0) {
    return []
  }

  return result[0].result.map((item) => ({
    // @ts-expect-error
    url: item.id,
    // @ts-expect-error
    title: item.doc.title,
  }))
}
