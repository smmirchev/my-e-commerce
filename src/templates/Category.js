import React from "react"
import { graphql } from "gatsby"
import SEO from "@components/SEO"
import Layout from "@components/Layout"
import Products from "@views/Category/Products"
import styles from "./styles.module.scss"
import Container from "@components/Container"

const Category = ({ data }) => {
  const post = data?.markdownRemark
  return (
    <Layout>
      <SEO title={post?.frontmatter?.title} />
      <Container>
        <h1 className={styles.templateHeading}>{post?.frontmatter?.title}</h1>
        <Products
          currentCategory={data?.markdownRemark?.frontmatter?.id}
          repeat={true}
        />
      </Container>
    </Layout>
  )
}

export default Category

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        id
      }
    }
  }
`
