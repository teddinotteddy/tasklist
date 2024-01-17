import { GeistSans } from 'geist/font/sans'
import { CookiesProvider } from "next-client-cookies/server"
import './globals.css'

export const metadata = {
  title: 'Tasklist',
  description: 'Simple and swift task management.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CookiesProvider>
        <body className={GeistSans}>{children}</body>
      </CookiesProvider>
    </html>
  )
}
