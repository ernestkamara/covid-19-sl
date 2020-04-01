import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableBody,
} from "@material-ui/core"
import CustomCard from "../components/custom-card"

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "source", label: "Source", minWidth: 170 },
]

function createData(id, title, date, source) {
  return { id, title, date, source }
}

const rows = [
  createData(
    1,
    "State of Emergency Declared for 12 months",
    "3/12/2020",
    "State House"
  ),
  createData(
    2,
    "State of Emergency Declared for 12 months",
    "3/12/2020",
    "State House"
  ),
  createData(
    3,
    "State of Emergency Declared for 12 months",
    "3/12/2020",
    "State House"
  ),
  createData(
    4,
    "State of Emergency Declared for 12 months",
    "3/12/2020",
    "State House"
  ),
  createData(
    5,
    "State of Emergency Declared for 12 months",
    "3/12/2020",
    "State House"
  ),
  createData(
    6,
    "State of Emergency Declared for 12 months",
    "3/12/2020",
    "State House"
  ),
]

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
})

export default function NewsFeed() {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(4)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <CustomCard title={"New Feed"}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map(column => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </CustomCard>
  )
}
