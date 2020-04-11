import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import CustomCard from "../components/custom-card"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import firebase from "gatsby-plugin-firebase"
import firebase from '../helper/firebase'


const useStyles = () => makeStyles({
    table: {
      minWidth: 650,
    },
  });


class TestCenter extends React.Component{
    
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
        this.state = {
          rows: [],
        }
    }
    componentDidMount(){
      const context = this
      firebase.firestore().collection('admin-form').orderBy('city').onSnapshot(snapshot =>{
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          let newRows = {
            hospitalName: change.doc.data().hospitalName,
            city: change.doc.data().city,
            location: change.doc.data().location,
            address: change.doc.data().address,
            phoneNumber: change.doc.data().phoneNumber,
            id: change.doc.id
          }
          let rows = [...this.state.rows, newRows];
            context.setState({rows: rows })
          
        })
      })
    }
    render (){
        const { title } = this.props
        const classes = useStyles();

        const {rows} = this.state;

        return(
            <CustomCard title={title}>
        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
            <TableCell align="right">Hospital</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Telephone</TableCell>           
          </TableRow>
        </TableHead>
        <TableBody>
         
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.city}
              </TableCell>
              <TableCell align="right">{row.hospitalName}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</CustomCard>
)
    }
}

export default TestCenter