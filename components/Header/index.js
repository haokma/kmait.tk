

import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from './Header.module.css'
const Header = ({ categories }) => {
  const router = useRouter()
  const [isNav, setIsNav] = useState(false)
  return (
    <div className={styles.header}>
      <div className={styles.headerMain}>
        <div className="container">
          <div className={styles.headerFlex}>
            <div className={styles.headerButton} onClick={() => setIsNav(true)}>
              <i className='bx bx-menu'></i>
            </div>
            <div className={styles.headerLogo}
              onClick={() => router.push('/')}
            >
              <h1>KmaIT</h1>
            </div>
            <div className={styles.headerSearch}>
              <i className='bx bx-search-alt-2'></i>
            </div>
            <div className={!isNav ? `${styles.modal}` : `${styles.modal} ${styles.active}`}
              onClick={() => setIsNav(false)}
            >
            </div>
            <ul className={isNav ? `${styles.headerNavList} ${styles.active}` : `${styles.headerNavList}`}>
              {
                categories.map((category, index) => {
                  return (
                    <li
                      onClick={() => setIsNav(false)}
                      className={styles.headerNavItem}
                      key={index}
                      className={router.asPath == `/category/${category.slug}` ?
                        `${styles.headerNavItem} ${styles.active}` : `${styles.headerNavItem}`
                      }
                    >
                      <Link href={{
                        pathname: `/category/${category.slug}`,
                      }}

                      >
                        {category.name}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Header
