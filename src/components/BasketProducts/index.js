import React, { Fragment } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import Img from "gatsby-image/withIEPolyfill"
import { useStaticQuery, graphql } from "gatsby"
import { BASKET, BASKET_PRODUCT } from "@functions/api"
import { Link } from "gatsby-plugin-intl"
import styles from "./styles.module.scss"
import { updateUser } from "@store/user"

const BasketProducts = () => {
  const products = useStaticQuery(graphql`
    query basketProducts {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/products/" } }) {
        edges {
          node {
            frontmatter {
              id: product_id
              categoryId: category_id
              nameEn: name_en
              price
              imageAlt
              image {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const user = useSelector(state => state.user)

  const productsInBasket = products?.allMarkdownRemark?.edges?.filter(
    ({ node: { frontmatter: filteredProduct } }) => {
      return (
        filteredProduct?.categoryId !== "featured" &&
        user?.basket?.find(
          basketProduct => basketProduct?.productId === filteredProduct?.id
        )
      )
    }
  )

  return (
    <div className={styles.basketProductsWrapper}>
      {productsInBasket?.map(({ node: { frontmatter: product } }) => (
        <Fragment>
          <BasketProduct
            name={product?.nameEn}
            image={product?.image}
            imageAlt={product?.imageAlt}
            price={product?.price}
            id={product?.id}
          />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

export default BasketProducts

const BasketProduct = ({ name, image, imageAlt, price, id }) => {
  const user = useSelector(state => state.user)
  const token = localStorage.getItem("e-commerce-token")
  const dispatch = useDispatch()

  const getQuantity = () => {
    const foundProduct = user?.basket?.find(
      basketProduct => basketProduct?.productId === id
    )
    return !!foundProduct ? foundProduct?.quantity : 1
  }

  const addToBasket = async id => {
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

  const removeFromBasket = async id => {
    console.log(BASKET_PRODUCT(id))
    try {
      const { data } = await axios.put(
        BASKET_PRODUCT(id),
        {},
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
    <div className={styles.productWrapper}>
      <div>
        <Img
          fluid={{
            ...image?.childImageSharp?.fluid,
            aspectRatio: 1 / 1,
          }}
          alt={imageAlt}
          objectFit="cover"
          objectPosition="50% 50%"
        />
      </div>
      <div>
        <p>{name}</p>
        <p className={styles.productPrice}>{price}</p>
        <div className={styles.quantityContainer}>
          <p>{`Quantity: ${getQuantity()}`}</p>
          <button onClick={() => addToBasket(id)}>
            <FontAwesomeIcon icon="plus" className={styles.fontAwesomeIcon} />
          </button>

          <button onClick={() => removeFromBasket(id)}>
            <FontAwesomeIcon icon="minus" className={styles.fontAwesomeIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}
