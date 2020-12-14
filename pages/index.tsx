import Head from 'next/head';
import React, { useState } from 'react';
import { useMutation, useQuery, gql } from "@apollo/client";
import styles from '../styles/Home.module.css';
import { initializeApollo } from "./src/apolloClient";
import { Nav, Navbar, Form, Button, FormControl, InputGroup, NavDropdown } from 'react-bootstrap';


const GET_PRESCRIPTIONS = gql`
    mutation  prescription($prescription:String){
          prescription(prescription:$prescription)
          {
                search_name
                name
                generic_name
          }
    }

`;
export default function Home() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [getPrescriptions] = useMutation<any>(GET_PRESCRIPTIONS, {
    onError(err) {
      console.log(err);

    },
    update(proxy, result) {
      let options = [];
      result.data.prescription.forEach((element)=>{
              options.push(<option value={element.search_name} />); 

      })
      console.log(options);
      setPrescriptions(options);
    }
  });
  const searchPrescription = (e) => {

    console.log(e.target.value);
    getPrescriptions({variables: {prescription: e.target.value }}); 


  }
  return (
    <>
      <Head>
        <title>FirstRx</title>
        <meta name="viewport" content="width=device-width,height=device-height, initial-scale=1, shrink-to-fit=yes"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
              <h3 className="my-0 mr-md-auto font-weight-bold">FirstRx</h3>
              <nav className="my-2 my-md-1 mr-md-1" style={{ width: '35%' }}>
                <select name="age" className="browser-default custom-select" style={{ width: '100%' }}>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                </select>
              </nav>
            </div>
          </header>
          <main role="main" className="container d-flex flex-column flex-md-row align-items-center" style={{ height: "80vh" }}>

            <div className="card-deck col-12 text-center my-auto">
              <div className="card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Check here <b>First</b> for your <b>Rx</b> savings!</h4>
                </div>
                <div className="card-body">
                  <h3 className="card-title pricing-card-title">Step 1: Your Prescription</h3>
                  <input type="text" list="prescriptions" className="form-control mt-3 mb-4" onChange={searchPrescription} id="usr" />
                  <datalist id="prescriptions">
                    {prescriptions}
                  </datalist>

                </div>
              </div>
            </div>

          </main>

          <footer className="mastfoot mt-auto">
            <div className="inner">
              <p>Footer </p>
            </div>
          </footer>
        </div>      
    </>


  );
}
// <Head>
// <title>FirstRx</title>
// <link rel="icon" href="/favicon.ico" />
// </Head>  
 // <footer>
      //   <a
      //     href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Powered by{' '}
      //     <img src="/vercel.svg" alt="Vercel Logo"/>
      //   </a>
      // </footer>
// export async function getStaticProps(){
//   const apolloClient = initializeApollo();

//   // await apolloClient.query({
//   //   query:"",
//   // });
//   // return{
//   //   props:{
//   //     intialApolloState: apolloClient.cache.extract(),
//   //   }
//   // }
// }
