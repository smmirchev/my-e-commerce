import { navigate } from "gatsby-plugin-intl"
import { useIntl } from "react-intl"
import jwtDecode from "jwt-decode"
import Noty from "noty"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { Formik } from "formik"
import * as Yup from "yup"
import React, { useEffect } from "react"
import SEO from "@components/SEO"
import Layout from "@components/Layout/"
import Container from "@components/Container/"
import styles from "@views/login/styles.module.scss"
import { USER_REGISTER } from "@functions/api/"
import { loginUser } from "@store/user"

const Register = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const user = useSelector(state => state.user)

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(USER_REGISTER, values)
      localStorage.setItem(
        "e-commerce-token",
        response?.headers["x-auth-token"]
      )

      const user = jwtDecode(response?.headers["x-auth-token"])
      dispatch(loginUser(user))

      navigate("/")
    } catch (error) {
      new Noty({
        text: error?.response?.data,
        type: "error",
        layout: "topLeft",
        theme: "sunset",
        timeout: "3000",
      }).show()
    }
  }

  useEffect(() => {
    if (!!user?._id) navigate("/")
  }, [])

  return (
    <Layout>
      <SEO
        title={intl.formatMessage({
          id: "page.register.title",
        })}
      />
      <Container>
        <div className={styles.loginRegisterWrapper}>
          <h1>
            {intl.formatMessage({
              id: "page.register.h1",
            })}
          </h1>
          <Formik
            validationSchema={yupObjectSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={props => <RegisterForm {...props} formKey />}
            validateOnChange={false}
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
  const intl = useIntl()

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formField}>
        <label htmlFor="username">
          {intl.formatMessage({
            id: "page.register.labels.username",
          })}
        </label>
        <input
          id="username"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.userName}
          name="username"
          placeholder="Your username..."
        />
        <span>{errors?.username && touched?.username && errors?.username}</span>
      </div>

      <div className={styles.formField}>
        <label htmlFor="email">
          {intl.formatMessage({
            id: "page.register.labels.email",
          })}
        </label>
        <input
          id="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.email}
          name="email"
          placeholder="Your email..."
        />
        <span>{errors?.email && touched?.email && errors?.email}</span>
      </div>

      <div className={styles.formField}>
        <label htmlFor="password">
          {intl.formatMessage({
            id: "page.register.labels.password",
          })}
        </label>
        <input
          id="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.password}
          name="password"
          placeholder="Your password..."
        />
        <span>{errors?.password && touched?.password && errors?.password}</span>
      </div>

      <div className={styles.formField}>
        <label htmlFor="confirmPassword">
          {intl.formatMessage({
            id: "page.register.labels.confirmPassword",
          })}
        </label>
        <input
          id="confirmPassword"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.confirmPassword}
          name="confirmPassword"
          placeholder="Cofirm your password..."
        />
        <span>
          {errors?.confirmPassword &&
            touched?.confirmPassword &&
            errors?.confirmPassword}
        </span>
      </div>

      <button
        className={styles.submitButton}
        type="submit"
        disabled={isSubmitting}
      >
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
