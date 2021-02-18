import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import SEO from "@components/SEO.js"
import Layout from "@components/Layout"
import Categories from "@views/home/Categories"
import styles from "@views/home/styles.module.scss"
import Container from "@components/Container"
import Cta from "@views/home/Cta"
import FeaturedProducts from "@views/home/FeaturedProducts"

const IndexPage = () => {
  const intl = useIntl()

  return (
    <Layout>
      <SEO
        title={intl.formatMessage({
          id: "page.home.title",
        })}
      />
      <div className={styles.homeWrapper}>
        <Container>
          <Categories />
        </Container>
        <Cta />
        <Container>
          <FeaturedProducts />
        </Container>
      </div>
    </Layout>
  )
}

export default IndexPage
