import React from "react"
import { withStyles } from "@material-ui/core/styles"
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core"

const useStyles = theme => ({
  title: {
    fontSize: 45,
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
    const { classes, title } = this.props
    const { reports } = this.state
    return (
      <Card>
        <CardHeader title={title} align="center" classes={classes}></CardHeader>
        <Divider variant="middle" />
        <CardContent>
          <Typography variant="h1" align="center">
            {reports.confirmed}
          </Typography>
          <Typography align="center">Confirmed</Typography>
          <Typography variant="h1" align="center">
            {reports.recovered}
          </Typography>
          <Typography align="center">Recovered</Typography>
          <Typography variant="h1" align="center">
            {reports.deaths}
          </Typography>
          <Typography align="center">Deaths</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(useStyles)(Summary)
