import React from 'react'
import { Box } from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import TestCenterInputForm from '../components/test-center-input-form'
import Layout from "../components/layout"

// const firebaseConnection = key => {
//     return context => {
//       firebase
//         .database()
//         .ref(key)
//         .on("value", function(snapshot) {
//           var data = snapshot.val()
//           var reports = {
//             confirmed: data.confirmed.value,
//             recovered: data.recovered.value,
//             deaths: data.deaths.value,
//           }
//           context.setState({ reports })
//         })
//     }
//   }

const TestCenterForm = () => {
    const matches = useMediaQuery("(min-width:600px)")
    return (
      <Layout>
        <Box
          display="flex"
          flexDirection={matches ? "row" : "column"}
          p={1}
          m={1}
        >
       
          <Box flexGrow={1} p={1}>
          <TestCenterInputForm
            //   title={"Add/Update Test Center"}
            />
            {/* <Summary
              title={"Add/Update Test Center"}
              firebaseConnectionSetup={firebaseConnection("/global-summary")}
            /> */}
          </Box>
        </Box>
      </Layout>
    )
}

export default TestCenterForm