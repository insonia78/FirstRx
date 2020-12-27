import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import { useRouter } from 'next/router';

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
const Location = ({dataFromRoute}) => {

  
  const [locations, setLocations] = useState([]);
  const [locationsDetails, setLocationsDetails] = useState([]);
  const[getLocation,setLocation] = useState({});
  const router = useRouter();
  let myLocation;

  const [getLocations] = useMutation(GET_LOCATION, {
    onError(err) {
      console.log(err);

    },
    update(proxy, result) {
      if (result.data.prescription.length === 1) {        
        setLocationsDetails(result.data.prescription);        
        return;
      }
      let options = [];

      result.data.prescription.forEach((element) => {
        options.push(<option value={element.search_name} />);

      })
      console.log(options);
      setLocations(options);
    }
  });
  const searchPrescription = (e) => {

    console.log(e.target.value);
    getLocations({ variables: { prescription: e.target.value } });


  }

  const clearInput = (e) => {
    let listBox = document.getElementById("location").value = "";
    document.getElementById("location").lenght = 0;
  }
  const getCurrentPosition = () => {

    navigator.geolocation.getCurrentPosition(async (position) => {
    
      let latitude = `latitude=${position.coords.latitude}`;
      let longitude = `&longitude=${position.coords.longitude}`;      
      let query = latitude + longitude + "&localityLanguage=en";
      let bigdatacloud_api = process.env.LOCATION_API;

      bigdatacloud_api += `?${query}`;
      let myObj = await fetch(bigdatacloud_api)
        .catch(handleError);

      if (myObj.ok) {
        myObj = await myObj.json();
        myLocation = {
          postCode: myObj.postcode,
          city: myObj.locality,
          country: myObj.countryName,
          state: myObj.principalSubdivisionCode.split('-')[1],
        };
        setLocation(myLocation);
        document.getElementById('location').value = ` ${myLocation.postCode}, ${myLocation.city}, ${myLocation.state}`;  
      }
      
    });

  }
  var handleError = function (err) {
    console.warn(err);
    return new Response(JSON.stringify({
      code: 400,
      message: 'Stupid network Error'
    }));
  };

  return (
    <div>
      <span className="desktop-main-left-find-prescription-home-title" >Step 2: Your Location</span>
      <div className="desktop-main-left-location-caption">Choose a location where you would like to pick up your prescription.</div>
      <input  autoComplete="off" onFocus={clearInput} placeholder="Type City or Zip Code" className="desktop-main-left-find-prescription-home-input" type="text" list="Locations" onChange={searchPrescription} id="location" />
      <datalist className="desktop-main-left-find-prescription-home-datalist" id="Locations">
        {locations}
      </datalist>
      <div onClick={getCurrentPosition} className="desktop-main-location-detect-location"> Or...<u>Detect Location</u></div>
      
      {Object.keys(getLocation).length !== 0 && getLocation.constructor === Object && <button className="next-button desktop-button-location" onClick={() => router.push
        (
          {
            pathname: '/src/components/HomeDesktop',
            query: { component: 'coupons' },
          })
      }>Next: Step3 {'>>'}</button>}
      <div className="desktop-location-back-button" onClick={() => router.push
        (
          {
            pathname: '/src/components/HomeDesktop',
            query: { component: 'prescription', prescriptions:dataFromRoute},
          })
      }><u>{'<<'} Step 1: Your Prescription</u></div>

    </div>

  );

}

export default Location;