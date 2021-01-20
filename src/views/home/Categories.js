import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styles from "./styles.module.scss"
import Img from "gatsby-image"
import { useIntl } from "react-intl"

const Categories = () => {
  const categories = useStaticQuery(graphql`
    query categories {
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
    <section className={styles.categoriesWrapper}>
      <h1>Main Categories</h1>
      <ul className={styles.categoriesList}>
        {categories?.allMarkdownRemark?.edges?.map(
          ({ node: { frontmatter: category } }) => (
            <li className={styles.categoryListItem} key={category?.id}>
              <Link to={`/${intl?.locale}/${category?.id}`}>
                <Img
                  // fluid={{category?.image?.childImageSharp?.fluid}, aspectRatio: 21 / 9}
                  fluid={{
                    ...category?.image?.childImageSharp?.fluid,
                    aspectRatio: 1 / 1,
                  }}
                  alt={category?.imageAlt}
                />
              </Link>
              <h3>{category?.title}</h3>
            </li>
          )
        )}
      </ul>
    </section>
  )
}

export default Categories
