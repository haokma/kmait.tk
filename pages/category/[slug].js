import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import blogApi from '../../apis/blogApi'
import { categoriesApi } from '../../apis/categoriesApi'
import Card from '../../components/Card'
import styles from './category.module.css'
export async function getStaticPaths() {
  const res = await categoriesApi.getCategories()
  const { category } = res.data
  const paths = category.map((category) => {
    return {
      params: {
        slug: category.slug
      }
    }
  })
  return {
    paths,
    fallback: true
  };
}
export async function getStaticProps(context) {
  const { slug } = context.params
  const fetchInfo = {
    slug,
    page: 1,
    limit: 9
  }
  const res = await blogApi.getBlogCategory(fetchInfo)
  const { blogs, totalPage } = res.data
  if (!blogs) {
    return {
      notFound: true,
    }
  }
  return {
    props: { data: blogs, slug, totalPage },
    revalidate: 1
  }
}
const CategoryPage = ({ data, slug, totalPage }) => {
  const [page, setPage] = useState(1)
  const [blogs, setBlogs] = useState(data)
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const loadMore = () => {
    blogApi.getBlogCategory({ limit: 9, page: page + 1, slug })
      .then((res) => {
        console.log(res);
        setBlogs([...blogs, ...res.data.blogs])
        setPage(page + 1)
      })
  }
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Chia sẻ kiến thức về Lập trình và An toàn thông tin"
        />
        <meta property="og:title" content={`Lập trình và An toàn thông tin | ${'KmaIT.tk'}`} />
        <meta
          property="og:description"
          content="Blog chia sẻ kiến thức Lập trình và An toàn thông tin"
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:image" content={`${'https://www.kmait.tk/'}/static/images/haolux.jpg`} />
        <meta property="og:image:secure_url" content={`${'https://www.kmait.tk/'}/static/images/haolux.jpg`} />
        <meta property="og:image:type" content="image/jpg" />
        <title className="meta_title" >KmaIT.Com - {router.query.slug}</title>
      </Head>
      <div className={styles.categoryWrapper}>
        <div className="container">
          <div className="row">
            {blogs.map((blog, index) => {
              return (
                <div
                  className="col-xl-4 col-lg-4 col-md-6"
                  key={index}
                >
                  <Card blog={blog} />
                </div>
              )
            })}
          </div>
          {page < totalPage ? (<div className="load-more">
            <button onClick={() => loadMore()}>
              Xem thêm
          </button>
          </div>) : null}
        </div>
      </div>
    </>
  )
}

export default CategoryPage
