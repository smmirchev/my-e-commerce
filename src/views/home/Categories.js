import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styles from "./styles.module.scss"
import Img from "gatsby-image"
import { useIntl } from "react-intl"

const Categories = () => {
  const categories = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/categories/" } }
      ) {
        edges {
          node {
            frontmatter {
              id
              title
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

  const intl = useIntl()

  return (
    <div className={styles.categoriesWrapper}>
      <h1>Main Categories</h1>
      <div className={styles.categoriesContent}>
        {categories?.allMarkdownRemark?.edges?.map(
          ({ node: { frontmatter: category } }) => (
            <div className={styles.categoryContainer} key={category?.id}>
              <Link to={`/${intl?.locale}/${category?.id}`}>
                <Img
                  fluid={category?.image?.childImageSharp?.fluid}
                  alt={category?.imageAlt}
                />
                <h3>{category?.title}</h3>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Categories
