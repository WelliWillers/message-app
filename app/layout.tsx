import { LoaderContextProvider } from '@/contexts/LoaderContext'
import './globals.css'

export const metadata = {
  title: 'Messanger clone',
  description: 'teste',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LoaderContextProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </LoaderContextProvider>
  )
}
