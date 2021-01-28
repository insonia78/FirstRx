import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from '../../../../../styles/Location.module.scss';
import { useAlert } from 'react-alert';

/** uses Location service api*/
const GET_LOCATION = gql`
mutation GetLocationFromZipOrCity($value:String){
      GetLocationFromZipOrCity(value:$value)
      {
           code
           message
           results{
             
             geometry{
                location{
                  lat
                  lng
                }
              }
           }
           predictions
           {
             description
           }
      }
}
`;

/**
 * Location page to detect current position or find loation
 * uses location service
 * 
 * @param language the language to display the data 
 * @param prescriptionFromRoute the prescription been pased when useRoute is used
 * @param location the location passed from the route
 */
const Location = ({ language, prescriptionFromRoute, location }) => {

  /**@gets @sets the locations array from the mutation */ 
  const [locationsFromMutation,setLocationsFromMutation] = useState([]);

  /** @gets @sets the selected location  */
  const [getLocation, setLocation] = useState({});

  /**@gets @sets the reset to clear the location passed in the function*/
  const [reset, setReset] = useState(false);

  /** @set @gets windowsWidth  */
  const [windowWidth, setWindowWidth] = useState(0);

  /** @sets @gets the value in the input box */
  const [valueForInputValue, setValueForInputValue] = useState("");


  const router = useRouter();
  
 /** for alert message box */
  const alert = useAlert();



  const getSizes = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener(
      "resize", getSizes, false);
  });

  /**
   * Get Location Mutation Mutation that calls location service to retreve
   * location info from input box. It supports by city name and zip code 
   * 
   * @variable event.target.value
   * @context location  for Apollo.Link     
   */
  const [getLocations] = useMutation(GET_LOCATION, {
    onError(err) {
      console.log(err);
      alert.show(err);

    },
    update(proxy, result) {
      try {
        if (result.data.GetLocationFromZipOrCity.code !== 200) {
          alert.show(result.data.GetLocationFromZipOrCity.message);
          return;
        }

        if (result.data.GetLocationFromZipOrCity.results !== null) {

          const location = result.data.GetLocationFromZipOrCity.results[0].geometry.location;

          getAddressFromLatAndLng(location.lat, location.lng);
          return;
        }
        setLocationsFromMutation(result.data.GetLocationFromZipOrCity.predictions)
      }
      catch (e) {
        alert.show(e);
      }
    }
  });
 
  /**
   * Respondes to onChange function from input box
   * set the value and context for the GraphQl call 
   * @useState setValueForInputValue
   * @mutation getLocations
   * @event e
   */  
  const searchLocation = (e) => {

    setValueForInputValue(e.target.value);
    getLocations({ variables: { value: e.target.value }, context: { clientName: 'location' } });

  }
  
  /**
   * Clears and resets the values from the input box 
   * 
   * @useState setValueForInputValue
   * @useState setReset
   * @useState setLocation
   * @event e 
   */
  const clearInput = (e) => {
    setValueForInputValue("");
    setReset(true);
    setLocation({});
  }

  /**
   * Gets the reverse geocode for address with zip from latitude
   * and longitude 
   * 
   * @url https://api.bigdatacloud.net/data/reverse-geocode-client";
   * @useState setLocation
   * @useState setValueForInputValue
   * @param lat latitude
   * @param lng longitude
   * @function handleError
   */
  const getAddressFromLatAndLng = async (lat, lng) => {
    let myLocation;
    let latitude = `latitude=${lat}`;
    let longitude = `&longitude=${lng}`;
    let query = latitude + longitude + "&localityLanguage=en";
    let bigdatacloud_api = process.env.locationUrl;

    bigdatacloud_api += `?${query}`;
    let myObj = await fetch(bigdatacloud_api)
      .catch(handleError);

    if (myObj.ok) {
      let obj = await myObj.json();
      console.log(obj);
      myLocation = {
        latitude: lat,
        longitude: lng,
        postCode: obj.postcode,
        city: obj.locality,
        country: obj.countryName,
        state: obj.principalSubdivisionCode.split('-')[1],
      };
      setLocation(myLocation);
      myLocation = ` ${myLocation.postCode}, ${myLocation.city}, ${myLocation.state}`;
      setValueForInputValue(myLocation);
    }
    var handleError = function (err) {
      console.warn(err);
      return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error'
      }));
    };
  }
  
  /**
   * Get's the Current position of the user
   * 
   * @api navigator.geolocation
   */
  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let latitude = `${position.coords.latitude}`;
      let longitude = `${position.coords.longitude}`;
      getAddressFromLatAndLng(latitude, longitude);
    });
  }

  /**
   * set the location passed from useRoute 
   */
  useEffect(() => {

    if (location !== undefined)
      setValueForInputValue(location);

  }, []);


 
  return (
    <div>
      {reset && (location = undefined)}

      <span className={styles.desktop_main_left_find_prescription_home_title}>
        {console.log('language', language)}
        {(language === 'english' || language === undefined) && 'Step 2: Your Location'}
        {language === 'spanish' && '<Spanish>Step 2: Your Location'}
      </span>
      
      <div className={styles.desktop_main_left_location_caption}>
        {(language === 'english' || language === undefined) && 'Choose a location where you would like to pick up your prescription.'}
        {language === 'spanish' && '<Spanish>Choose a location where you would like to pick up your prescription.'}

      </div>
      
      { (windowWidth <= 520 && valueForInputValue ?
        <div className={styles.desktop_location_clear}>
          {valueForInputValue} <u onClick={clearInput}>
            {(language === 'english' || language === undefined) && 'Clear'}
            {language === 'spanish' && '<Spanish>Clear'}
          </u>
        </div>
        :
         <>
          <input value={valueForInputValue} autoComplete="off" onFocus={(e) => {
              clearInput(e);
              
            }          
          }
            placeholder="Type City or Zip Code" className={styles.desktop_main_left_find_prescription_home_input} type="text" list="Locations" onChange={searchLocation} id="location" />
          <datalist  className="desktop-main-left-find-prescription-home-datalist" id="Locations">
            {console.log('locationsfrommutation', locationsFromMutation)}
            {locationsFromMutation.map((element, index) =>
              <option key={`location${index}`} value={element.description} />
            )}
          </datalist>
        </>)
      }
      {(windowWidth <= 520 && valueForInputValue) ? null :
        <div onClick={getCurrentPosition} className={styles.desktop_main_location_detect_location}>
          {(language === 'english' || language === undefined) &&
            <>
              Or...<u>Detect Location</u>
            </>}
          {language === 'spanish' && <>{'<Spanish>'}
          Or...<u>Detect Location</u>
          </>}
        </div>
      }
      {console.log('getLocation', getLocation)}
      {((Object.keys(getLocation).length !== 0 && getLocation.constructor === Object) || location) && <button className={`next-button ${styles.desktop_button_location}`} onClick={() => router.push
        (
          {
            pathname: '/src/components/Home',
            query: {
              component: 'choose-your-coupon',
              prescriptions: prescriptionFromRoute,
              location: valueForInputValue.trim(),
              language: language
            },
          })
      }>
        {(language === 'english' || language === undefined) && 'Next: Step3'}
        {language === 'spanish' && '<Spanish>Next: Step3'}
        {'>>'}</button>}
      <div className={styles.desktop_location_back_button} onClick={() => router.push
        (
          {
            pathname: '/src/components/Home',
            query: {
              component: 'prescription',
              prescriptions: prescriptionFromRoute,
              location: valueForInputValue.trim(),
              language: language

            }
          })
      }><u>{'<<'}
          {(language === 'english' || language === 'undefined') && ` ${(windowWidth > 520 ? "Step 1: Your Prescription" : "Step 1")}`}
          {(language === 'spanish') && `${(windowWidth > 520 ? "<Spanish>Step 1: Your Prescription" : "<Spanish>Step 1")}`}
        </u>
      </div>

    </div>

  );

}

export default Location;