import React from "react"
import { Link } from "gatsby-plugin-intl"
import { useIntl } from "gatsby-plugin-intl"
import Container from "@components/Container"
import styles from "./styles.module.scss"

const Footer = () => {
  const intl = useIntl()
  return (
    <footer className={styles.footerWrapper}>
      <Container>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <p>
              {intl.formatMessage({
                id: "footer.left.text",
              })}
            </p>
            <p>
              {`${intl.formatMessage({
                id: "footer.left.site",
              })} https://unsplash.com/`}
            </p>
          </div>
          <div className={styles.footerRight}>
            <div className={styles.footerRightContent}>
              <h4>
                {intl.formatMessage({
                  id: "footer.right.helpAndInformation",
                })}
              </h4>
              <Link to="/faq">
                {intl.formatMessage({
                  id: "footer.right.faq",
                })}
              </Link>
              <Link to="/contact-us">
                {intl.formatMessage({
                  id: "footer.right.contact",
                })}
              </Link>
              <Link to="/help">
                {intl.formatMessage({
                  id: "footer.right.help",
                })}
              </Link>
            </div>
            <div className={styles.footerRightContent}>
              <h4>
                {intl.formatMessage({
                  id: "footer.right.companyInformation",
                })}
              </h4>
              <Link to="/terms-and-conditions">
                {intl.formatMessage({
                  id: "footer.right.terms",
                })}
              </Link>
              <Link to="/privacy-policy">
                {intl.formatMessage({
                  id: "footer.right.privacy",
                })}
              </Link>
              <Link to="/cookies-notice">
                {intl.formatMessage({
                  id: "footer.right.cookies",
                })}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
