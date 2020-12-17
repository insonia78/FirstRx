import Head from 'next/head';
import React, { useState } from 'react';
import { useMutation, useQuery, gql } from "@apollo/client";
import styles from '../styles/Home.module.css';
import { initializeApollo } from "./src/apolloClient";
import { Nav, Navbar, Form, Button, FormControl, InputGroup, NavDropdown } from 'react-bootstrap';
import { PrescriptionsInterface } from './src/interfaces/prescritpion.interface';
import HomeMobile from './src/components/Mobile/HomeMobile';
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
  
  return(
    <></>
       //<HomeMobile /> 
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
