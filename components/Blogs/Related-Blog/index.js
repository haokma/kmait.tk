import React from 'react'
import Card from '../../Card'
import styles from './RelatedBlog.module.css'
const RelateBlog = ({ blogRelated }) => {
  return (
    <div className={styles.relatedBlog}>
      <h3 className={styles.relatedBlogTitle}>
        Bài viết liên quan
      </h3>
      <div className="row">
        {
          blogRelated.map((blog, index) => {
            return (
              <div key={index} className="col-xl-6">
                <Card blog={blog} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default RelateBlog
