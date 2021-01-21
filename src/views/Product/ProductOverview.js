import React from "react"
import styles from "@views/Product/styles.module.scss"
import Img from "gatsby-image/withIEPolyfill"

const ProductOverview = ({ imageAlt, image, description }) => {
  return (
    <section>
      <div className={styles.overviewImageContainer}>
        <Img
          fluid={{
            ...image?.childImageSharp?.fluid,
            aspectRatio: 1 / 1,
          }}
          alt={imageAlt}
          objectFit="cover"
          objectPosition="50% 0"
        />
      </div>
      <div>
        <h2>Product Overview</h2>
        <p>{description}</p>
      </div>
    </section>
  )
}

export default ProductOverview
