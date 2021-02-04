import axios from "axios"
import { Formik } from "formik"
import * as Yup from "yup"
import React, { useEffect, useState } from "react"
import SEO from "@components/SEO"
import Layout from "@components/Layout/"
import Container from "@components/Container/"
import styles from "@views/login/styles.module.scss"
import { USER_REGISTER } from "@functions/api/"
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import store from "../store/configureStore"

const Register = () => {
  //

  //
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const handleSubmit = async (values, actions) => {
    try {
      const { data } = await axios.post(USER_REGISTER, values)
      console.log("submitted")
    } catch (error) {
      console.log(error)
    }
  }

  //   useEffect(() => {
  //     ;(async () => {
  //       const { data } = await axios.get(COURSES)
  //       console.log(data)
  //     })()
  //   }, [])

  return (
    <Layout>
      <SEO title="Register" />
      <Container>
        <div className={styles.loginRegisterWrapper}>
          <h1>Create an account</h1>
          <Formik
            validationSchema={yupObjectSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={props => <RegisterForm {...props} formKey />}
            // validateOnBlur
            // validateOnChange
          />
        </div>
      </Container>
    </Layout>
  )
}

export default Register

const RegisterForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  setFieldValues,
  isSubmitting,
  setSubmitting,
  touched,
  formKey,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formField}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.userName}
          name="username"
          placeholder="Type in your username"
        />
        {errors?.username && touched?.username && errors?.username}
      </div>

      <div className={styles.formField}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.email}
          name="email"
          placeholder="Type in your email"
        />
        {errors?.email && touched?.email && errors?.email}
      </div>

      <div className={styles.formField}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.password}
          name="password"
          placeholder="Type in your password"
        />
        {errors?.password && touched?.password && errors?.password}
      </div>

      <div className={styles.formField}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.confirmPassword}
          name="confirmPassword"
          placeholder="Cofirm your password"
        />
        {errors?.confirmPassword &&
          touched?.confirmPassword &&
          errors?.confirmPassword}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  )
}

const yupObjectSchema = Yup.object().shape({
  username: Yup.string().trim().required("Username is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .trim()
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
})
