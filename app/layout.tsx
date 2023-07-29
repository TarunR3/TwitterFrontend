import Sidebar from '@/components/Sidebar'
import Rightbar from '@/components/Rightbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '@/components/auth/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Twitter 2',
  description: 'Twitter 2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider>
        <div className="flex bg-black">
          <Sidebar></Sidebar>
          <div className="flex-grow">{children}</div>
          <Rightbar/>
        </div>
        </Provider>
      </body>
    </html>
  );
}