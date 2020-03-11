import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
        values: [],
        selectedName: '',
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
    componentDidMount() {
       fetch('https://api.myjson.com/bins/14rcfu')
     .then(response => {return response.json()})
      .then(data => {
        const values = data.values;
        this.setState({values});
      })
      .catch(err => console.log(err))
    }
//     render(){
//         return <div className="drop-down">
//             <p>I would like to render a dropdown here from the values object</p>
//               {/* <select>{
//                  this.state.values.map((obj) => {
//                      return <option value={obj.id}>{obj.name}</option>
//                  })
//               }</select> */}
//               {/* <select>
//                 {console.log(this.state.values)}
//               </select> */}
//             </div>;
//     }
// }

// render() {
//   return (
//     <div>
//       {this.state.values.map((user, index) => {
//         return (
//           <div key={index}>
//             <div>{user.name}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// }

  handleDropdownChange(e) {
    this.setState({ selectedName: e.target.value });
  }


render(){
  console.log(this.state.selectedName);
  // console.log(this.state.values);
  return (
    <div>
          <div>
            <select id="dropdown" onChange={this.handleDropdownChange}>{
                 this.state.values.map((obj) => {
                     return <option key={obj.id} value={obj.name}>{obj.name}</option>
                 })
              }</select>
          </div>
    </div>
  );
  }
}

export default Dropdown;

// const namess = {"values": [
//   {
//     "id": 0,
//     "name": "Jeff"
//   },
//   {
//     "id": 1,
//     "name": "Joe"
//   },
// ]
// }


// let names = Object.keys(namess.values)
// console.log(namess["values"])
// console.log(names);
// [ { id: 0, name: 'Jeff' }, { id: 1, name: 'Joe' } ]
// [ '0', '1' ]

