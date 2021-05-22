
import Head from 'next/head'
import { useEffect, useState } from 'react'
import LayoutComponent from '../components/Layout'
import '../styles/globals.css'



function MyApp({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(false)
  const handleDark = () => {
    setIsDark(!isDark)
    localStorage.setItem('dark', !isDark)
  }
  useEffect(() => {
    const check = JSON.parse(localStorage.getItem('dark'))
    setIsDark(check)
  }, [])

  return (
    <>

      <div className={isDark ? 'app dark  ' : 'app '}>
        <LayoutComponent>
          <Head>
            <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet' />

          </Head>
          <Component {...pageProps} />
          <div className="checkbox">
            <input
              type="checkbox"
              checked={isDark}
              onChange={() => handleDark()}
            />
          </div>
        </LayoutComponent>
      </div>
    </>
  )
}

export default MyApp
