import { SET_CURRENT_USER} from './types';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from "jsonwebtoken";
import axios from 'axios';

export function setCurrentUser(user){
  
  
    return {
      type:SET_CURRENT_USER,
       payload:user
    
  }

}

export const loginUser=(postData)=>dispatch=>{

   axios.post('/api/auth',postData)
   .then(res=>{
    const token=res.data.token;
   
    localStorage.setItem('jwtToken',token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));

   });
 
       
}

export const createUser=(postData)=>dispatch=>{
  

    fetch(`/api/users`, {
        method: 'POST',
        headers: {
        
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( postData)
      }).then(res => {
          if(res.ok){
              return res.json();
          }
          else{
              let error=new Error(res.statusText);
              error.response=res;
            //  console.log(error);
              throw error;
          }
      });
   // axios.post('/api/users', postData).then(res=>console.log(res));
   
}