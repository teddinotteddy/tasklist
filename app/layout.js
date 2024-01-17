import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata = {
  title: 'Tasklist',
  description: 'Simple and swift task management.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={GeistSans}>{children}</body>
    </html>
  )
}
