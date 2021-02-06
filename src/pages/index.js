import { useSelector, useDispatch } from "react-redux"
import jwtDecode from "jwt-decode"
import React, { useEffect, useState } from "react"
import SEO from "@components/SEO"
import Layout from "@components/Layout"
import Categories from "@views/home/Categories"
import styles from "@views/home/styles.module.scss"
import Container from "@components/Container"
import Cta from "@views/home/Cta"
import FeaturedProducts from "@views/home/FeaturedProducts"
import { loginUser } from "../store/user"
import { toggleThemeMode } from "../store/ui"

const IndexPage = () => {
  const dispatch = useDispatch()
  // const counter = useSelector(state => state.auth)

  useEffect(() => {
    const jwt = localStorage.getItem("e-commerce-token")
    if (!!jwt) {
      const user = jwtDecode(jwt)
      dispatch(loginUser(user))
    }
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <div className={styles.homeWrapper}>
        <button onClick={() => dispatch(toggleThemeMode())}>Click me</button>
        {/* <button onClick={() => dispatch(addBug("hello"))}>Click me</button>
        <button onClick={() => dispatch(resolveBug(2))}>Click me</button> */}
        <Container>
          <Categories />
        </Container>
        <Cta />
        <Container>
          <FeaturedProducts />
        </Container>
      </div>
    </Layout>
  )
}

export default IndexPage
