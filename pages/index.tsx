import Head from 'next/head';
import React, { useState } from 'react';
import { useMutation, useQuery, gql } from "@apollo/client";
import styles from '../styles/Home.module.css';
import { initializeApollo } from "./src/apolloClient";
import { Nav, Navbar, Form, Button, FormControl, InputGroup, NavDropdown } from 'react-bootstrap';
import { PrescriptionsInterface } from './src/interfaces/prescritpion.interface';

const GET_PRESCRIPTIONS = gql`
    mutation  prescription($prescription:String){
          prescription(prescription:$prescription)
          {
                search_name
                name
                generic_name
                manufacturer
                form
                quantity
                dosage{
                  dosage
                  quantity
                  type

                }
          }
    }

`;
export default function Home() {
  let prescriptionsArray = [];
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [getPrescriptions] = useMutation<PrescriptionsInterface | any>(GET_PRESCRIPTIONS, {
    onError(err) {
      console.log(err);

    },
    update(proxy, result) {
      let options = [];
      if (result.data.prescription.length === 1) {
        setPrescriptionDetails(result.data.prescription);
        console.log('result', result.data.prescription);
        return;
      }
      result.data.prescription.forEach((element, index) => {
        options.push(<option key={index} value={element.search_name} />);

      })
      console.log(options);
      setPrescriptions(options);
    }
  });
  const searchPrescription = (e) => {

    getPrescriptions({ variables: { prescription: e.target.value, } });


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
        <main role="main" className="container d-flex flex-column flex-md-row align-items-center" style={{ height: "90vh" }}>

          <div className="card-deck col-12 text-center my-auto">
            <div className="card mb-4 shadow-sm">
              <div className="card-header">
                <h4 className="my-0 card-title font-weight-normal">Check here <b>First</b> for your <b>Rx</b> savings!</h4>
              </div>
              <div className="card-body">
                <h3 className="card-title pricing-card-title">Step 1: Your Prescription</h3>
                <input type="text" list="prescriptions" className="form-control mt-3 mb-4" onChange={searchPrescription} id="usr" />
                <datalist id="prescriptions">
                  {prescriptions}
                </datalist>
                {prescriptionDetails.length === 1 &&
                <div>
                  <div className="list-unstyled mt-3 mb-4 prescription-form">
                    <div className="prescription-form-select-container ">
                       <h6 className="prescription-form-description">Does this match your prescription? Make adjustments below
                          so that we can accurately compare prices. Don't worry, you will be
                          able to adjust this again.</h6>    
                    </div>
                    <div className="prescription-form-select-container prescription-form-title">
                      
                        <h4 className="prescription-form-title" >{prescriptionDetails[0].search_name}</h4>
                      
                    </div> 
                    <div>
                      <label>Manufacturer</label>
                    </div>
                    <div>
                      <select className="browser-default custom-select">
                        {
                          prescriptionDetails.map((element, index) =>
                            <option key={`manufactor${index}`} value={element.manufacturer}>{element.manufacturer}</option>

                          )
                        }
                      </select>
                    </div>
                    <div>
                      <label>Form</label>
                    </div>
                    <div>
                      <select className="browser-default custom-select">
                        {
                          prescriptionDetails.map(element =>
                            element.form.map((e, index) =>
                              <option key={`form${index}`} value={e}>{e}</option>

                            )


                          )
                        }
                      </select>
                    </div>
                    <div>
                      <label>Dosage</label>
                    </div>
                    <div>
                      <select className="browser-default custom-select">
                        {
                          prescriptionDetails.map(element =>
                            element.dosage.map((e, index) =>
                              <option key={`dosage${index}`} value={e.dosage}>{e.dosage}</option>

                            )

                          )
                        }
                      </select>
                    </div>
                    <div>
                      <label>Quantity</label>
                    </div>
                    <div>
                      <select className="browser-default custom-select">
                        {
                          prescriptionDetails.map(element =>
                            element.dosage.map((e, index) =>
                              <option key={`dosage${index}`} value={e.quantity}>{e.quantity}</option>

                            )

                          )
                        }
                      </select>
                    </div>                    
                  </div>
                  <button className=" prescription-form-select-button btn btn-secondary btn-sm"> Next: Step2 >></button>
                </div>
                }
              </div>
            </div>
          </div>
        </main>

        <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className="row">
            <div className="col-12 col-md">
              <img className="mb-2" src="../../assets/brand/bootstrap-solid.svg" alt="" width="24" height="24" />
              <small className="d-block mb-3 text-muted">&copy; 2017-2018</small>
            </div>
            <div className="col-6 col-md">
              <h5>Features</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="#">Cool stuff</a></li>
                <li><a className="text-muted" href="#">Random feature</a></li>
                <li><a className="text-muted" href="#">Team feature</a></li>
                <li><a className="text-muted" href="#">Stuff for developers</a></li>
                <li><a className="text-muted" href="#">Another one</a></li>
                <li><a className="text-muted" href="#">Last time</a></li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Resources</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="#">Resource</a></li>
                <li><a className="text-muted" href="#">Resource name</a></li>
                <li><a className="text-muted" href="#">Another resource</a></li>
                <li><a className="text-muted" href="#">Final resource</a></li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>About</h5>
              <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="#">Team</a></li>
                <li><a className="text-muted" href="#">Locations</a></li>
                <li><a className="text-muted" href="#">Privacy</a></li>
                <li><a className="text-muted" href="#">Terms</a></li>
              </ul>
            </div>
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
