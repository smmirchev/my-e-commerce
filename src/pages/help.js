import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import SEO from "@components/SEO"
import Layout from "@components/Layout/"
import AdditionalPage from "@components/AdditionalPage/"

const Help = () => {
  const intl = useIntl()
  return (
    <Layout>
      <SEO
        title={intl.formatMessage({
          id: "page.help.title",
        })}
      />
      <AdditionalPage
        title={intl.formatMessage({
          id: "page.help.h1",
        })}
      />
    </Layout>
  )
}

export default Help
