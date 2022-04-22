import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

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
  const [notLike, setNotLike] = useState(false);
  const [likeText, setLikeText] = useState(likeState.notLike);
  const [likeColor, setLikeColor] = useState(colorState.notLike);

  // useEffect(() => {
  //   console.log(like);
  // }, []);

  function clickLike(){
    setLike(!like);
    if(like == true){
      setLikeText(likeState.like);
      setLikeColor(colorState.like);
      console.log("Liked " + props.destination);
    }
    else if (like == false){
      setLikeText(likeState.notLike);
      setLikeColor(colorState.notLike);
      console.log("Unliked " + props.destination);
    }

  }

  return (
    <>
      <li className="cards__item__link">
        <Link className="cards__item__link" to={props.path}>
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <img
              src={props.src}
              arl="Travel Image"
              className="cards__item__img"
            />
          </figure>
        </Link>
        <div className="cards__item__link">
          <Link className="cards__item__info" to={props.path}>
            <h5 className="cards__item__text">{props.text}</h5>
          </Link>
          <button className="cards__item__button" className={likeColor} onClick={() => clickLike()}>{likeText}</button>
        </div>
      </li>
    </>
  );
}

export default CardItem;