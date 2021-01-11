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
    <div>
      {products?.allMarkdownRemark?.edges
        ?.filter(
          ({ node: { frontmatter: filteredProduct } }) =>
            filteredProduct?.categoryId === currentCategory
        )
        .map(({ node: { frontmatter: product } }) => (
          <div key={product?.id}>
            <h3>{product?.name}</h3>
            <Link to={`/${product?.categoryId}/${product?.id}`}>
              <Img
                fluid={product?.image?.childImageSharp?.fluid}
                alt={product?.imageAlt}
              />
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Products
