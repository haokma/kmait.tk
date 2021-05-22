import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sass";
import React, { useEffect } from 'react';
import renderHTML from 'react-render-html';
import blogApi from '../../apis/blogApi';
import RelateBlog from '../../components/Blogs/Related-Blog';
import styles from './blog.module.css';
import Image from 'next/image'

export async function getStaticPaths() {
  const res = await blogApi.getBlogs(40)
  const { blogs } = res.data
  const paths = blogs.map((blog) => {
    return {
      params: {
        slug: blog.slug
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
  const res = await blogApi.getBlog(slug)
  const { blog, relatedBlogs } = res.data
  if (!blog) {
    return {
      notFound: true,
    }
  }
  return {
    props: { blog, relatedBlogs },
    revalidate: 1
  }
}
const Blog = ({ blog = {}, relatedBlogs }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  useEffect(() => {
    Prism.highlightAll()
  }, [blog])
  return (
    <>
      <Head>
        <title>
          {blog.title} | KmaIT.Com
        </title>
        <meta name="description" content={blog.excerpt} />
        <link rel="canonical" href={`${'https://www.kmait.tk/'}blogs/${blog.slug}`} />
        <meta property="og:title" content={`${blog.title} | ${'KmaIT.Com'}`} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${'https://www.kmait.tk/'}blogs/${blog.slug}`} />
        <meta property="og:site_name" content={`${'KmaIT.Com'}`} />
        <meta property="og:image" content={`${blog.photo[0].img || 'https://www.kmait.tk/static/images/haolux.jpg'}`} />
        <meta property="og:image:secure_url" content={`${blog.photo[0].img || 'https://www.kmait.tk/static/images/haolux.jpg'}`} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="fb:app_id" content={`${'123124'}`} />
      </Head>
      <div className={styles.blogWrapper} >
        <div className='container-blog'>
          <div className={styles.blog}>
            <div className={styles.blogThumbnail}>
              <Image
                src={blog.photo[0].img}
                alt="Image Title Blog"
                width={1100}
                height={600}
              />
              <div className={styles.blogThumbnailAuthor}>

                <img src="https://duclux.com/static/images/avatar.svg" alt="" />
                <div>
                  <span>Tác giả</span>
                  <p>{blog.postedBy.name}</p>
                </div>
              </div>
            </div>

            <h1 className={styles.blogTitle}>
              <Link href={`/blog/${blog.slug}`}>
                {blog.title}
              </Link>
            </h1>
            <div className={styles.blogDate}>
              <div>
                <span>Ngày đăng</span> <span className={styles.blogDateTime}>{moment(blog.createdAt).format('L')}</span>
              </div>
              <div><span>2 phút đọc</span></div>
              <div><span>223 lượt xem</span></div>
            </div>
            <div className={styles.blogContent}>
              {renderHTML(blog.content)}
            </div>
          </div>
          {relatedBlogs ? <div className={styles.blogRelatedWrapper}>
            <RelateBlog blogRelated={relatedBlogs} />
          </div> : null}
        </div>
      </div>
    </>
    // <h1>Blog Details</h1>
  )
}

export default Blog




