import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core"

const useStyles = theme => ({
  root: {
    backgroundColor: "#00695c",
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
  },
})

class CustomCard extends React.Component {
  render() {
    const { classes, title } = this.props
    return (
      <Card>
        <CardHeader title={title} align="center" classes={classes}></CardHeader>
        <Divider variant="middle" />
        <CardContent>{this.props.children}</CardContent>
      </Card>
    )
  }
}

export default withStyles(useStyles)(CustomCard)
