import { guid } from '../utils'

/* 
  Strong design decision: the data model is immutable. 
  Hence, any modification of it leads to the creation of a new instance.
*/
export default class Todo {
  constructor (title, completed, id) {
    this.id = id || guid()
    this.title = title
    this.completed = completed || false
  }

  updateTitle (newTitle) {
    return this._copy({ title: newTitle })
  }

  complete () {
    return this._copy({ completed: true })
  }

  uncomplete () {
    return this._copy({ completed: false })
  }

  _copy ({ title, completed }) {
    return new Todo(
      title || this.title,
      completed !== undefined ? completed : this.completed,
      this.id
    )
  }
}
