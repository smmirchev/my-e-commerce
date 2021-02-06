import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import { useIntl } from "gatsby-plugin-intl"
import React from "react"
import styles from "./styles.module.scss"
import Language from "@components/Language"
import Container from "@components/Container"
import Logo from "@components/Logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = () => {
  const intl = useIntl()
  const user = useSelector(state => state.user)
  return (
    <header className={styles.headerWrapper}>
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
              <div className={styles.desktopDropdown}>
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
              <div className={styles.desktopDropdown}>
                <p>Basket</p>
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
