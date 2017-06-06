import React from "react"
import { observer } from "mobx-react"

@observer
export default class TodoList extends React.Component{
  constructor(props){
    super(props)
  }
  filter(event){
    this.props.store.filter_string = event.target.value
  }
  //useing e instead of event it's like req,res
  //there is a lot going on here, I don't know what .which does, also I'm not sure if the arg of this function,
  //event is the div DOM element or some other object
  //from the console log and react docs it looks like 
  //event is a proxy or synthetic event object similar to the window
  //but that wraps around it and changes it
  createNew(e){
    if (e.which === 13){
      this.props.store.createTodo(e.target.value)
      e.target.value = ""
    }
  }
  // this the same as passing in "e" or "event" I think, also be aware that the .bind() take more than one arg
  //be aware this kind of forces two way data becuase .complete is being observed and any changes propage everywhere
  toggleComplete(todo){
    todo.complete = !todo.complete
  }

  render(){
    const {clearComplete, todos, filtered_todos, filter_string} = this.props.store

    const todo_list = filtered_todos.map(todo => (
      <li key = {todo._ID}> 
        <input type = "checkbox" onChange={this.toggleComplete.bind(this, todo)} value = {todo.complete} checked = {todo.complete} />{todo.value} </li>
    ))
    

    return(
      <div>
        <h1> ToDOs </h1>
        <input className = "filter" value = {filter_string} onChange={this.filter.bind(this)} />
        <div><input className="create" onKeyPress={this.createNew.bind(this)} /></div>
        <ul> {todo_list} </ul>
        <a href="#" onClick={clearComplete}> Clear Complete </a> 
       </div>
    )
  }
}