import React, { Fragment } from "react"
import styles from "./styles.module.scss"
import { useIntl, Link } from "gatsby-plugin-intl"

const Logo = ({ link }) => {
  const intl = useIntl()

  return (
    <Fragment>
      {link ? (
        <Link to="/" className={styles.logoLink}>
          e-COMMERCE
        </Link>
      ) : (
        <p className={styles.logo}>e-COMMERCE</p>
      )}
    </Fragment>
  )
}

export default Logo
