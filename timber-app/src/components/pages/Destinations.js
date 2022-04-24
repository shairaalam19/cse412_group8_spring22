import React, {useState} from 'react';
import DestinationAPI from "../../apis/destinationAPI";
import '../../App.css';
import { Destination_Cards } from '../Destination_Cards';

export function Destinations(destination) {

  const [destinationData, setDestinationData] = useState({
    destination_name: "",
  })
    
  function getDestinationDetails(destination_name){
    const fetchData = async() => {
      try{
        const response = await DestinationAPI.get("/");
        setDestinationData({
          destination_name: response.data.destinations[destination_name].destination_destination_name,
        });
      }
      catch(err){
        console.log(err);
        // return err;
      }
    }//end of fetch data
      
    fetchData();

    return(
      <>
        <p>Destination Name: {destinationData.destination_destination_name}</p>
      </>
    )

  }

  
  return (
     <>
      <Destination_Cards/>
    </>

  );
}

export default Destinations;
