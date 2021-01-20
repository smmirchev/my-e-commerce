import React from "react"
import Products from "@views/Category/Products"
import styles from "./styles.module.scss"

const FeaturedProducts = () => {
  return (
    <section className={styles.featuredWrapper}>
      <Products currentCategory="featured" />
    </section>
  )
}

export default FeaturedProducts
