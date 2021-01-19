import React from "react"
import { graphql } from "gatsby"
import SEO from "@components/SEO"
import Layout from "@components/Layout"

const Product = ({ data }) => {
  const post = data?.markdownRemark
  return (
    <Layout>
      <SEO title={post?.frontmatter?.nameEn} />
      <h1>{post?.frontmatter?.nameEn}</h1>
    </Layout>
  )
}

export default Product

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        nameEn: name_en
        id
      }
    }
  }
`
