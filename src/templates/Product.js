import React from "react"
import { graphql } from "gatsby"
import SEO from "@components/SEO"
import Layout from "@components/Layout"
import styles from "@views/Product/styles.module.scss"
import Container from "@components/Container"
import ProductOverview from "@views/Product/ProductOverview"
import ProductInformation from "@views/Product/ProductInformation"

const Product = ({ data }) => {
  const product = data?.markdownRemark?.frontmatter
  return (
    <Layout>
      <SEO title={product?.nameEn} />
      <Container>
        <div className={styles.productContainer}>
          <ProductOverview
            imageAlt={product?.imageAlt}
            image={product?.image}
            description={product?.description}
          />
          <ProductInformation
            titleEn={product?.nameEn}
            reviews={product?.reviews}
            price={product?.price}
          />
        </div>
      </Container>
    </Layout>
  )
}

export default Product

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        id: product_id
        categoryId: category_id
        nameEn: name_en
        nameFr: name_fr
        nameDe: name_de
        reviews
        price
        description
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
`
