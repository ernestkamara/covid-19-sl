import React from "react"
import ReactEcharts from "echarts-for-react"
import { Card, CardContent } from "@material-ui/core"

import firebase from "../helper/firebase"
require("../helper/sierra-leone.js")

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  timeTicket = null
  getInitialState = () => ({ option: this.getOption() })

  componentDidMount() {
    const context = this
    var max = 0
    var min = 0
    firebase
      .database()
      .ref("/map-data")
      .on("value", function(snapshot) {
        var data = snapshot.val()
        const option = JSON.parse(JSON.stringify(context.state.option))
        option.series[0].data = data
        data.forEach(entry => {
          if (entry.value > max) max = entry.value
          if (entry.value < min) min = entry.value
        })

        option.visualMap.min = min
        option.visualMap.max = min === max ? min + 1 : max
        context.setState({ option })
      })
  }

  randomData() {
    return Math.round(Math.random() * 1000)
  }

  getOption = () => {
    return {
      title: {
        text: "COVID-19 Cases",
        subtext: "COVID-19 Case",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["confirmed", "recovered", "death"],
      },
      visualMap: {
        min: 0,
        max: 1, // legend
        left: "left",
        top: "bottom",
        text: ["Lowest", "Height"],
        calculable: true,
      },
      toolbox: {
        show: false,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: "confirmed",
          type: "map",
          mapType: "sierra-leone",
          roam: false,
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          data: [
            { name: "Kailahun", value: 0 },
            { name: "Kenema", value: 0 },
            { name: "Kono", value: 0 },
            { name: "Bombali", value: 0 },
            { name: "Kambia", value: 0 },
            { name: "Koinadugu", value: 0 },
            { name: "Port Loko", value: 0 },
            { name: "Tonkolili", value: 0 },
            { name: "Bonthe", value: 0 },
            { name: "Moyamba", value: 0 },
            { name: "Pujehun", value: 0 },
            { name: "Bo", value: 0 },
            { name: "Western Rural", value: 0 },
            { name: "Western Urban", value: 0 },
          ],
        },
      ],
    }
  }

  render() {
    // console.log(this.state.option);
    return (
      <Card>
        {/* <CardHeader title="Summary" align="center"></CardHeader> */}
        {/* <Divider variant="middle" /> */}
        <CardContent>
          <ReactEcharts
            notMerge={true}
            lazyUpdate={true}
            option={this.state.option}
            style={{ height: "450px", width: "100%" }}
            className="react_for_echarts"
          />
        </CardContent>
      </Card>
    )
  }
}

export default Map
