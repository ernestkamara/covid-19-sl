import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import CustomCard from "./custom-card"


import firebase from "gatsby-plugin-firebase"

const ageArray = [
  { value: "infant", label: "Infant" },
  { value: "child", label: "Child" },
  { value: "adult", label: "Adult" },
  { value: "senior", label: "Senior" }
]

const genderArray = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
]

const districtArray = [
  { value: "bo", label: "Bo" },
  { value: "bombali", label: "Bombali" },
  { value: "bonth", label: "Bonth" },
  { value: "falaba", label: "Falaba" },
  { value: "kailahun", label: "Kailahun" },
  { value: "kambia", label: "Kambia" },
  { value: "karena", label: "Kambia" },
  { value: "kenema", label: "Kenema" },
  { value: "koinadugu", label: "Koinadugu" },
  { value: "kono", label: "Kono" },
  { value: "moyamba", label: "Moyamba" },
  { value: "port_loko", label: "Port Loko" },
  { value: "pujehun", label: "Pujehun" },
  { value: "tonkolili", label: "Tonkolili" },
  { value: "western_area", label: "Western Area " }
]

const symptomArray = [
  { value: "fever", label: "Fever" },
  { value: "cough", label: "Cough" },
  { value: "dry_cough", label: "Dry Cough" },
  { value: "sore_throat", label: "Sore Throat" },
  { value: "headaches", label: "Headaches" },
  { value: "diarrhea", label: "Diarrhea" },
  { value: "breathing", label: "Difficulty Breathing" },
  { value: "muscle_pain", label: "Muscle Pain" },
  { value: "tiredness", label: "Tiredness" }
]

const exposureArray = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
]

const testArray = [
  { value: "tested_negative", label: "Tested Negative" },
  { value: "tested_positive", label: "Tested Positive" },
  { value: "awaiting_test", label: "Awaiting Test" },
  { value: "awaiting_result", label: "Awaiting Result" },
  { value: "hospitalized", label: "Hospitalized" },
  { value: "recovered", label: "Recovered" },
  { value: "death", label: "Death" }
]

const actionArray = [
  { value: "voluntary", label: "Voluntary quarantine" },
  { value: "quarantine", label: "Guarantine" },
  { value: "authorities", label: "Guarantine by authorities" },
  { value: "wfh", label: "Working from home" },
  { value: "other", label: "Other" }
]

const diseaseArray = [
  { value: "diabetes", label: "Diabetes" },
  { value: "pressure", label: "High Blood Pessure" },
  { value: "heart_disease", label: "Heart Disease" },
  { value: "asthma", label: "Asthma" },
  { value: "lung_disease", label: "Lung Disease" },
  { value: "kidney_disease", label: "Kidney Disease" },
  { value: "other", label: "Other" }
]

const habitArray = [
  { value: "yes", label: "Yes, I smoke" },
  { value: "no", label: "No, I don't smoke" }
]

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}))

