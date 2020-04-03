import React from "react"
import { Box } from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import Map from "../components/map"
import Layout from "../components/layout"
import Summary from "../components/summary"
import NewsFeed from "../components/news-feed"
import TestCenters from "../components/test-centers"
import SEO from "../components/seo"

import firebase from "../helper/firebase"

const firebaseConnection = key => {
  return context => {
    firebase
      .database()
      .ref(key)
      .on("value", function(snapshot) {
        var data = snapshot.val()
        var reports = {
          confirmed: data.confirmed.value,
          recovered: data.recovered.value,
          deaths: data.deaths.value,
        }
        context.setState({ reports })
      })
  }
}

const IndexPage = () => {
  const matches = useMediaQuery("(min-width:600px)")
  return (
    <Layout>
      <SEO title="SL" />
      <Box
        display="flex"
        flexDirection={matches ? "row" : "column"}
        p={1}
        m={1}
        margin={matches ? "8px" : "0"}
        padding={matches ? "8px" : "0"}
      >
        <Box flexGrow={1} p={1}>
          <Summary
            title={"Sierra Leone Cases"}
            firebaseConnectionSetup={firebaseConnection("/local-summary")}
          />
        </Box>
        <Box flexGrow={1} p={1}>
          <Summary
            title={"Global Cases"}
            firebaseConnectionSetup={firebaseConnection("/global-summary")}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={matches ? "row" : "column"}
        p={1}
        m={1}
        margin={matches ? "8px" : "0"}
        padding={matches ? "8px" : "0"}
      >
        <Box flexGrow={1} p={1}>
          <Map />
        </Box>
      </Box>
      {/* <Box
        display="flex"
        flexDirection={matches ? "row" : "column"}
        p={1}
        m={1}
      >
        <Box flexGrow={1} p={1}>
        <TestCenters
            title={"Available Test Centers"}
          />
        </Box>
      </Box> */}
      <Box
        display="flex"
        flexDirection={matches ? "row" : "column"}
        p={1}
        m={1}
        margin={matches ? "8px" : "0"}
        padding={matches ? "8px" : "0"}
      >
        <Box flexGrow={1} p={1}>
          <NewsFeed />
        </Box>
      </Box>
    </Layout>
  )
}

export default IndexPage
