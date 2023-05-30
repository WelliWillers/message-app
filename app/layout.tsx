import { LoaderContextProvider } from '@/app/contexts/LoaderContext'
import './globals.css'
import ToasterContext from './contexts/ToasterContext'
import AuthContext from './contexts/AuthContext'

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
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        </body>
      </html>
    </LoaderContextProvider>
  )
}
