import { NavTree } from './types'

export const NAV_TREE: NavTree = [
  {
    type: 'category',
    name: 'Section title one',
    children: [
      {
        type: 'link',
        name: 'Page one',
        href: '/',
      },
      {
        type: 'link',
        name: 'Page two',
        href: '/page-2',
      },
    ],
  },
  {
    type: 'category',
    name: 'Section title two',
    children: [
      {
        type: 'link',
        name: 'Page three',
        href: '/page-3',
      },
    ],
  },
]
