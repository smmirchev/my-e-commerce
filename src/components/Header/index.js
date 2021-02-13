import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby-plugin-intl"
import { useIntl } from "gatsby-plugin-intl"
import { useStaticQuery, graphql, navigate } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import React, { useState, Fragment, useRef } from "react"
import styles from "./styles.module.scss"
import Language from "@components/Language"
import Container from "@components/Container"
import Logo from "@components/Logo"
import BasketProducts from "@components/BasketProducts"
import { upperCase, useDetectIfClickedOutside } from "@functions/functions"

const Header = () => {
  const products = useStaticQuery(graphql`
    query searchProducts {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/products/" } }) {
        edges {
          node {
            frontmatter {
              id: product_id
              categoryId: category_id
              nameEn: name_en
              nameFr: name_fr
              nameDe: name_de
              price
              imageAlt
              image {
                childImageSharp {
                  fluid(maxWidth: 500) {
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
  const intl = useIntl()
  const user = useSelector(state => state.user)
  const [showBasketOverlay, setShowBasketOverlay] = useState(false)
  const [showAccountOverlay, setShowAccountOverlay] = useState(false)
  const [showSearchOverlay, setShowSearchOverlay] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const $searcInput = useRef(null)

  const $searchBox = useDetectIfClickedOutside(() =>
    setShowSearchOverlay(false)
  )

  const queryProducts = () =>
    products?.allMarkdownRemark?.edges?.filter(
      ({ node: { frontmatter: product } }) =>
        product?.nameEn.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    )

  return (
    <header className={styles.headerWrapper}>
      {(showAccountOverlay || showBasketOverlay || showSearchOverlay) && (
        <div className={styles.fadePage}></div>
      )}
      <div className={styles.topNavigationWrapper}>
        <Container>
          <div className={styles.topNavigationContainer}>
            <div className={styles.topNavigation}>
              <Language />
              <Link to="/contact-us" className={styles.desktopNavigationLink}>
                Contact Us
              </Link>
              <Link to="/help" className={styles.desktopNavigationLink}>
                {intl.formatMessage({ id: "header.topNavigation.help" })}
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <div className={styles.bottomNavigationWrapper}>
        <Container>
          <div className={styles.bottomNavigationContainer}>
            <div className={styles.bottomLeft}>
              <Logo link />
            </div>
            <div
              className={`${styles.bottomMiddle} ${
                showAccountOverlay || showBasketOverlay
                  ? styles.lowerZIndex
                  : ""
              }`}
              ref={$searchBox}
            >
              <div className={styles.searchBox}>
                <input
                  ref={$searcInput}
                  placeholder="Products..."
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e?.target?.value)}
                  onFocus={() => setShowSearchOverlay(true)}
                  // onBlur={() => setShowSearchOverlay(false)}
                />
                <button onClick={() => $searcInput?.current?.focus()}>
                  <FontAwesomeIcon
                    icon="search"
                    className={styles.fontAwesomeIcon}
                  />
                </button>
              </div>
              {!!searchQuery && showSearchOverlay && (
                <div className={styles.searchDropdown}>
                  <h3>Products found:</h3>
                  {!queryProducts().length && <p>No products found.</p>}
                  {queryProducts()?.map(
                    ({ node: { frontmatter: product } }) => (
                      <Fragment key={product?.id}>
                        <hr />
                        <Link to={`/${product?.categoryId}/${product?.id}`}>
                          <FoundProduct
                            name={product?.nameEn}
                            category={product?.categoryId}
                            price={product?.price}
                            image={product?.image}
                            imageAlt={product?.imageAlt}
                          />
                        </Link>
                      </Fragment>
                    )
                  )}
                </div>
              )}
            </div>
            <div className={styles.bottomRightDesktop}>
              <div
                className={`${styles.desktopDropdown} ${
                  showBasketOverlay || showSearchOverlay
                    ? styles.lowerZIndex
                    : ""
                }`}
                onMouseEnter={() => setShowAccountOverlay(true)}
                onMouseLeave={() => setShowAccountOverlay(false)}
              >
                <p>Account</p>
                {!!user ? (
                  <div>
                    <p
                      className={styles.greeting}
                    >{`Hello ${user?.username}`}</p>
                    <button
                      className={styles.logoutButton}
                      onClick={() => {
                        localStorage.removeItem("e-commerce-token")
                        navigate("/")
                      }}
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </div>
                )}
              </div>
              <div
                className={`${styles.desktopDropdown} ${
                  showAccountOverlay || showSearchOverlay
                    ? styles.lowerZIndex
                    : ""
                }`}
                onMouseEnter={() => setShowBasketOverlay(true)}
                onMouseLeave={() => setShowBasketOverlay(false)}
              >
                <p>Basket</p>
                <div>
                  {!!user ? (
                    <BasketProducts />
                  ) : (
                    <p>Login to view your basket</p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.bottomRightMobile}>
              <FontAwesomeIcon
                icon="bars"
                size="30px"
                className={styles.fontAwesomeIcon}
              />
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}

export default Header

const FoundProduct = ({ name, category, price, image, imageAlt }) => {
  return (
    <div className={styles.foundProductContainer}>
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
        <p>{`Category: ${upperCase(category)}`}</p>
        <p>{`£${price}`}</p>
      </div>
    </div>
  )
}
