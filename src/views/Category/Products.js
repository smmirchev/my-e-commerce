import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import styles from "./styles.module.scss"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Products = ({ currentCategory, repeat = false }) => {
  const products = useStaticQuery(graphql`
    query products {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/products/" } }) {
        edges {
          node {
            frontmatter {
              id: product_id
              categoryId: category_id
              nameEn: name_en
              description
              reviews
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
          filteredProduct?.categoryId === currentCategory
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
              />
            </div>
            <h3>{product?.nameEn}</h3>
            <div className={styles.listItemMiddle}>
              <div>
                <FontAwesomeIcon
                  icon="star"
                  className={styles.fontAwesomeIcon}
                />
                <FontAwesomeIcon
                  icon="star"
                  className={styles.fontAwesomeIcon}
                />
                <FontAwesomeIcon
                  icon="star"
                  className={styles.fontAwesomeIcon}
                />
                <FontAwesomeIcon
                  icon="star"
                  className={styles.fontAwesomeIcon}
                />
              </div>
              <p>({product?.reviews})</p>
            </div>
            <p className={styles.price}>£{product?.price}</p>
          </Link>
        </li>
      ))

  return (
    <div className={styles.productsWrapper}>
      <ul className={styles.productList}>
        <ProductItem />
        {repeat && <ProductItem />}
        {repeat && <ProductItem />}
      </ul>
    </div>
  )
}

export default Products
