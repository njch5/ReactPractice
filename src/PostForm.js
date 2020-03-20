import React, { Component } from 'react'

// https://www.youtube.com/watch?v=x9UEDRbLhJE
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      title: '',
      body: '',
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    // Prevents page refresh
    e.preventDefault()
    console.log(this.state)

    const data = this.state;

    // This is where we make our POST request
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.log('Error:', error);
    })

  }

  render() {
    // Destructuring 
    const { userId, title, body } = this.state
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input 
              type="text" 
              name="userId" 
              value={userId} 
              onChange={this.changeHandler} 
            />
          </div>
          <div>
          <input 
            type="text" 
            name="title" 
            value={title} 
            onChange={this.changeHandler} 
          />
          </div>
          <div>
          <input 
            type="text" 
            name="body" 
            value={body} 
            onChange={this.changeHandler} 
          />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default PostForm;