import React from 'react'
import TextField from '@material-ui/core/TextField';
import CustomCard from "./custom-card"
import Button from '@material-ui/core/Button';
// import firebase from "gatsby-plugin-firebase"
import firebase from "../helper/firebase";

  
class AdminForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hospitalName: '',
            city: '',
            location: '',
            address: '',
            phoneNumber: '',
            cityError: '',
            hospitalNameError: '',
            locationError: '',
            addressError: '',
            phoneError: '',
            isPhoneNumberValid: false,
            date: Date.now()
        };

    }

     isFormInputvalid = () => {
       let hospitalNameError = '';
       let cityError = '';
       let locationError = '';
       let addressError = '';
       let phoneError = '';
       let isValid = true;
      //checking form for empty/invalid field format before submission
      if(this.state.hospitalName === ""){
        hospitalNameError = 'enter hospital name';
        this.setState({hospitalNameError: hospitalNameError});
        isValid = false;
      }
      if(this.state.city === ""){
        cityError = 'enter a city name';
        this.setState({cityError: cityError});
        isValid = false;
      }if (this.state.location === "") {
        locationError = 'enter a location';
        this.setState({locationError: locationError});
        
        isValid = false;
      }if(this.state.address === ""){
        addressError = 'enter an address';
        this.setState({addressError: addressError});
        
        isValid = false;
      }if(this.state.isPhoneNumberValid === false){
      phoneError = 'enter a valid phone number';
      this.setState({phoneError: phoneError});
      isValid = false;
      }
        return isValid;
  
      
    }
    
    handleChange = (event) => {
      const name = event.target.name;
        this.setState({
          [event.target.name]: event.target.value,         
          
      })

      if(name === 'hospitalName'){
        this.setState({
          hospitalNameError: ''
        }); 
      } 

      if(name === 'city'){
        this.setState({
          cityError: ''
        }); 
      } 

      if(name === 'location'){
        this.setState({
          locationError: ''
        })  
    }

    if(name === 'address'){
      this.setState({
        addressError: ''       
      })
    }

    if(name === 'phoneNumber'){
      let phoneFormat = /^\+?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      if(event.target.value.match(phoneFormat)){
       
        this.setState({
          phoneError: '',
          isPhoneNumberValid: true        
        })
        
      }else{
        this.setState({
          phoneError: 'incorrect number format',
          isPhoneNumberValid: false        
        })
        

      }
      
    }
  }
    handleSubmit = (event) => {
        event.preventDefault();
        
        const isValid = this.isFormInputvalid()
        const formData = {
          hospitalName: this.state.hospitalName,
          city: this.state.city,
          location: this.state.location,
          address: this.state.address,
          phoneNumber: this.state.phoneNumber
        }

       
    if (!isValid) {
      alert(`Please check your form inputs`);
    } else {
          firebase
          .firestore()
          .collection("/admin-form").add(formData)
          alert(`Form Submitted`);
          this.setState({
            hospitalName: '',
            city: '',
            location: '',
            address: '',
            phoneNumber: ''
          })
      
    } 
  }
        


render(){

    return (
        <CustomCard title={"Test Center Form"}>
      <div >
        <div>
            <form onSubmit={this.handleSubmit}>
            <TextField
            id="standard-full-width"
            name="hospitalName" 
            value={this.state.hospitalName}
            type="text"
            onChange={this.handleChange} 
            label="Hospital"
            style={{ margin: 8 }}
            placeholder="Enter name of hospital"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
           <div>
           <span style={{color: "red"}}>{this.state.hospitalNameError}</span>
           </div>
            <TextField
            id="standard-full-width"
            name="city" 
            value={this.state.city}
            type="text"
            onChange={this.handleChange} 
            label="City"
            style={{ margin: 8 }}
            placeholder="Enter City"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
           <div>
           <span style={{color: "red"}}>{this.state.cityError}</span>
           </div>
           <TextField
            id="standard-full-width"
            label="Location"
            name="location"
            value={this.state.location}
            type="text"            
            onChange={this.handleChange} 
            style={{ margin: 8 }}
            placeholder="Enter regional location"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
           <div>
           <span style={{color: "red"}}>{this.state.locationError}</span>
           </div>
           <TextField
            id="standard-full-width"
            label="Address"
            name="address"
            value={this.state.address}
            type="text"          
            onChange={this.handleChange} 
            style={{ margin: 8 }}
            placeholder="Enter facility address"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div>
            <span style={{color: "red"}}>{this.state.addressError}</span>
          </div>
           <TextField
            id="standard-full-width"
            type="number"
            label="Telephone"
            name="phoneNumber"            
            value={this.state.phoneNumber}
            onChange={this.handleChange} 
            style={{ margin: 8 }}
            placeholder="Enter facility phone number"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
           <div>
           <span style={{color: "red"}}>{this.state.phoneError}</span>
           </div>
         <Button type="submit" size="large" variant="contained" color="primary" disableElevation>
        Save
      </Button>
            </form>
          
          </div>
          </div>
      </CustomCard>
    );
}
  
}
export default AdminForm
