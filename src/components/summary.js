import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

import CustomCard from "../components/custom-card"

const useStyles = () => ({
  root: {
    backgroundColor: "#00695c",
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
  },
})

class Summary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { reports: { confirmed: 0, recovered: 0, deaths: 0 } }
  }

  componentDidMount() {
    const { firebaseConnectionSetup } = this.props
    firebaseConnectionSetup(this)
  }

  render() {
    const { title } = this.props
    const { reports } = this.state
    return (
      <CustomCard title={title}>
        <Typography variant="h4" align="center">
          {new Intl.NumberFormat().format(reports.confirmed)}
        </Typography>
        <Typography align="center">Confirmed</Typography>
        <Typography variant="h4" align="center">
          {new Intl.NumberFormat().format(reports.recovered)}
        </Typography>
        <Typography align="center">Recovered</Typography>
        <Typography variant="h4" align="center">
          {new Intl.NumberFormat().format(reports.deaths)}
        </Typography>
        <Typography align="center">Deaths</Typography>
      </CustomCard>
    )
  }
}

export default withStyles(useStyles)(Summary)
