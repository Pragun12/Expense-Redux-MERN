import {SET_CURRENT_USER} from '../actions/types';

const initialState={
    isAuthenticated:false,
    users:[],
    user:{},
    data:{}
}

export function isEmpty(user){
  if(user){
        return true;
  }
  else{
      return false;
  }
}

export default function(state=initialState,action){
    
    switch(action.type){
       case SET_CURRENT_USER:
       return{
           isAuthenticated:isEmpty(action.payload),
           user:action.payload
       }
        default:
        return state;

    }

}