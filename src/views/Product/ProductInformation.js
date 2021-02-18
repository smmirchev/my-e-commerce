import React, { useState, useEffect } from "react"
import { useIntl } from "gatsby-plugin-intl"
import { useDispatch, useSelector } from "react-redux"
import Noty from "noty"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Reviews from "@components/reviews"
import styles from "./styles.module.scss"
import { upperCase } from "@functions/functions"
import { BASKET } from "@functions/api"
import { updateUser } from "@store/user"

const ProductInformation = ({ titleEn, reviews, price, category, id }) => {
  const intl = useIntl()
  const [token, setToken] = useState(null)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [queryQuantity, setQueryQuantity] = useState(1)
  const regExp = new RegExp("^\\d+$")

  useEffect(() => {
    setToken(localStorage.getItem("e-commerce-token"))
  }, [])

  const addToBasket = async () => {
    let quantity = 1
    if (!!queryQuantity) quantity = parseInt(queryQuantity)
    try {
      const { headers } = await axios.post(
        BASKET,
        { productId: id, quantity: quantity, productPrice: price },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      dispatch(updateUser(headers["x-auth-token"]))
      new Noty({
        text: intl.formatMessage({
          id: "page.productTemplate.noty",
        }),
        type: "success",
        layout: "topLeft",
        theme: "sunset",
        timeout: "3000",
      }).show()
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
      <h1>{titleEn}</h1>
      <p className={styles.category}>{`${intl.formatMessage({
        id: "page.productTemplate.category",
      })} ${upperCase(category)}`}</p>
      <Reviews reviewsNumber={reviews} />
      <hr />
      <p className={styles.price}>£{price}</p>
      <hr />
      <p className={styles.quantityText}>
        {intl.formatMessage({
          id: "page.productTemplate.quantity",
        })}
      </p>
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
          {intl.formatMessage({
            id: "page.productTemplate.button",
          })}
        </button>
      ) : (
        <button className={styles.basketButtonDisabled} disabled>
          {intl.formatMessage({
            id: "page.productTemplate.button",
          })}
        </button>
      )}
    </section>
  )
}

export default ProductInformation
