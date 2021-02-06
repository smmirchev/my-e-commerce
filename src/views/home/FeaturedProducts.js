import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import Img from "gatsby-image/withIEPolyfill"
import Reviews from "@components/reviews"
import styles from "@views/Category/styles.module.scss"

const FeaturedProducts = () => {
  const products = useStaticQuery(graphql`
    query featuredProducts {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/products/" } }) {
        edges {
          node {
            frontmatter {
              id: product_id
              categoryId: category_id
              nameEn: name_en
              reviews
              featured
              price
              imageAlt
              image {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const ProductItem = () =>
    products?.allMarkdownRemark?.edges
      ?.filter(
        ({ node: { frontmatter: filteredProduct } }) =>
          filteredProduct?.featured === true
      )
      .map(({ node: { frontmatter: product } }) => (
        <li className={styles.listItem} key={product?.id}>
          <Link to={`/${product?.categoryId}/${product?.id}`}>
            <div className={styles.imageContainer}>
              <Img
                // fluid={product?.image?.childImageSharp?.fluid}
                fluid={{
                  ...product?.image?.childImageSharp?.fluid,
                  aspectRatio: 1 / 1,
                }}
                alt={product?.imageAlt}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>
            <h3>{product?.nameEn}</h3>
            <Reviews reviewsNumber={product?.reviews} />

            <p className={styles.price}>£{product?.price}</p>
          </Link>
        </li>
      ))

  return (
    <section className={styles.featuredWrapper}>
      <div className={styles.productsWrapper}>
        <ul className={styles.productList}>
          <ProductItem />
        </ul>
      </div>
    </section>
  )
}

export default FeaturedProducts
