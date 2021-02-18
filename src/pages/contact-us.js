import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import SEO from "@components/SEO.js"
import Layout from "@components/Layout/"
import AdditionalPage from "@components/AdditionalPage/"

const ContactUs = () => {
  const intl = useIntl()
  return (
    <Layout>
      <SEO
        title={intl.formatMessage({
          id: "page.contactUs.title",
        })}
      />
      <AdditionalPage
        title={intl.formatMessage({
          id: "page.contactUs.h1",
        })}
      />
    </Layout>
  )
}

export default ContactUs
