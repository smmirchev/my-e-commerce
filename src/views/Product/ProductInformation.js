import React, { useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Reviews from "@components/reviews"
import styles from "./styles.module.scss"
import { upperCase } from "@functions/functions"
import { BASKET } from "@functions/api"
import { updateUser } from "@store/user"

const ProductInformation = ({ titleEn, reviews, price, category, id }) => {
  const token = localStorage.getItem("e-commerce-token")
  const dispatch = useDispatch()

  const addToBasket = async () => {
    try {
      const { data } = await axios.post(
        BASKET,
        { productId: id, quantity: 1 },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      dispatch(updateUser(data))
    } catch (error) {
      console.log(error)
    }
  }

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
      <button onClick={() => addToBasket()}>Add to basket</button>
    </section>
  )
}

export default ProductInformation
