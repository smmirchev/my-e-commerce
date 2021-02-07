import React, { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import Img from "gatsby-image/withIEPolyfill"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import styles from "./styles.module.scss"

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
  console.log(user)

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

  console.log(productsInBasket)

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

  const getQuantity = () => {
    const foundProduct = user?.basket?.find(
      basketProduct => basketProduct?.productId === id
    )
    return !!foundProduct ? foundProduct?.quantity : 1
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
          <button>
            <FontAwesomeIcon icon="plus" className={styles.fontAwesomeIcon} />
          </button>

          <button>
            <FontAwesomeIcon icon="minus" className={styles.fontAwesomeIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}
