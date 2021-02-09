import React from "react"
import SEO from "@components/SEO"
import Layout from "@components/Layout/"
import AdditionalPage from "@components/AdditionalPage/"

const Faq = () => {
  return (
    <Layout>
      <SEO title="FAQ" />
      <AdditionalPage title={"Freqently Asked Questions"} />
    </Layout>
  )
}

export default Faq
