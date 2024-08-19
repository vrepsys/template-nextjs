'use client'

import { classes } from '@portal-dev/ui'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { SidenavProvider, useSideNav } from './sidenav-context'
import { NavTree } from './types'

type Props = {
  tree: NavTree
}

const SidenavCategory = ({ item, level }: { item: TreeNode; level: number }) => {
  return (
    <div className="flex flex-col">
      <div className="text-portal-content-heading py-1.5 text-sm font-medium" aria-hidden>
        {item.name}
      </div>
      <ul className="flex flex-col" aria-label={item.name}>
        <SidenavItems items={item.children} level={level} />
      </ul>
    </div>
  )
}

const FolderItem = ({
  url,
  className,
  onClick,
  children,
}: {
  url?: string
  className: string
  onClick: () => void
  children: ReactNode
}) => {
  return url ? (
    <Link className={className} onClick={onClick} href={url}>
      {children}
    </Link>
  ) : (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  )
}

const hasChildWithPathname = (item: TreeNode, pathname: string): boolean => {
  if (item.href === pathname) {
    return true
  }
  if (item.children) {
    return item.children.some((child) => hasChildWithPathname(child, pathname))
  }
  return false
}

const SidenavFolder = ({ item, level }: { item: TreeNode; level: number }) => {
  const pathname = usePathname()
  const { isExpanded, expandByHref, toggleExpandFolder } = useSideNav()
  useEffect(() => {
    expandByHref(pathname)
  }, [pathname])
  const active = hasChildWithPathname(item, pathname)
  const expanded = isExpanded(item.path)
  return (
    <li className="flex flex-col">
      <FolderItem
        onClick={() => {
          // For folders that don't have a page -- every click triggers expand toggle
          // For folders with a page -- we prevent the collapse and just open
          // the page if folder is already expanded
          if (!item.href || !expanded || active) {
            toggleExpandFolder(item.path)
          }
        }}
        className={classes(
          'relative flex cursor-pointer flex-row items-center justify-between py-1.5 text-sm transition',
          active
            ? 'font-semibold'
            : 'text-portal-content-button hover:text-portal-content-button-hover active:translate-y-[1px]',
        )}
      >
        {level !== 0 && active && (
          <div
            aria-hidden={true}
            className={classes('bg-portal-accent absolute bottom-0 left-[-17px] top-0 w-[1px]')}
          />
        )}
        <span>{item.name}</span>
        <span
          className={classes(
            'text-portal-content-icon shrink-0 transform transition-transform',
            expanded ? 'rotate-90' : 'rotate-0',
          )}
        >
          <ChevronRight size={16} />
        </span>
      </FolderItem>
      <FolderContents item={item} level={level} expanded={expanded} />
    </li>
  )
}

const FolderContents = ({
  expanded,
  item,
  level,
}: {
  expanded: boolean
  item: TreeNode
  level: number
}) => {
  return (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.ul
          role="list"
          layoutScroll
          className="border-portal-border flex flex-col overflow-y-clip border-l pl-4"
          aria-label={item.name}
          transition={{ duration: 0.15 }}
          initial={{ height: 0, opacity: 0.7 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0.7 }}
        >
          <SidenavItems items={item.children} level={level + 1} />
        </motion.ul>
      )}
    </AnimatePresence>
  )
}

const SidenavLink = ({ item, level }: { item: TreeNode; level: number }) => {
  const pathname = usePathname()
  const isActive = item.href === pathname
  return (
    <li
      className={classes(
        'relative flex cursor-pointer text-sm transition',
        isActive
          ? 'text-portal-content-button-selected font-semibold'
          : 'text-portal-content-button hover:text-portal-content-button-hover active:translate-y-[1px]',
      )}
    >
      {level !== 0 && isActive && (
        <div
          aria-hidden={true}
          className="bg-portal-content-button-selected absolute bottom-0 left-[-17px] top-0 w-[1px]"
        />
      )}
      <Link className="w-full py-1.5" href={item.href!}>
        {item.name}
      </Link>
    </li>
  )
}

const SidenavItems = ({ items, level }: { items: TreeNode[]; level: number }) => {
  return (
    <>
      {items.map((item) => {
        if (item.type === 'category') {
          return <SidenavCategory key={item.path} item={item} level={level} />
        } else if (item.type === 'folder') {
          return <SidenavFolder key={item.path} item={item} level={level} />
        } else {
          return <SidenavLink key={item.path} item={item} level={level} />
        }
      })}
    </>
  )
}

export const SideNav = ({ tree }: Props) => {
  const node = generateTree(tree)
  return (
    <SidenavProvider tree={node}>
      <nav>
        <ul className="flex flex-col gap-6 pr-3">
          <SidenavItems items={node} level={0} />
        </ul>
      </nav>
    </SidenavProvider>
  )
}

export type TreeNode = {
  name: string
  type: 'category' | 'link' | 'folder'
  path: string
  href?: string
  children: TreeNode[]
}

function generateTree(tree: NavTree): TreeNode[] {
  let counter = 0
  const generate = (tree: NavTree, parentPath: string = ''): TreeNode[] => {
    return [
      ...tree.map((item) => {
        const { type, name } = item
        const path = `${parentPath}/${++counter}`
        if (type === 'link' || type === 'folder') {
          const children = type === 'folder' ? generate(item.children, path) : []
          return {
            type,
            name,
            href: item.href,
            path,
            children,
          }
        }
        return {
          name,
          path,
          type,
          children: generate(item.children, path),
        }
      }),
    ]
  }
  return generate(tree)
}
