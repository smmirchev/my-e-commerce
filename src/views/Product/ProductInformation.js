import React from "react"
import Reviews from "@components/reviews"
import styles from "./styles.module.scss"

const ProductInformation = ({ titleEn, reviews, price }) => {
  return (
    <section className={styles.informationContainer}>
      <h1>{titleEn}</h1>
      <Reviews reviewsNumber={reviews} />
      <p className={styles.price}>£{price}</p>
    </section>
  )
}

export default ProductInformation
