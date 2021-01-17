import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import styles from "./styles.module.scss"
import Img from "gatsby-image"

const Products = ({ currentCategory }) => {
  const products = useStaticQuery(graphql`
    query products {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/products/" } }) {
        edges {
          node {
            frontmatter {
              id: product_id
              categoryId: category_id
              name
              description
              reviews
              price
              imageAlt
              image {
                childImageSharp {
                  fluid(maxWidth: 300) {
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

  return (
    <div className={styles.productsWrapper}>
      <ul className={styles.productList}>
        {products?.allMarkdownRemark?.edges
          ?.filter(
            ({ node: { frontmatter: filteredProduct } }) =>
              filteredProduct?.categoryId === currentCategory
          )
          .map(({ node: { frontmatter: product } }) => (
            <li className={styles.listItem} key={product?.id}>
              <Link to={`/${product?.categoryId}/${product?.id}`}>
                <div className={styles.imageContainer}>
                  <Img
                    fluid={product?.image?.childImageSharp?.fluid}
                    alt={product?.imageAlt}
                  />
                </div>
                <h3>{product?.name}</h3>
              </Link>
            </li>
          ))}
        {/*  */}
        {products?.allMarkdownRemark?.edges
          ?.filter(
            ({ node: { frontmatter: filteredProduct } }) =>
              filteredProduct?.categoryId === currentCategory
          )
          .map(({ node: { frontmatter: product } }) => (
            <li className={styles.listItem} key={product?.id}>
              <Link to={`/${product?.categoryId}/${product?.id}`}>
                <div className={styles.imageContainer}>
                  <Img
                    fluid={product?.image?.childImageSharp?.fluid}
                    alt={product?.imageAlt}
                  />
                </div>
                <h3>{product?.name}</h3>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Products
