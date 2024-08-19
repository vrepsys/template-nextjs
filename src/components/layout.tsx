'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './navigation/footer'
import { NAV_TREE } from './navigation/navigation'
import { SideNav } from './navigation/sidenav'
import { TableOfContents } from './navigation/table-of-contents'
import { TopNav } from './navigation/topnav'
import { useSearchIndex } from './search-index-context'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  const pathname = usePathname()
  const sections = useSearchIndex()[pathname] || []

  return (
    <>
      <TopNav />

      <main className="w-full">
        <div className="max-w-portal-width-site px-portal-padding-site-sides md:pr-portal-padding-site-sides relative mx-auto flex w-full md:pl-0">
          <div className="border-r-portal-border bg-portal-background-sidenav py-portal-padding-article-top pl-portal-padding-site-sides w-portal-width-sidenav top-portal-height-topnav sticky hidden h-[calc(100vh-var(--portal-height-topnav))] shrink-0 flex-col overflow-auto border-r md:flex">
            <SideNav tree={NAV_TREE} />
          </div>

          <article className="portal-content md:px-portal-padding-article-sides mb-64 min-w-0 flex-1">
            {children}
            <Footer />
          </article>

          <div className="pt-portal-padding-article-top w-portal-width-table-of-contents top-portal-height-topnav sticky hidden h-[calc(100vh-var(--portal-height-topnav))] shrink-0 flex-col lg:flex">
            <TableOfContents sections={sections} />
          </div>
        </div>
      </main>
    </>
  )
}
