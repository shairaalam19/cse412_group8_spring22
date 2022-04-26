import React, { useState, useEffect } from "react";
import FavoriteAPI from "../apis/FavoriteAPI";
import { Link, useLocation } from "react-router-dom";
import "./Button.css";
import Cookies from 'js-cookie';

function CardItem(props) {
    const likeState = {
        like: "Liked!",
        notLike: "Like"
    }

    const colorState = {
        like: "btn--like",
        notLike: "btn--notLike"
    }

    const [like, setLike] = useState(true);
    const [likeText, setLikeText] = useState(likeState.notLike);
    const [likeColor, setLikeColor] = useState(colorState.notLike);

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
                {/* <Link className="cards__item__link" to={props.path}>
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <img
              src={props.src}
              arl="Travel Image"
              className="cards__item__img"
            />
          </figure>
        </Link> */}
                <div className="cards__item__link" >
                    <Link className="cards__item__info" to={props.path} >
                        <h5 className="cards__item__title">{props.title}</h5>
                        <h4 className="cards__item__trails">{props.trails}</h4>
                        <h5 className="cards__item__accessibility">{props.accessibility}</h5>
                        <h5 className="cards__item__location">{props.location}</h5>
                        <h5 className="cards__item__climate">{props.climate}</h5>
                    </Link>
                    <button className="cards__item__button" className={likeColor} onClick={() => clickLike()}>{likeText}</button>
                </div>
            </li>
        </>
    );
}

export default CardItem;
