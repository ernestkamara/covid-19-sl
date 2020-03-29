import React from "react"
// import { Link } from "gatsby"

import Map from "../components/map"
import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Summary from "../components/Summary"

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
        // console.log(res.data);
        context.setState({ reports })
        // ...
      })
  }
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Summary
      title={"Sierra Leone Summary"}
      firebaseConnectionSetup={firebaseConnection("/local-summary")}
    />
    <Summary
      title={"Global Summary"}
      firebaseConnectionSetup={firebaseConnection("/global-summary")}
    />
    <Map />
  </Layout>
)

export default IndexPage
