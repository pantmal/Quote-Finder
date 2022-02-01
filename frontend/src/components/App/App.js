import React,  { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';

import {Routes, Route, useNavigate } from 'react-router-dom';

import Home from '../Home/Home'

import axios from '../../utils/API'


function App() {
  const navigate = useNavigate();

  let login_check = false 
  if (localStorage.getItem('storage_token')){ //A token in the local storage means the user is logged in.
    login_check = true
  }

  let user_id = -1
  if (localStorage.getItem('pk')){ //Here we will get the primary key of the user, if he is logged in.
    user_id = localStorage.getItem('pk') 
  }

  let username_check = ''
  if (localStorage.getItem('username')){ //Here we will get the username, if he is logged in.
    username_check = localStorage.getItem('username') 
  }
  // this.state = { //This information will be used in all the other components rendered through the App.
  //   username: username_check,
  //   user_primary_key: user_id,
  //   isLoggedIn: login_check,
  //   isAdmin: false,
  //   isHost: false,
  //   isRenter: false,
  //   handleLoginSubmission: this.handleLoginSubmission,
  //   handleLogoutClick: this.handleLogoutClick
  // };

 
    //Declare an object as the state
    const [state, setState] = useState({
        username: username_check,
        user_pk : user_id,
        isLoggedIn : login_check,
        isAdmin: false
    })

    //Test func
    // const setAdminRole = () => {
    //   setAdmin({isAdmin: true})
    // }

  useEffect(() => { //The following code is used when the user refreshes the page, or if he closes the tab and reopens it. If he is still logged in, we must set the state with his information.

    if (state.isLoggedIn === true){

      //If the user is logged in, we request the user item from the server.
      axios.get(`users/${this.state.user_primary_key}`/*,
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('storage_token')}`
        }}*/).then( response => { 
           
          //Setting the state with the information we retrieved.
          const user = response.data;

          //Assigning the correct role.
          if (user.is_admin){ 
            //setAdminRole();
            setState({
              ...state,
              isAdmin: false
            })
          }

        }
      ).catch(error => {console.log(error.response);})
    }
  });


  const handleLoginSubmission = (credentials) => {

    //Making an axios post to authentication/login.
    axios.post('users/login/', JSON.stringify(credentials), {headers: {
      'Content-Type': 'application/json'
    }}
    ).then(response => { 
      
      //A successful response gives us the JSON web token and the user it located.
      const res_token = response.data.token;
      localStorage.setItem('storage_token',res_token);
      
      const res_user = response.data.user;
      localStorage.setItem('storage_pk',res_user.pk);
      localStorage.setItem('storage_username',res_user.username);

      //Updating the state.
      setState({
        ...state,
        isLoggedIn: true,
        user_pk: res_user.pk,
        username: res_user.username
      })

      //Getting from the server the user item we located
      axios.get(`users/${this.state.user_primary_key}`/*,
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem('storage_token')}`
        }}*/).then(
        response => { 
          
          const user = response.data;

          //Assigning the correct role.
          if (user.is_admin){ 
            //setAdminRole();
            setState({
              ...state,
              isAdmin: false
            })
          }
        }
      )

      //Redirecting to the home page.
      this.props.history.push("/")
    } 
      ).catch(error => {

        //Catching and handling errors.
        console.log(error.response);  
        alert('Some kind of error occured, please try again.')
        }
      )

  }

  //Logging off clears the local storage, sets the user's state to a default one and redirects him to the home page.
  const handleLogoutClick = () => {
    console.log('logout check')
    
    setState({
      ...state,
      username:'',
      user_pk:-1,
      isLoggedIn:false,
      isAdmin:false
    })

    localStorage.clear();
    
    navigate("/");
  }

  return (
    <div className = "App">
      {/* <NavbarClass {...this.props} app_state={{...this.state}}/> */}
      <Routes>
      <Route path='/' element = {<Home context={state} handleLoginSubmission={handleLoginSubmission} handleLogoutClick={handleLogoutClick}/>} /> 
      </Routes>
    </div>
  );
}

export default App;
