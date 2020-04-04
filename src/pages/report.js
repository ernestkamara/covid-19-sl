import React from "react"
import { Link } from "gatsby"
import { Box } from "@material-ui/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SymptomsReportForm from "../components/report-form"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Box flexGrow={1} p={1}>
        <SymptomsReportForm/>
    </Box>
    <Link to="/">Go back to the homepage</Link>

  </Layout>
)

export default SecondPage
