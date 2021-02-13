import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Reviews from "@components/reviews"
import styles from "./styles.module.scss"
import { upperCase } from "@functions/functions"
import { BASKET } from "@functions/api"
import { updateUser } from "@store/user"

const ProductInformation = ({ titleEn, reviews, price, category, id }) => {
  const token = localStorage.getItem("e-commerce-token")
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [queryQuantity, setQueryQuantity] = useState(1)
  const regExp = new RegExp("^\\d+$")

  const addToBasket = async () => {
    let quantity = 1
    if (!!queryQuantity) quantity = parseInt(queryQuantity)
    try {
      const { data } = await axios.post(
        BASKET,
        { productId: id, quantity: quantity, productPrice: price },
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

  useEffect(() => {
    if (!!queryQuantity) {
      if (!regExp?.test(queryQuantity)) setQueryQuantity(1)
      if (queryQuantity > 99) setQueryQuantity(99)
    }
  }, [queryQuantity])

  return (
    <section className={styles.informationContainer}>
      {console.log(queryQuantity)}
      <h1>{titleEn}</h1>
      <p className={styles.category}>Category: {upperCase(category)}</p>
      <Reviews reviewsNumber={reviews} />
      <hr />
      <p className={styles.price}>£{price}</p>
      <hr />
      <p className={styles.quantityText}>Quantity</p>
      <div className={styles.quantityInputContainer}>
        <input
          id="quantity"
          type="text"
          value={queryQuantity}
          name="quantity"
          onChange={e => {
            setQueryQuantity(e?.target?.value)
          }}
        />
        <p>{!!queryQuantity ? queryQuantity : 1}</p>
        <button onClick={() => setQueryQuantity(query => parseInt(query) + 1)}>
          <FontAwesomeIcon icon="plus" className={styles.fontAwesomeIcon} />
        </button>
      </div>
      <hr />
      {!!user?._id ? (
        <button className={styles.basketButton} onClick={() => addToBasket()}>
          Add to basket
        </button>
      ) : (
        <button className={styles.basketButtonDisabled} disabled>
          Add to basket
        </button>
      )}
    </section>
  )
}

export default ProductInformation
