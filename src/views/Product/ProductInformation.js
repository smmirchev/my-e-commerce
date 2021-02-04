import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Reviews from "@components/reviews"
import styles from "./styles.module.scss"
import { upperCase } from "@functions/functions"

const ProductInformation = ({ titleEn, reviews, price, category }) => {
  return (
    <section className={styles.informationContainer}>
      <h1>{titleEn}</h1>
      <p className={styles.category}>Category: {upperCase(category)}</p>
      <Reviews reviewsNumber={reviews} />
      <hr />
      <p className={styles.price}>£{price}</p>
      <hr />
      <p className={styles.quantityText}>Quantity</p>
      <div className={styles.quantityInputContainer}>
        <input id="quantity" type="text" value={" "} name="quantity" />
        <p>1</p>
        <button>
          <FontAwesomeIcon icon="plus" className={styles.fontAwesomeIcon} />
        </button>
      </div>
      <hr />
      <button>Add to basket</button>
    </section>
  )
}

export default ProductInformation
