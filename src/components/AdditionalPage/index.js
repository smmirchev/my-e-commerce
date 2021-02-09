import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Container from "@components/Container/"
import styles from "./styles.module.scss"

const AdditionalPage = ({ title }) => {
  const data = useStaticQuery(graphql`
    query additionalPage {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/privacy-policy/" } }
      ) {
        edges {
          node {
            html
          }
        }
      }
    }
  `)
  const content = data?.allMarkdownRemark?.edges?.[0]?.node?.html

  return (
    <div className={styles.additionalPageWrapper}>
      <Container>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </div>
  )
}

export default AdditionalPage
