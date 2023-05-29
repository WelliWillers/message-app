import { LoaderContextProvider } from '@/app/contexts/LoaderContext'
import './globals.css'
import ToasterContext from './contexts/ToasterContext'

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
        <body>
          <ToasterContext />
          {children}
        </body>
      </html>
    </LoaderContextProvider>
  )
}
