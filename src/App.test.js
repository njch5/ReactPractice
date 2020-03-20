import React from 'react';
import fetchMock from 'fetch-mock'
import { shallow, mount } from 'enzyme';
import { render } from '@testing-library/react';

import App from './App';
import Dropdown from './Dropdown';
require('jest-fetch-mock').enableMocks()


it('renders', () => {
  render(<App />);
});

it('can select a name', () => {
  // const wrapper = mount(<App />);
  const wrapper = shallow(<App />);
  console.log(wrapper.debug());
  // const instance = wrapper.instance()
  // instance.handleDropdownChange( {target: { selectedName: 'Bob'}})
  // const dropdownComponent = wrapper.find(<Dropdown />).first()
  // expect(dropdownComponent).prop('selectedName').toEqual('Bob');
  // console.log(wrapper.debug());
});

describe("handleChange", () => {
  it("should call setState on selectedName", () => {
    const wrapper = shallow(<App />)
    const mockEvent = {
      target: {
        name: "selectedName",
        value: "test"
      }
    };
    const expected = {
      "columnDefs": [
             {
               "field": "make",
               "filter": "agTextColumnFilter",
               "headerName": "Make",
               "sortable": true,
             },
              {
               "field": "model",
               "filter": true,
               "headerName": "Model",
               "sortable": true,
             },
              {
               "field": "price",
               "filter": true,
               "headerName": "Price",
               "sortable": true,
             },
           ],
           "rowData": null,
      selectedName: "test",
    };
    wrapper.instance().handleDropdownChange(mockEvent);
    
    expect(wrapper.state()).toEqual(expected);
  });
});

describe( "component with fetch", () => {
  it( "state gets updated with the fetch", ( done ) => {
    const wrapper = shallow( <App /> );
    setTimeout(() => {
      wrapper.update();
      const state = wrapper.instance().state;
      console.log(state);
      done();
    }, 15 );
  })
})

it('should match the snapshot', () => {
  const wrapper = shallow(<App />);

  expect(wrapper).toMatchSnapshot();
});

const DELAY_MS = 2000

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchResponseJson = async (url) => {
  try {
    const response = await fetch(url)
    const responseJson = await response.json()
    // You can introduce here an artificial delay, both Promises and async/await will wait until the function returns
    // await sleep(DELAY_MS)
    return responseJson
  }
  catch (e) {
    console.log(`fetchResponseJson failed:`, e)
  }
}
class SimpleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { rowData: null }
  }

  render() {
    return(
      <span>{JSON.stringify(this.state.rowData)}</span>
    )
  }

  // By returning the promise (a call to an async function) we can await componentDidMount
  componentDidMount() {
    return fetchResponseJson(`https://api.myjson.com/bins/15psn9`).then((responseJson) => {
      this.setState({
        rowData: responseJson
      })
    })
  }
}

fetchMock.get(`*`, JSON.stringify({make: `Toyota`, model: `Celica`, price: 35000}))

describe(`Mocking fetch`, () => {

  // If you want to have different mocks for each test uncomment beforeEach
  // beforeEach(() => {
  //   fetchMock.restore()
  // })

  test(`fails with synchronous code`, () => {
    const responseJson = fetchResponseJson(`https://api.myjson.com/bins/15psn9`)
    expect(responseJson).not.toHaveProperty(`make`, `Toyota`)
  })
  

  test(`using promises`, () => {
    expect.assertions(1)
    // Must return or the expect will not run within this test!
    return fetchResponseJson(`https://api.myjson.com/bins/15psn9`).then(
      (responseJson) => { expect(responseJson).toHaveProperty(`make`, `Toyota`) })
  })

  // test(`using async/await`, async () => {
  //   const responseJson = await fetchResponseJson(`http://foo.bar`)
  //   expect(responseJson).toHaveProperty(`Rick`, `I turned myself into a pickle, Morty!`)
  // })

  // test(`on a React component that loads data into state in componentDidMount`, async () => {
  //   const wrapper = shallow(<SimpleComponent />)

  //   await wrapper.instance().componentDidMount()
  //   // Much less robust, you need to ensure that the sleeping time is greater than the time it takes to resolve the
  //   // fetch, play with values less than or greater than L18 above to see how the component changes
  //   // await sleep(DELAY_MS - 1000)
  //   // await sleep(DELAY_MS + 1000)

  //   // State can be tested here, but not DOM properties, because setState happens in... the future!
  //   // This is more of an Enzyme thing, I suspect
  //   expect(wrapper.state(`data`)).toHaveProperty(`Rick`, `I turned myself into a pickle, Morty!`)
  //   expect(wrapper.text()).not.toEqual(JSON.stringify({Rick: `I turned myself into a pickle, Morty!`}))

  //   // Force update to sync component with state
  //   wrapper.update()
  //   expect(wrapper.text()).toBe(`{"Rick":"I turned myself into a pickle, Morty!"}`)
  // })
})

test(`rowData cannot be read`, () => {
  const fetchPromise = Promise.reject(undefined)

  global.fetch = () => fetchPromise

  const app = shallow(<App />)
  app.instance().componentDidMount()

  expect(app.state('rowData')).toEqual(null)
})