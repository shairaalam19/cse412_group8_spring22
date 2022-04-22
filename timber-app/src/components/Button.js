import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primaary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

// export const Button = ({children, type, onClick, buttonStyle, buttonSize}) => 
export function Button(props) { 
    
    const checkButtonStyle = STYLES.includes(props.buttonStyle) ? props.buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(props.buttonSize) ? props.buttonSize : SIZES[0];

    const path = props.path;

    function output(){
        if(path){
            return (
                <Link to={path} className='btn-mobile'>
                    <button
                    className={'btn ${checkButtonStyle} ${checkButtonSize}'}
                    onClick={props.onClick}
                    type={props.type}
                    >
                        {props.children}
                    </button>
                </Link>
            )
        }
    }

    return (
        <>
            {output()}
        </>
    );
};