import Link from 'next/link'
import { ThemeToggle } from '../theme-toggle'
import { Search } from './search'

const linkStyle =
  'text-portal-content-button hover:text-portal-content-button-hover active:translate-y-[1px] flex cursor-pointer px-2 py-1.5 text-sm transition text-nowrap'
const buttonStyle =
  'text-portal-content-button hover:text-portal-content-button-hover bg-portal-background-button hover:bg-portal-background-button-hover active:translate-y-[1px] flex cursor-pointer rounded px-2 py-1.5 text-sm transition text-nowrap'

const Logo = ({ className }: { className: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.5858 30.4142L13.4143 39.5858C12.1543 40.8457 13.0467 43 14.8285 43H33.1716C34.9534 43 35.8458 40.8457 34.5858 39.5858L25.4143 30.4142C24.6332 29.6332 23.3669 29.6332 22.5858 30.4142Z"
      fill="currentColor"
    />
    <path
      d="M45 24C45 27.6465 44.0706 31.0759 42.4357 34.0643C40.8453 36.9714 36.9497 36.9497 34.6066 34.6066L29.6569 29.6569C28.4853 28.4853 28.6114 26.5511 28.9151 24.9223C28.9709 24.6234 29 24.3151 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 24.3151 19.0291 24.6234 19.0849 24.9223C19.3886 26.5511 19.5147 28.4853 18.3431 29.6569L13.3934 34.6066C11.0503 36.9497 7.15466 36.9714 5.56427 34.0643C3.92941 31.0759 3 27.6465 3 24C3 12.402 12.402 3 24 3C35.598 3 45 12.402 45 24Z"
      fill="currentColor"
    />
  </svg>
)

export const TopNav = () => (
  <header className="bg-portal-background-topbar border-b-portal-border h-portal-height-topnav sticky top-0 z-10 flex w-full border-b py-2">
    <div className="max-w-portal-width-site px-portal-padding-site-sides relative mx-auto flex w-full items-center justify-between lg:gap-8">
      <div className="flex shrink-0 items-center gap-2 md:w-[calc(var(--portal-width-sidenav)-var(--portal-padding-site-sides))] lg:flex-1">
        <Link href="/" className="flex items-center gap-1 text-nowrap font-semibold">
          <Logo className="text-portal-accent mr-0.5" />
          Portal docs
          <span className="text-portal-accent"></span>
        </Link>
      </div>

      <Search />

      <nav className="hidden items-center justify-end gap-2 lg:flex lg:flex-1">
        <Link href="#" className={linkStyle}>
          Support
        </Link>
        <Link href="https://app.dhub.dev/signup" target="dhub" className={linkStyle}>
          Create account
        </Link>
        <hr className="bg-portal-border h-4 w-px border-none" />
        <ThemeToggle />
        <Link href="https://app.dhub.dev/login" target="dhub" className={buttonStyle}>
          Sign in
        </Link>
      </nav>
    </div>
  </header>
)
