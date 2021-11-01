import moment from "moment";
import Link from "next/link";
import React from "react";
import renderHTML from "react-render-html";
import styles from "./Card.module.css";
import Image from "next/image";
const Card = ({ blog }) => {
  return (
    <div>
      <div className={styles.card}>
        <Link href={`/blog/${blog.slug}`}>
          <div className={styles.cardImg}>
            <Image
              src={blog.photo[0].img}
              alt="Image Title Blog"
              layout="fill"
            />
          </div>
        </Link>
        <div className={styles.cardMain}>
          <h3 className={styles.cardTitle}>
            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h3>
          <div className={styles.cardDate}>
            <i className="bx bx-calendar-alt"></i>{" "}
            {moment(blog.createdAt).format("L")}
          </div>
          <p className={styles.cardDesc}>{renderHTML(blog.excerpt)}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
