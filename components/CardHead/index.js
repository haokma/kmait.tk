import Link from 'next/link'
import React from 'react'
import renderHTML from 'react-render-html'
import styles from './CardHead.module.css'
import Image from 'next/image'
const CardHead = ({ blog }) => {
  return (
    <div className={styles.cardHead}>
      <div className="row">
        <div className="col-xl-7 col-lg-6 ">
          <div className={styles.cardHeadImg}>
            <Image
              src={blog.photo[0].img}
              alt="Image Title Blog"
              width={600}
              height={350}
              layout="responsive"
            />
          </div>
        </div>
        <div className="col-xl-5 col-lg-6">
          <div className={styles.cardHeadRight}>
            <h3 className={styles.cardHeadTitle}>
              <Link href={`/blog/${blog.slug}`}>
                {blog.title}
              </Link>
            </h3>
            <p className={styles.cardHeadDesc}>
              {renderHTML(blog.excerpt)}
            </p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default CardHead
