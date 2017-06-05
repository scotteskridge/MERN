import { observable } from "mobx"

export default class store {
    //games will likely be the game object?
    @observable games = [ "game 1", " game2"]
    @observable filter = ""
}