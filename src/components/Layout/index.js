import React from "react"
import PropTypes from "prop-types"
import Header from "@components/Header"
import Footer from "@components/Footer"
import styles from "./styles.module.scss"

const Layout = ({ children }) => {
  return (
    <div className={styles.app}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
