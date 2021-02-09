import React from "react"

import Layout from "../components/layout"
import SEO from "../components/SEO"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>The page you tried to load does not exist on the server.</p>
  </Layout>
)

export default NotFoundPage
