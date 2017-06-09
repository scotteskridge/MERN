import { autorun, observable, computed, action } from "mobx"
import { Game } from "./pages/dominion/classes/GameClass"

class Todo {
  @observable value
  @observable _ID
  @observable complete


  constructor(value){
    this.value = value
    this._ID = Date.now()
    this.complete = true
  }
}


//the tutorial I'm following is useing a @ decorator and some fancy webpacks I may need to eject
//but for the time being lets see if i can learn mobx as is
//do I need to make my game and players observable classes too with 
//@computed? probably but not sure yet
class Store {
    //games will likely be the game object?
    @observable current_game = new Game() //may just name this game
    @observable games = [ "game2"]
    // games = observable([ "game 1", " game2"])
  	@observable filter_string = ""
    @observable todos = [ new Todo(" learn Mobx") ]

    //not sure how the RegExp class works but useing the magic for now.. .the i makes it case insensative
    constructor(){
      this.current_game = new Game()
    }
    @computed get filtered_todos() {
      let matched_filter = new RegExp(this.filter_string, "i")
      return this.todos.filter(todo => !this.filter_string || matched_filter.test(todo.value))
    }
  
    createTodo(value){
      this.todos.push(new Todo(value))
    }
    //the arrow function binds it to this?!?
    clearComplete= () =>{
      //something about directly mutating the value breaks things
      //need to use .replace instead of just this.todos = []
      const incompleteToDos = this.todos.filter(todo => !todo.complete)
      this.todos.replace(incompleteToDos)
    }
    save_game = (game) =>{
      this.current_game = game
    }
    //not sure what @action does but doents seem to have an effect
    //however I must use the = () => {/.../} to bind to this or nothign happen and I dont know why
    @action new_game = () =>{
      this.current_game = new Game()
      this.current_game.start_new_game()
    }
    game_status(){
      console.log(this.current_game)
    }
}

let store = new Store()
export default store;
