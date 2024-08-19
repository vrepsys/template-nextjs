import Link from 'next/link'
import { DiscordIcon, GithubIcon, XIcon } from '../icons'

const iconStyle = 'fill-portal-content-tertiary hover:fill-portal-content transition'

export const Footer = () => {
  return (
    <div className="border-portal-border mt-16 w-full border-t">
      <div className="relative mx-auto flex w-full items-center justify-between py-4">
        <div className="text-portal-content-label text-portal-body-sm">© Copyright 2024.</div>
        <div className="flex gap-3">
          <Link href="#">
            <DiscordIcon className="fill-portal-content-label hover:fill-portal-content-body transition" />
          </Link>
          <Link href="#">
            <XIcon className="fill-portal-content-label hover:fill-portal-content-body transition" />
          </Link>
          <Link href="#">
            <GithubIcon className="fill-portal-content-label hover:fill-portal-content-body transition" />
          </Link>
        </div>
      </div>
    </div>
  )
}
