import React from 'react'
import { Box } from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import AdminForm from '../components/admin-form'
import Layout from "../components/layout"

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
          <AdminForm
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