import React from "react"
import { useIntl } from "react-intl"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import styles from "@views/category/styles.module.scss"
// import Img from "gatsby-image"
import Img from "gatsby-image/withIEPolyfill"
import Reviews from "@components/reviews"

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
              nameDe: name_de
              nameFr: name_fr
              description
              reviews
              price
              imageAlt
              image {
                childImageSharp {
                  fluid(maxWidth: 1100) {
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
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>
            <h3>
              {intl?.locale === "de"
                ? product?.nameDe
                : intl?.locale === "fr"
                ? product?.nameFr
                : product?.nameEn}
            </h3>
            <Reviews reviewsNumber={product?.reviews} />

            <p className={styles.price}>£{product?.price}</p>
          </Link>
        </li>
      ))

  return (
    <div className={styles.productsWrapper}>
      <h1 className={styles.templateHeading}>Products</h1>
      <ul className={styles.productList}>
        <ProductItem />
        {repeat && <ProductItem />}
        {repeat && <ProductItem />}
      </ul>
    </div>
  )
}

export default Products
