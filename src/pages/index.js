import React from "react"
import { Box } from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import Map from "../components/map"
import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
import Summary from "../components/Summary"
import NewsFeed from "../components/news-feed"

import firebase from "../helper/firebase"

const firebaseConnection = key => {
  return context => {
    firebase
      .database()
      .ref(key)
      .on("value", function(snapshot) {
        // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
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
      {/* <SEO title="Home" /> */}
      <Box
        display="flex"
        flexDirection={matches ? "row" : "column"}
        p={1}
        m={1}
      >
        <Box flexGrow={1} p={1}>
          <Summary
            title={"Sierra Leone Summary"}
            firebaseConnectionSetup={firebaseConnection("/local-summary")}
          />
        </Box>
        <Box flexGrow={1} p={1}>
          <Summary
            title={"Global Summary"}
            firebaseConnectionSetup={firebaseConnection("/global-summary")}
          />
        </Box>

        <Box flexGrow={1} p={1}>
          <NewsFeed />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={matches ? "row" : "column"}
        p={1}
        m={1}
      >
        <Box flexGrow={1} p={1}>
          <Map />
        </Box>
      </Box>
    </Layout>
  )
}

export default IndexPage
