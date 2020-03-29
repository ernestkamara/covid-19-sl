import firebase from "firebase/app"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDZxeXYx0kmWwsMH-TzS6UjWYZklqmpK7o",
  authDomain: "covid-19-sl-f4c23.firebaseapp.com",
  databaseURL: "https://covid-19-sl-f4c23.firebaseio.com",
  projectId: "covid-19-sl-f4c23",
  storageBucket: "covid-19-sl-f4c23.appspot.com",
  messagingSenderId: "60448121266",
  appId: "1:60448121266:web:60a4a72baf3251d2c904ab",
  measurementId: "G-BWCDWCSZP5",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics();

export default firebase
