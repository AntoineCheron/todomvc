import { guid } from '../utils'

/* 
  Strong design decision: the data model is immutable. 
  Hence, any modification of it leads to the creation of a new instance.
*/
export default class Todo {
  constructor (title, isDone, id) {
    this.id = id || guid()
    this.title = title
    this.isDone = isDone || false
  }

  updateTitle (newTitle) {
    return this._copy({ title: newTitle })
  }

  complete () {
    return this._copy({ isDone: true })
  }

  uncomplete () {
    return this._copy({ isDone: false })
  }

  _copy ({ title, isDone }) {
    return new Todo(
      title || this.title,
      isDone !== undefined ? isDone : this.isDone,
      this.id
    )
  }
}
