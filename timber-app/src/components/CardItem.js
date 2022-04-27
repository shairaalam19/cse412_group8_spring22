import React, { useState, useEffect } from "react";
import FavoriteAPI from "../apis/FavoriteAPI";
import { Link, useLocation } from "react-router-dom";
import "./Button.css";
import Cookies from 'js-cookie';
import Modal from 'react-modal';

// var trails_string = "";

function CardItem(props) {
    const likeState = {
        like: "Liked!",
        notLike: "Like"
    }

    const colorState = {
        like: "btn--like",
        notLike: "btn--notLike"
    }

    
    const [list, setList] = useState(""); 
    function getTrailDetails() {
        const SearchDestination = async() =>{
            try {
                const trails = await fetch(`http://localhost:5000/api/trails/search/?destination_name=${props.destination}`);
                const trailResults = await trails.json();
                
                var trailArray = [];
                for(var j = 0; j < trailResults.trails.length; j++){
                    const trailName = trailResults.trails[j].trail_name;
                    
                    //get accessibility
                    const accessibilityData = await fetch(`http://localhost:5000/api/trails/accessibility/?val=${trailName}`);
                    const accessibilityResults = await accessibilityData.json();
                    const  accessibilityStr = "pet friendly: " + accessibilityResults.accessibility[0].acc_petfriendly 
                            + "\tpaking cost: " + accessibilityResults.accessibility[0].acc_parkingcost;
    
                    //get trail detail:
                    const trailDetails = await fetch(`http://localhost:5000/api/trail_details/?val=${trailName}`);
                    const tdResults = await trailDetails.json();
                    const  trailStr = "length: " + tdResults.trails[0].trail_length + "mi\tdifficulty: " + tdResults.trails[0].trail_difficulty
                             + "\televation gain: " + tdResults.trails[0].trail_elevationgain + "ft";
    
                    //var str = accessibilityStr + "\n" + trailStr + accessibilityStr;
                    trailArray.push(
                        <>
                            <br></br>
                            {trailName}<br></br>
                            {trailStr}<br></br>
                            {accessibilityStr}<br></br>
                        </>
                    )
                }
                // let trails_string = "";
                // for(var i = 0; i < trailArray.length -1; i++){
                //     trails_string = trails_string + trailResults.trails[i].trail_name + "\n" + trailArray[i] + "\n";
                // }
                // trails_string = trails_string + trailArray[i-1];
                setList(trailArray);
            }   
            catch(err){
                console.log(err);
            }
            //console.log("List" + list.trailList);
        }
        SearchDestination();

        return(
            <>
                <p>{list}</p>
            </>
        )
    }
    getTrailDetails();

    const [like, setLike] = useState(true);
    const [likeText, setLikeText] = useState(likeState.notLike);
    const [likeColor, setLikeColor] = useState(colorState.notLike);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    function clickLike() {
        setLike(!like);
        if (like == true) {
            setLikeText(likeState.like);
            setLikeColor(colorState.like);
            console.log("Liked " + props.destination);

            // ==================== INSERT FAVORITES TO DATABASE ===============================
            const userid = Cookies.get("userid");
            const destination = props.destination;

            const addFavorites = async () => {
                try {
                    const result = await FavoriteAPI.post("/",
                        {  // vvvv this is the format for INSERTING data into the our database
                            hiker_userid: userid,
                            destination_name: destination
                        }
                    )
                    console.log(result);
                } catch (err) {
                    console.log(err);
                }
            }
            addFavorites();
            // ===========================================================================

        }
        else if (like == false) {
            setLikeText(likeState.notLike);
            setLikeColor(colorState.notLike);
            console.log("Unliked " + props.destination);

            // ==================== REMOVE FAVORITES FROM DATABASE ===============================
            const userid = Cookies.get("userid");
            const destination = props.destination;

            console.log("user to delete: " + userid);
            console.log("destination to delete: " + destination);

            const removeFavorites = async () => {
                try { //two parameters passed in the url for DELETION
                    const result = await FavoriteAPI.delete(`/${userid}&${destination}`)
                    console.log(result);
                } catch (err) {
                    console.log(err);
                }
            }
            removeFavorites();
            // ===========================================================================

        }

    }

    return (
        <>
            <li className="cards__item__link">
                <div className="cards__item__link" >
                <div style={{float: 'right'}}>
                    <button className="cards__item__button" onClick={() => openModal()}>Show Details</button>
                </div>
                    <Link className="cards__item__info" to={props.path} >
                        <h5 className="cards__item__title">{props.title}</h5>
                        <h4 className="cards__item__trails">{props.trails}</h4>
                        {/* <h5 className="cards__item__accessibility">{props.accessibility}</h5> */}
                        <h5 className="cards__item__location">{props.location}</h5>
                        <h5 className="cards__item__climate">{props.climate}</h5>
                    </Link>
                        <button className="cards__item__button" className={likeColor} onClick={() => clickLike()}>{likeText}</button>
                    
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="Modal"
                    >
                        <h5>Details</h5>
                        <button onClick={closeModal}>close</button>
                        <div>
                            <h5 className="cards__item__title">{props.destination}</h5>
                            <h5 className="cards__item__location">{props.location}</h5>
                            <h5 className="cards__item__climate">{props.climate}</h5>
                            <h4 className="cards__item__trail">{getTrailDetails()}</h4>
                        </div>
                    </Modal>
                </div>
            </li>
        </>
    );
}


export default CardItem;
