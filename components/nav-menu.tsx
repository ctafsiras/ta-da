/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/tM6PkqtpWAi
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { JSX, SVGProps } from "react"

export function NavMenu() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 border-b">
      <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
        <MountainIcon className="h-6 w-6" />
        <span>TA/DA Bill Management Software</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/bills">
          Bills
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/personnels">
          Personnel
        </Link>
      </nav>
    </header>
  )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
