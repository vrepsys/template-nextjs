import { withPortal } from '@portal-dev/core'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['@portal-dev/ui'],
}

export default withPortal(nextConfig)
