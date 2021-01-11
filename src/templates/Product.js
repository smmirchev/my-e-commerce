import React from "react"
import { graphql } from "gatsby"
import SEO from "@components/SEO"
import Layout from "@components/Layout"

const Product = ({ data }) => {
  const post = data?.markdownRemark
  return (
    <Layout>
      <SEO title={post?.frontmatter?.name} />
      <h1>{post?.frontmatter?.name}</h1>
    </Layout>
  )
}

export default Product

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        name
        id
      }
    }
  }
`
