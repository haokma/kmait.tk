
import Head from 'next/head';
import { useState } from 'react';
import blogApi from '../apis/blogApi';
import Card from '../components/Card';
import CardHead from '../components/CardHead';
export async function getStaticProps(context) {
  const fetchInfo = {
    limit: 6,
    page: 1
  }
  const res = await blogApi.getBlogs(fetchInfo)
  const { blogs, totalPage } = res.data
  if (!blogs) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data: blogs, totalPage },
    revalidate: 1
  }
}
export default function Home({ data, totalPage }) {
  const [blogs, setBlogs] = useState(data)
  const [page, setPage] = useState(1)
  const loadMore = () => {
    blogApi.getBlogs({ limit: 6, page: page + 1 })
      .then((res) => {
        setBlogs([...blogs, ...res.data.blogs])
        setPage(page + 1)
      })
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Chia sẻ kiến thức về lập trình và An toàn thông tin"
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
        <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet' />
        <title>KmaIT - Lập trình & An Toàn Thông Tin  Blog</title>
      </Head>
      <div className="content-wrapper">
        <div className="container" >
          <div className="row" style={{ paddingTop: '5rem' }}>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <CardHead blog={blogs[0]} />
            </div>
          </div>
          <div className="row" style={{ paddingTop: '5rem' }} >
            {blogs.map((blog, index) => {
              if (index > 0) {
                return (
                  <div className="col-xl-4 col-md-6" key={index}>
                    <Card blog={blog} />
                  </div>
                )
              }
            })}
          </div>
          {
            page < totalPage ? (<div className="load-more">
              <button onClick={() => loadMore()}>
                Xem thêm
            </button>
            </div>) : null
          }
        </div>
      </div>
    </>
  )
}
