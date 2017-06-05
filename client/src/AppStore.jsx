import { autorun, observable } from "mobx"
import { Game } from "./pages/dominion/componants/GameClass"


//the tutorial I'm following is useing a @ decorator and some fancy webpacks I may need to eject
//but for the time being lets see if i can learn mobx as is
class Store {
    //games will likely be the game object?
    game1 = new Game
    @observable games = [ this.game1, " game2"]
    // games = observable([ "game 1", " game2"])
  	@observable filter = ""
}

let store = new Store
export default store

autorun(() => {
  console.log("store is",store)
  console.log("store is",store.games[0])
})