export default function SymptomsReportForm() {
  const classes = useStyles()
  const [age, setAge] = React.useState("")
  const [gender, setGender] = React.useState("")
  const [district, setDistrict] = React.useState("")
  const [exposure, setExposure] = React.useState("")
  const [symptoms, setSymptoms] = React.useState("")
  const [test, setTest] = React.useState("")
  const [action, setAction] = React.useState("")
  const [diseases, setDiseases] = React.useState("")
  const [habit, setHabit] = React.useState("")
  const [consent, setConsent] = React.useState(false)
  

  const handleSubmit = event => {
    event.preventDefault()
    const result = `
    {"age":"${age}",
    "gender":"${gender}",
    "district":"${district}",
    "exposure":"${exposure}",
    "symptoms":"${symptoms}",
    "test":"${test}",
    "action":"${action}",
    "diseases":"${diseases}", 
    "habit":"${habit}",
    "timestamp":${Date.now()}}`

    // TODO: add verifiation
    if (!consent) {
      alert("Please check the consent box")
    } else {
      // TODO: handle error and save to crashlytics 
      firebase.auth().signInAnonymously().catch(function(error) {
           // Handle Errors here.
           var errorCode = error.code;
           var errorMessage = error.message;
        
           if (errorCode === 'auth/operation-not-allowed') {
             //alert('You must enable Anonymous auth in the Firebase Console.');
           } else {
            alert('Server down, please try again later!');
             console.log(error);

           }
         }).then(function(crenditial) {
            console.log(crenditial.user.uid);
          var data = JSON.parse(result)
          firebase
          .firestore()
          .collection("/reports")
          .doc(crenditial.user.uid)
          .set(data)
         });
    } 
  }

  return (
    <CustomCard title={"Report Your Health Condition"}>
      <h3>Help us uncover the corona virus spreading in your area</h3>
      <p />
      <h3>Disclaimer!</h3>
      This tool is not an official tool of the authorities of Sierra Leone and
      neither affiliated with the authorities or government of Sierra Leone. For
      more comprehensive information about the COVID-19 outbreak we refer to the{" "}
      <a href="https://mohs.gov.sl/">Ministry of Health & Sanitation</a> &
      <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">
        WHO.
      </a>
      <p />
      <h4>How will my data be used?</h4>
      Your data would be used anonymously to analyse health related data for the
      purpose of statistics, as described in the privacy information.
      <p />
      <form onSubmit={handleSubmit}>
        <h4>Demography and geography</h4>
        <div>
          <InputLabel htmlFor="age">Age</InputLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={age}
              onChange={event => {
                setAge(event.target.value)
              }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Choose your age
              </MenuItem>
              {ageArray.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p />

          <InputLabel htmlFor="gender">Gender</InputLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={gender}
              onChange={event => {
                setGender(event.target.value)
              }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Choose your gender
              </MenuItem>
              {genderArray.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p />
          <InputLabel htmlFor="district">
            Which district are your reporting from?
          </InputLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={district}
              onChange={event => {
                setDistrict(event.target.value)
              }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Choose your district
              </MenuItem>
              {districtArray.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <p />
        <div>
          <h4>Symptoms and health conditions</h4>
          <InputLabel htmlFor="exposure">
            {" "}
            Have you been in close contact with anyone who has tested positive
            on COVID-19?
          </InputLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={exposure}
              onChange={event => {
                setExposure(event.target.value)
              }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Choose option
              </MenuItem>
              {exposureArray.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p />
          <InputLabel htmlFor="symptoms">
            What symptoms have you had?
          </InputLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={symptoms}
              onChange={event => {
                setSymptoms(event.target.value)
              }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Choose your symptoms
              </MenuItem>
              {symptomArray.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p />

          <InputLabel htmlFor="test">Coronavirus status?</InputLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={test}
              onChange={event => {
                setTest(event.target.value)
              }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Choose your district
              </MenuItem>
              {testArray.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <p />
          <InputLabel htmlFor="action">
            Which actions have you taken?
          </InputLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={action}
              onChange={event => {
                setAction(event.target.value)
              }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Choose action
              </MenuItem>
              {actionArray.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p />

          <InputLabel htmlFor="diseases">
            Have you been diagnosed with any of these diseases?
          </InputLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={diseases}
              onChange={event => {
                setDiseases(event.target.value)
              }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Choose diagnosed disease
              </MenuItem>
              {diseaseArray.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <p />
          <InputLabel htmlFor="habit">
            Which district are your reporting from?
          </InputLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={habit}
              onChange={event => {
                setHabit(event.target.value)
              }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Choose smoking habit
              </MenuItem>
              {habitArray.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <p />
        <FormControlLabel
          control={
            <Checkbox
              checked={consent.checked}
              onChange={event => {
                setConsent(event.target.checked)
              }}
              name="consent"
            />
          }
          label="I agree to my data being stored in accordance with the privacy statement (required)"
        />
        <p />

        <Button variant="outlined" type="submit">
          Submit Report
        </Button>
      </form>
    </CustomCard>
  )
}
