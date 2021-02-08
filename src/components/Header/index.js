import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { navigate } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import { useIntl } from "gatsby-plugin-intl"
import React, { useState } from "react"
import styles from "./styles.module.scss"
import Language from "@components/Language"
import Container from "@components/Container"
import Logo from "@components/Logo"
import BasketProducts from "@components/BasketProducts"

const Header = () => {
  const intl = useIntl()
  const user = useSelector(state => state.user)
  const [showBasketOverlay, setShowBasketOverlay] = useState(false)
  const [showAccountOverlay, setShowAccountOverlay] = useState(false)

  return (
    <header className={styles.headerWrapper}>
      {(showAccountOverlay || showBasketOverlay) && (
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
            <div className={styles.bottomMiddle}>
              <div className={styles.searchBox}>
                <input
                  placeholder="Java, Software, Game..."
                  type="search"
                  // onChange={event => this.props.searchField(event.target.value)}
                />
                <button>
                  <FontAwesomeIcon
                    icon="search"
                    className={styles.fontAwesomeIcon}
                  />
                </button>
              </div>
            </div>
            <div className={styles.bottomRightDesktop}>
              <div
                className={`${styles.desktopDropdown} ${
                  showBasketOverlay ? styles.lowerZIndex : ""
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
                  showAccountOverlay ? styles.lowerZIndex : ""
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
