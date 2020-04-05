import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import CustomCard from "../components/custom-card"
import SEO from "../components/seo"
import Container from "@material-ui/core/Container"

import {Doughnut} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';

const chartColors = ["#00695c", "#003c8f", '#ad2200','#36A2EB','#FFCE56']

const genderData = {
  labels: ["Male", "Female"],
  datasets: [
    {
      data: [4, 2],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors,
    },
  ],
}

const casesData = {
    labels: ["Infected", "Recovered", "Deaths"],
    datasets: [
      {
        data: [1252265, 258495, 68148],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
  }

const ageData = {
    labels: ["Infant", "Child", "Adult", "Senior"],
    datasets: [
      {
        data: [1, 1, 5, 1],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
  }

  const timelineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Reported cases',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [0, 0, 1, 3, 0, 0, 0]
      }
    ]
  };

  const symptomsData = {
    labels: ['Fever', 'Cough', 'Sore Throat', 'Headaches', 'Difficulty Breathing', 'Muscle Pain', 'Tiredness'],
    datasets: [
      {
        label: 'Cases reported',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [20, 10, 1, 30, 10, 3, 11]
      }
    ]
  };

const Charts = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Charts examples</h1>
    <Container maxWidth="sm">
    
    <CustomCard title={"Global caces distribution"}>        
          <Doughnut
            data={casesData}
            options={{
              legend: {
                display: true,
                align: "center",
                position: "bottom",
              },
            }}
          />        
      </CustomCard>

      <CustomCard title={"Gender distribution"}>        
          <Doughnut
            data={genderData}
            options={{
              legend: {
                display: true,
                align: "center",
                position: "bottom",
              },
            }}
          />        
      </CustomCard>

      <CustomCard title={"Age distribution"}>        
          <Pie
            data={ageData}
            options={{
              legend: {
                display: true,
                align: "center",
                position: "bottom",
              },
            }}
          />        
      </CustomCard>

      <CustomCard title={"Timeline distribution"}>        
          <Bar
            data={timelineData}
            options={{
              legend: {
                display: true,
                align: "center",
                position: "bottom",
              },
            }}
          />        
      </CustomCard>

      <CustomCard title={"Symptoms distribution"}>          
        <HorizontalBar
         data={symptomsData} 
         options={{
            legend: {
              display: true,
              align: "center",
              position: "bottom",
            },
          }}
         />  
      </CustomCard>
    </Container>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Charts
