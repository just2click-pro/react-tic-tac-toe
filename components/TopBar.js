import React from 'react';

export default (props)=> {
    return(
        <div className="top-bar">
            <h1>{ props.children } { props.name }</h1>
            <img className="logo" src="static/icons/logo.svg" alt="logo"/>
        </div>
    )   
}