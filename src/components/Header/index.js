import React from "react"
import styles from "./styles.module.scss"
import { Link } from "gatsby-plugin-intl"
import { useIntl } from "gatsby-plugin-intl"
import Language from "@components/Language"
import Container from "@components/Container"
import Logo from "@components/Logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = () => {
  const intl = useIntl()
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
              <Link to="/register" className={styles.desktopNavigationLink}>
                Account
              </Link>
              <p>Basket</p>
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
