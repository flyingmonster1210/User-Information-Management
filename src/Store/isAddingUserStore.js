import { makeAutoObservable } from "mobx"

class isAddingUserStore {
  isAddingUser = true
  constructor() {
    makeAutoObservable(this)
  }

  changeMode (flag) {
    this.isAddingUser = flag
  }
}

export default new isAddingUserStore()

