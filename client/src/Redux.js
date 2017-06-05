////start sample code from redux https://www.youtube.com/watch?v=Td-2D-_7Y2E&list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b&index=20 ///
/// ok redux seems like a bit of over kill, I think that to really appreciate what it's doing I need to 
// go make my own implementation of a store and then I think I can just subscribe to that store at the app level 
//and then on subscribe update my app level state might need to look at mobX don't forget to uninstall redux
import { createStore, combineReducers, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"

const state = {
    user : {},
    game : {},
    samples: {
      count : 0
    }
  }
const sampleReducer = (state = {count : 0} , action) => {
  if (action.type === "sample_inc"){
    state = {...state, count: state.count + action.payload }
  } else if (action.type === "E"){
    throw new Error("Ya broke it")
  }
  return state

}
let defualt = {}
const userReducer = (state = defualt, action) => {
  switch(action.type){
    case "change_name" :{
      state = {...state, name: action.payload }
      break
    }
    case "change_age" :{
      state = {...state, age: action.payload }
      break
    }  
  }
  return state
}

const gameReducer = (state = defualt, action) => {
  return state
}

const All_Reducers = combineReducers({
  user : userReducer,
  game : gameReducer,
  samples: sampleReducer
})

const myTestLogger = (store) => (next) => (action) => {
  console.log("action fired", action)
  next(action)
}

const error = (store) => (next) => (action) => {
  try {next(action)} catch(err){console.log("Ooops", err)}
}

const middleware = applyMiddleware(logger(), thunk, error)
const store = createStore (All_Reducers, state, middleware)

store.dispatch((dispatcher) => {
  dispatcher({type: "foo"}) //do something asyn
  dispatcher({type: "bar"}) //do something else
})

store.subscribe(() => {
  console.log("Store Changed", store.getState())
  //where i change the App.state to be store.state?
})

store.dispatch({type: "sample_inc", payload: 1})
    // console.log("is redux state same as this.state?", this.state)
    store.dispatch({type: "change_name", payload: "Scott"})
    // console.log("is redux state same as this.state?", this.state)
    store.dispatch({type: "change_age", payload: 37})
    // console.log("is redux state same as this.state?", this.state)
    store.dispatch({type: "sample_inc", payload: 1})
    store.dispatch({type: "E", payload: 1})
    // this.state = {name : "My State Name variable"}

///end sample code///