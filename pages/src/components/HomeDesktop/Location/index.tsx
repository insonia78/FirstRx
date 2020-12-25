import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";


const GET_LOCATION = gql`
mutation  location($location:String){
      prescription(location:$location)
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
const Location = () =>{

    const [locations, setLocations] = useState([]);
    const [locationsDetails, setLocationsDetails] = useState([]);
    const [getLocations] = useMutation(GET_LOCATION, {
         onError(err) {
              console.log(err);
        
            },
            update(proxy, result) {
            if (result.data.prescription.length === 1) {
                setLocationsDetails(result.data.prescription);
                console.log('result', result.data.prescription);
                return;
                }
              let options = [];

              result.data.prescription.forEach((element)=>{
                      options.push(<option value={element.search_name} />); 
        
              })
              console.log(options);
              setLocations(options);
            }
          });
    const searchPrescription = (e) => {
    
        console.log(e.target.value);
        getLocations({variables: {prescription: e.target.value }}); 
    
    
        }
      
      const clearInput = (e) =>{          
          let listBox = document.getElementById("location").value = "";
          document.getElementById("location").lenght = 0;          
      }   

    return(
        <div>            
             <span className="desktop-main-left-find-prescription-home-title" >Step 2: Your Location</span>
             <div className="desktop-main-left-location-caption">Choose a location where you would like to pick up your prescription.</div>
             <input  onFocus={clearInput} placeholder="Type City or Zip Code" className="desktop-main-left-find-prescription-home-input" type="text" list="Locations" onChange={searchPrescription} id="location" />
             <datalist className= "desktop-main-left-find-prescription-home-datalist" id="Locations">
               {locations}
              </datalist>
             <div className="desktop-main-location-detect-location"> Or...<u>Detect Locaiton</u></div>              
        </div>

    );

}

export default Location;