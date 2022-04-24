import React, {useEffect} from 'react';
import DestinationAPI from "../../apis/destinationAPI";
import '../../App.css';
import { Destination_Cards } from '../Destination_Cards';

export function Destination(destination) {
   console.log("open destination page");
   const [destinationData, setUserData] = useState({
      destination_name: "",
   })
    
   function getDestinationDetails(destination_name){
      const fetchData = async() => {
         try{
           const response = await destinationAPI.get("/");
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
        <div className="destination">
            <h1>destination Details</h1>
            {getDestinationDetails("Grand Canyon")}
        </div>
      </>
   );
}

export default Destinations;
