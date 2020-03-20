import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';

class MaterialForm extends Component {
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
        <form noValidate autoComplete="off" onSubmit={this.submitHandler}>
          <TextField 
            id="standard-basic" 
            label="User ID" 
            name="userId"
            value={userId} 
            onChange={this.changeHandler} 
          />
          <TextField 
            id="standard-basic" 
            label="Title"
            name="title" 
            value={title} 
            onChange={this.changeHandler}
          />
          <TextField 
            id="standard-basic" 
            label="Body"
            name="body"
            value={body} 
            onChange={this.changeHandler}  
          />

            <button type="submit">Submit</button>
        </form>
    )
  }
}

export default MaterialForm;