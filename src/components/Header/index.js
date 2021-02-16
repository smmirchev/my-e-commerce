import { useSelector } from "react-redux"
import { Modal } from "react-responsive-modal"
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
                  fluid(maxWidth: 400) {
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
  const [openModal, setOpenModal] = useState(false)
  const [basketModal, setBasketModal] = useState(false)
  const [searchModal, setSearchModal] = useState(false)

  console.log(intl)

  const $searchBox = useDetectIfClickedOutside(() =>
    setShowSearchOverlay(false)
  )

  const handleOpenModal = () => {
    setOpenModal(true)
    setBasketModal(false)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setBasketModal(false)
    setSearchModal(false)
  }

  const queryProducts = () =>
    products?.allMarkdownRemark?.edges?.filter(
      ({ node: { frontmatter: product } }) =>
        product?.nameEn.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    )

  const DisplayFoundProducts = () =>
    queryProducts()?.map(({ node: { frontmatter: product } }) => (
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
    ))

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
                {intl.formatMessage({ id: "header.topNavigation.contact" })}
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
                  placeholder={intl.formatMessage({
                    id: "header.searchPlaceholder",
                  })}
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e?.target?.value)}
                  onFocus={() => setShowSearchOverlay(true)}
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
                  <h3>
                    {intl.formatMessage({
                      id: "header.bottomNavigation.productsFound",
                    })}
                  </h3>
                  {!queryProducts().length && <p>No products found.</p>}
                  <DisplayFoundProducts />
                </div>
              )}
            </div>

            <div className={styles.bottomMiddleMobile}>
              <button
                onClick={() => {
                  setSearchModal(true)
                  handleOpenModal()
                }}
              >
                <FontAwesomeIcon
                  icon="search"
                  className={styles.fontAwesomeIcon}
                />
              </button>
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
                <p>
                  {intl.formatMessage({
                    id: "header.bottomNavigation.account.name",
                  })}
                </p>
                {!!user ? (
                  <div>
                    <p className={styles.greeting}>{`${intl.formatMessage({
                      id: "header.bottomNavigation.account.loginGreeting",
                    })} ${user?.username}`}</p>
                    <button
                      className={styles.logoutButton}
                      onClick={() => {
                        localStorage.removeItem("e-commerce-token")
                        navigate("/")
                      }}
                    >
                      {intl.formatMessage({
                        id: "header.bottomNavigation.account.logoutButton",
                      })}
                    </button>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">
                      {intl.formatMessage({
                        id: "header.bottomNavigation.account.logoutTopButton",
                      })}
                    </Link>
                    <Link to="/register">
                      {intl.formatMessage({
                        id:
                          "header.bottomNavigation.account.logoutBottomButton",
                      })}
                    </Link>
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
                <p>
                  {intl.formatMessage({
                    id: "header.bottomNavigation.basket.name",
                  })}
                </p>
                <div>
                  {!!user ? (
                    <BasketProducts />
                  ) : (
                    <p>
                      <Link to="/login">
                        {intl.formatMessage({
                          id: "header.bottomNavigation.basket.logoutLink",
                        })}
                      </Link>{" "}
                      {intl.formatMessage({
                        id: "header.bottomNavigation.basket.logoutMessage",
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.bottomRightMobile}>
              <button
                className={styles.mobileMenuButton}
                onClick={handleOpenModal}
              >
                <FontAwesomeIcon
                  icon="bars"
                  className={styles.fontAwesomeIcon}
                />
              </button>
            </div>
          </div>
        </Container>
      </div>
      <Modal open={openModal} onClose={handleCloseModal} center>
        {searchModal && (
          <div className={styles.mobileSearch}>
            <div className={styles.searchBox}>
              <input
                ref={$searcInput}
                placeholder={intl.formatMessage({
                  id: "header.bottomNavigation.searchPlaceholder",
                })}
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e?.target?.value)}
              />
              <button onClick={() => $searcInput?.current?.focus()}>
                <FontAwesomeIcon
                  icon="search"
                  className={styles.fontAwesomeIcon}
                />
              </button>
            </div>
            {!!searchQuery && (
              <div className={styles.mobileSearchDropdown}>
                <h3>
                  {intl.formatMessage({
                    id: "header.bottomNavigation.productsFound",
                  })}
                </h3>
                {!queryProducts().length && (
                  <p>
                    {intl.formatMessage({
                      id: "header.bottomNavigation.productsFound",
                    })}
                  </p>
                )}
                <DisplayFoundProducts />
              </div>
            )}
          </div>
        )}
        {basketModal && (
          <div className={styles.mobileBasket}>
            {!!user ? (
              <BasketProducts />
            ) : (
              <p>
                <Link to="/login">Login</Link> to view your basket
              </p>
            )}
          </div>
        )}
        {!basketModal && !searchModal && (
          <nav className={styles.mobileMenu}>
            <ul>
              {!!user?._id ? (
                <Fragment>
                  <li>
                    <p className={styles.greeting}>{`${intl.formatMessage({
                      id: "header.bottomNavigation.account.loginGreeting",
                    })} ${user?.username}`}</p>
                  </li>
                  <li>
                    <button
                      className={styles.mobilePrimaryButton}
                      onClick={() => setBasketModal(true)}
                    >
                      {intl.formatMessage({
                        id: "header.bottomNavigation.basket.name",
                      })}
                    </button>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li>
                    <Link
                      className={styles.mobilePrimaryLinkButton}
                      to="/login"
                    >
                      {intl.formatMessage({
                        id: "header.bottomNavigation.account.logoutTopButton",
                      })}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.mobileSecondaryLinkButton}
                      to="/register"
                    >
                      {intl.formatMessage({
                        id:
                          "header.bottomNavigation.account.logoutBottomButton",
                      })}
                    </Link>
                  </li>
                </Fragment>
              )}
              <li>
                <Link to="/contact-us">
                  {intl.formatMessage({ id: "header.topNavigation.contact" })}
                </Link>
              </li>
              <li>
                <Link to="/help">
                  {intl.formatMessage({
                    id: "header.topNavigation.help",
                  })}
                </Link>
              </li>
              {!!user?._id && (
                <li>
                  <button
                    className={styles.mobileSecondaryButton}
                    onClick={() => {
                      localStorage.removeItem("e-commerce-token")
                      navigate("/")
                    }}
                  >
                    {intl.formatMessage({
                      id: "header.bottomNavigation.account.logoutButton",
                    })}
                  </button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </Modal>
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
