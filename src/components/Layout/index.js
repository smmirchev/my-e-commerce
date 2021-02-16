import React, { useState } from "react"
import Loader from "react-loader-spinner"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import Header from "@components/Header"
import Footer from "@components/Footer"
import styles from "./styles.module.scss"
import { updateUser } from "@store/user"

// Third party libraries - styling
import "@nodeModules/noty/lib/noty.css"
import "@nodeModules/noty/lib/themes/sunset.css"
import "@nodeModules/react-responsive-modal/styles.css"
import "@nodeModules/react-loader-spinner/dist/loader/css/react-spinner-loader.css"
//
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faSearch,
  faBars,
  faStar,
  faPlus,
  faMinus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"

library.add(faSearch, faBars, faStar, faPlus, faMinus, faTimes)

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const token = localStorage.getItem("e-commerce-token")
  const [loading, setLoading] = useState(true)

  useState(() => {
    if (!!token) {
      dispatch(updateUser(token))
    }
    setLoading(false)
  }, [])

  if (loading)
    return <Loader type="Puff" color="#00BFFF" height={300} width={300} />

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
