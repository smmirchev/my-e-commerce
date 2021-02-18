import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import SEO from "@components/SEO.js"
import Layout from "@components/Layout/"
import AdditionalPage from "@components/AdditionalPage/"

const CookiesNotice = () => {
  const intl = useIntl()
  return (
    <Layout>
      <SEO
        title={intl.formatMessage({
          id: "page.cookiesNotice.title",
        })}
      />
      <AdditionalPage
        title={intl.formatMessage({
          id: "page.cookiesNotice.h1",
        })}
      />
    </Layout>
  )
}

export default CookiesNotice
