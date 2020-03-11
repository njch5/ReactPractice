import React, { Component } from 'react'
import { render } from 'react-dom'

class AForm extends Component {

  componentWillMount() {
    this.getData()
  }

  getData() {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('POST', 'https://api.myjson.com/bins/14rcfu')
    
    // send the request
    xhr.send(JSON.stringify({ name: 'Anna' }))
  }

  render() {
    return (
      <div>
        <p>Hello World</p>
      </div>
    )
  }
}

export default AForm;