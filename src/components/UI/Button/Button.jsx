import React from 'react'
import './Button.css'

const Button = (props) => {
    return (
        // ref 3
        <button className={`Button ${props.btnType}`} onClick={props.clicked}>{props.children}</button>
    )
}

export default Button
