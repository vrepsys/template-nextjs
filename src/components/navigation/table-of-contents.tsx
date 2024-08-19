'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { classes } from '@portal-dev/ui'

export type Section = {
  id: string
  title: string
  tagName: string
  content: string
  children?: Section[]
}

type Heading = {
  id: string
  top: number
}

type Props = {
  sections: Section[]
}

export const TableOfContents = (props: Props) => {
  const { sections: rootSections } = props
  const sections = rootSections?.[0]?.children || []
  const [currentSectionId, setCurrentSectionId] = useState(sections?.[0]?.id)
  const scrollHandlerLocked = useRef(false)

  const makeHeadings = useCallback(
    (sections: Section[]): Heading[] =>
      sections
        .flatMap((node) => [node.id, ...(node.children?.map((child) => child.id) || [])])
        .map((id) => {
          const el = document.getElementById(id)
          if (!el) {
            return null
          }

          const style = window.getComputedStyle(el)
          const scrollMt = parseFloat(style.scrollMarginTop)
          const top = window.scrollY + el.getBoundingClientRect().top - scrollMt
          return { id, top }
        })
        .filter((h): h is Heading => h !== null),
    [],
  )

  useEffect(() => {
    if (sections.length === 0) {
      return
    }

    const headings = makeHeadings(sections)

    const handleScroll = () => {
      if (scrollHandlerLocked.current) {
        return
      }

      const top = window.scrollY
      let current = headings[0].id

      for (const heading of headings) {
        if (top >= heading.top - 80) {
          current = heading.id
        } else {
          break
        }
      }

      setCurrentSectionId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections, makeHeadings])

  const isActive = (section: Section) => section.id === currentSectionId || false

  const setActive = (sectionId: string) => {
    scrollHandlerLocked.current = true
    setCurrentSectionId(sectionId)
  }

  useEffect(() => {
    if (scrollHandlerLocked.current) {
      const timeout = setTimeout(() => (scrollHandlerLocked.current = false), 400)
      return () => clearTimeout(timeout)
    }
  }, [currentSectionId])

  if (sections.length === 0) {
    return null
  }

  return (
    <nav>
      <h2 className="text-portal-content-heading py-1.5 text-sm font-bold">On this page</h2>

      <ul role="list">
        {sections.map((section) => (
          <Li
            key={section.id}
            section={section}
            active={isActive(section)}
            onClick={() => setActive(section.id)}
          >
            {section.children && section.children.length > 0 && (
              <ul role="list">
                {section.children.map((subSection) => (
                  <Li
                    key={subSection.id}
                    section={subSection}
                    active={isActive(subSection)}
                    onClick={() => setActive(subSection.id)}
                  />
                ))}
              </ul>
            )}
          </Li>
        ))}
      </ul>
    </nav>
  )
}

type LiProps = {
  section: Section
  active: boolean
  onClick: () => void
  children?: React.ReactNode
}

const Li = ({ section, active, onClick, children }: LiProps) => (
  <li className="text-sm">
    <Link
      href={`#${section.id}`}
      onClick={onClick}
      className={classes(
        'inline-block py-0.5',
        active
          ? 'text-portal-content-button-selected font-semibold'
          : 'text-portal-content-button hover:text-portal-content-button-hover',
      )}
    >
      {section.title}
    </Link>

    {children}
  </li>
)
