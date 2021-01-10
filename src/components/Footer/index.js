import React from "react"
import styles from "./styles.module.scss"
import Container from "@components/Container"

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <Container>
        <div className={styles.footerContainerLeft}>
          <p>
            This website is for demonstration of technical skills only.
            <br /> None of the products or information presented is real.
          </p>
        </div>
        <div className={styles.footerContainerRight}>hello</div>
      </Container>
    </footer>
  )
}

export default Footer
