import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import SEO from "@components/SEO.js"
import Layout from "@components/Layout/"
import AdditionalPage from "@components/AdditionalPage/"

const Faq = () => {
  const intl = useIntl()
  return (
    <Layout>
      <SEO
        title={intl.formatMessage({
          id: "page.faq.title",
        })}
      />
      <AdditionalPage
        title={intl.formatMessage({
          id: "page.faq.h1",
        })}
      />
    </Layout>
  )
}

export default Faq
