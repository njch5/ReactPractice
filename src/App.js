import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Dropdown from './Dropdown';
import PostForm from './PostForm';
import MaterialForm from './MaterialForm';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      columnDefs: [{
        headerName: "Make", field: "make", sortable: true, filter: "agTextColumnFilter"
      }, {
        headerName: "Model", field: "model", sortable: true, filter: true
      }, {
        headerName: "Price", field: "price", sortable: true, filter: true
      }],
      // rowData: [{
      //   make: "Toyota", model: "Celica", price: 35000
      // }, {
      //   make: "Ford", model: "Mondeo", price: 32000
      // }, {
      //   make: "Porsche", model: "Boxter", price: 72000
      // }]

      rowData: null,
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }


   handleDropdownChange(e) {
    this.setState({ selectedName: e.target.value });
  }

  componentDidMount() {

    fetch('https://api.myjson.com/bins/15psn9')
      .then(response => response.json())
      .then(rowData => this.setState({rowData}))
      .catch(err => console.log('err'))
    }

  render() {
    // console.log(this.state.selectedName);
    console.log(this.state.rowData);
    return (
      
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '600px' }}
      >

        <PostForm />
        <Dropdown onChangeValue={this.handleDropdownChange}/>
        
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          rowSelection="multiple"
        />

        <MaterialForm />
      </div>
    );
  }
}

export default App;