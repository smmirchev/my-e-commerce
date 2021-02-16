import { useIntl } from "gatsby-plugin-intl"
import React from "react"
import Img from "gatsby-image/withIEPolyfill"
import styles from "@views/Product/styles.module.scss"

const ProductOverview = ({ imageAlt, image, description }) => {
  const intl = useIntl()
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
        <h2>
          {intl.formatMessage({
            id: "page.productTemplate.productOverview",
          })}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: description.html }} />
      </div>
    </section>
  )
}

export default ProductOverview
