import React from "react"
import styles from "./styles.module.scss"
import { Link } from "gatsby-plugin-intl"
import { useIntl } from "gatsby-plugin-intl"
import Language from "@components/Language"
import Container from "@components/Container"
import Logo from "@components/Logo"

const Header = () => {
  const intl = useIntl()
  return (
    <header className={styles.headerWrapperr}>
      <div className={styles.topNavigationWrapper}>
        <Container>
          <div className={styles.topNavigationContainer}>
            <div className={styles.topNavigation}>
              <Language />
              <Link to="/contact-us">Contact Us</Link>
              <Link to="/help">
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
              <input
                className="search-box"
                placeholder="Java, Software, Game..."
                type="search"
                // onChange={event => this.props.searchField(event.target.value)}
              ></input>
            </div>
            <div className={styles.bottomRight}>
              <p>Categories</p>
              <p>Account</p>
              <p>Basket</p>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}

export default Header
