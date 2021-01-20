import React from "react"
import SEO from "@components/SEO"
import Layout from "@components/Layout"
import Categories from "@views/home/Categories"
import styles from "@views/home/styles.module.scss"
import Container from "@components/Container"
import Cta from "@views/home/Cta"
import FeaturedProducts from "@views/home/FeaturedProducts"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
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

export default IndexPage
