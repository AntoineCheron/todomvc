import React, { Component } from 'react'

export default class WhenClickOutside extends Component {
  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this))
  }

  componentWillUnmount () {
    document.removeEventListener(
      'mousedown',
      this.handleClickOutside.bind(this)
    )
  }

  setWrapperRef (node) {
    this.wrapperRef = node
  }

  handleClickOutside (event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.callback(event)
    }
  }

  render () {
    return <div ref={this.setWrapperRef.bind(this)}>{this.props.children}</div>
  }
}
