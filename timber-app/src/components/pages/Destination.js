import React, {useEffect} from 'react';
import DestinationAPI from "../../apis/destinationAPI";
import '../../App.css';
import { HeroSection } from '../HeroSection';
import { Destination_Cards } from '../Destination_Cards';

export function Destination() {
   console.log("open destination page");

    //fetching all destinations via API
    useEffect(() => {
      const fetchData = async() => {
        try{
          const response = await DestinationAPI.get("/");
          
          //================== Different ways to retrieve data =====================
          
          //get entire response
          console.log(response);
          //get total number of destination results
          console.log("size: " + response.data.size); 
          //get all destinations
          for(let i = 0; i < response.data.size; i++){
            console.log("destination at " + i + ": " + response.data.destinations[i].destination_name);
          }
          //========================================================================

        }catch(err){
          console.log(err);
        }
      }//end of fetch data
      fetchData();
    },[]) //empty dependency, runs only once

  return (
    <>
      {/* <HeroSection /> */}
      <Destination_Cards/>
    </>
  );
}

export default Destination;
