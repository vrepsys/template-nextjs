import { NavTree } from './types'

export const NAV_TREE: NavTree = [
  {
    type: 'category',
    name: 'Getting started',
    children: [
      {
        type: 'link',
        name: 'Introduction',
        href: '/',
      },
      {
        type: 'link',
        name: 'Quick start',
        href: '/quick-start',
      },
      {
        type: 'link',
        name: 'Best practices',
        href: '/best-practices',
      },
    ],
  },
  {
    type: 'category',
    name: 'Content',
    children: [
      {
        type: 'link',
        name: 'Page structure',
        href: '/page-structure',
      },
      {
        type: 'link',
        name: 'Components',
        href: '/components',
      },
    ],
  },
  {
    type: 'category',
    name: 'Configuration',
    children: [
      {
        type: 'link',
        name: 'Search',
        href: '/search',
      },
      {
        type: 'folder',
        name: 'Styling',
        children: [
          {
            type: 'link',
            name: 'Overview',
            href: '/styling/overview',
          },
          {
            type: 'link',
            name: 'CSS variables',
            href: '/styling/css-variables',
          },
          {
            type: 'link',
            name: 'Branding images',
            href: '/styling/branding-images',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    name: 'Playground',
    children: [
      {
        type: 'link',
        name: 'Stress tests',
        href: '/playground',
      },
    ],
  },
]
