import React from 'react';
//import {Component} from 'react';
//import {Link} from 'react-router-dom';


function Home(props) {


    const logName = () => {
        console.log(props);
        props.handleLogoutClick();
    };


    return (
        <div>
          
          <button
            onClick={logName}
          >
            Log Names
          </button>
        </div>
      );



}

export default Home;