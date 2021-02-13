import React from "react"
import styles from "./styles.module.scss"
import Container from "@components/Container"
import { Link } from "gatsby-plugin-intl"
import { useIntl } from "gatsby-plugin-intl"

const Footer = () => {
  const intl = useIntl()

  return (
    <footer className={styles.footerWrapper}>
      <Container>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <p>
              This website is for demonstration of technical skills only. None
              of the products or information presented is real.
            </p>
            <p>Site images are taken from: https://unsplash.com/</p>
          </div>
          <div className={styles.footerRight}>
            <div className={styles.footerRightContent}>
              <h4>Help & Information</h4>
              <Link to="/faq">FAQ</Link>
              <Link to="/contact-us">Contact Us</Link>
              <Link to="/help">
                {intl.formatMessage({ id: "header.topNavigation.help" })}
              </Link>
            </div>
            <div className={styles.footerRightContent}>
              <h4>Company Information</h4>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
              <Link to="/privacy-policy">Privacy policy</Link>
              <Link to="/cookies-notice">Cookies notice</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
