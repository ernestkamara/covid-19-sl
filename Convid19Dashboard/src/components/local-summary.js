import React from "react"
import Summary from "./Summary"
import firebase from "../helper/firebase"

class LocalSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { reports: { confirmed: 0, recovered: 0, deaths: 0 } }
  }

  componentDidMount() {
    const context = this

    firebase
      .database()
      .ref("/local-summary")
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

  render() {
    const { reports } = this.state
    return <Summary reports={reports} title={"Sierra Leone Summary"} />
  }
}

export default LocalSummary
