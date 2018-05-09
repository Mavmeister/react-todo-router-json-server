import React, {Component} from 'react'
import PropTypes from 'prop-types'

const getCurrentPath = () => {
  const path = document.location.pathname
  return path.substring(path.lastIndexOf('/'))
  // returns last segment of pathname - everything after last /
}

export class Router extends Component {
  state = {
    route: getCurrentPath()
    // sets route when comp. loaded, but handleLinkClick needs to set route when each link is clicked
  }

  static childContextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }

  handleLinkClick = (route) => {
    this.setState({route})
    // key value are named same, so can use single word
    window.history.pushState(null, '', route)
  }

  getChildContext() {
    return {
      route: this.state.route,
      linkHandler: this.handleLinkClick
    }
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.setState({route: getCurrentPath})
    }
  }
  render() {
    return (
      <div> {this.props.children} </div>
    )
  }
}