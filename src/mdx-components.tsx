import type { MDXComponents } from 'mdx/types'
import { mdxComponents } from '@portal-dev/ui'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxComponents,
  }
}
