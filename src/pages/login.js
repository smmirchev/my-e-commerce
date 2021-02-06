import { navigate } from "gatsby"
import axios from "axios"
import { Formik } from "formik"
import * as Yup from "yup"
import React, { useEffect, useState } from "react"
import SEO from "@components/SEO"
import Layout from "@components/Layout/"
import Container from "@components/Container/"
import styles from "@views/login/styles.module.scss"
import { USER_LOGIN } from "@functions/api/"

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  }

  const handleSubmit = async (values, actions) => {
    try {
      const { data } = await axios.post(USER_LOGIN, values)
      localStorage.setItem("e-commerce-token", data)
      console.log({ data })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <SEO title="Login" />
      <Container>
        <div className={styles.loginRegisterWrapper}>
          <h1>Create an account</h1>
          <Formik
            validationSchema={yupObjectSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={props => <LoginForm {...props} formKey />}
            // validateOnBlur
            // validateOnChange
          />
        </div>
      </Container>
    </Layout>
  )
}

export default Login

const LoginForm = ({
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.email}
          name="email"
          placeholder="Your email..."
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
          placeholder="Yur password..."
        />
        {errors?.password && touched?.password && errors?.password}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  )
}

const yupObjectSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .trim()
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
})
