import Link from 'next/link'
import React from 'react'
import styles from './Footer.module.css'
const Footer = ({ blogs }) => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-5 col-md-5">
            <div className={styles.footerItem}>
              <h4 className={styles.footerItemTitle}>
                Về chúng tôi
              </h4>
              <p className={styles.footerItemDesc}>
                HaoLux là trang blog được thành lập bởi Nguyễn  Hào chuyên về các chủ đề  lập trình và phát triển bản thân.Blog đề cập đến các bài tập được thày cô giao trên trường HVKTMM.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className={styles.footerItem}>
              <h4 className={styles.footerItemTitle}>
                Bài viết mới nhất
              </h4>
              <ul className={styles.footerListblog}>
                {
                  blogs.map((blog) => {
                    return (
                      <li className={styles.footerItemBlog}>
                        <Link href={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-2">
            <div className={styles.footerItem}>
              <h4 className={styles.footerItemTitle}>
                Liên hệ
              </h4>
              <ul className={styles.footerList}>
                <li className={styles.footerListItem}>
                  <i className='bx bxl-facebook-circle'></i>
                </li>
                <li className={styles.footerListItem}>
                  <i className='bx bxl-twitter' ></i>
                </li>
                <li className={styles.footerListItem}>
                  <i className='bx bxl-github' ></i>
                </li>
                <li className={styles.footerListItem}>
                  <i className='bx bxl-linkedin-square' ></i>
                </li>
                <li className={styles.footerListItem}>
                  <i className='bx bxl-instagram' ></i>
                </li>
                <li className={styles.footerListItem}>
                  <i className='bx bxl-youtube' ></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
