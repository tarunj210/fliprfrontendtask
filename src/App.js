import React, { Component, Fragment } from 'react';
import Navbar from './components/Navbar';
import Detail from './components/Detail';
import Logistics from './components/Logistics';

import axios from 'axios';
import _ from 'lodash';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {},
      Table: {},
      activeFilter: 'DEL',
      rowActive: '',
    }
  }


  filterUpdate = (values) => {
    this.setState(prevState => Object.assign({}, prevState, {
      activeFilter: values,
      rowActive: '',
    }))
  }


  componentDidMount() {
    const token = 'tTU3gFVUdP';
    const url = 'https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch';
    const config = {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    };

    const bodyParameters = {
      email: "mayankmittal@intugine.com"
    };

    axios.post(url,
      bodyParameters,
      config
    )
      .then(response => {
        const result = response.data;

        this.setState(prevState => {
          let statusMap = Object.assign({}, prevState.status);
          let rowMap = {};
          let activeFilter = 'DEL';
          for (var i = 0; i < result.length; i++) {
            rowMap[result[i].awbno] = result[i];

            if (!statusMap[result[i].current_status_code]) {
              statusMap[result[i].current_status_code] = 0;
            }
            statusMap[result[i].current_status_code] += 1;
            activeFilter = result[i].current_status_code;
          }

          let rowArrMap = _.values(rowMap);
          if (statusMap.DEL) {
            activeFilter = 'DEL';
          }



          return Object.assign({}, prevState, {
            status: statusMap,
            Table: rowArrMap,
            activeFilter: activeFilter,

          })

        })
      })
      .catch((error) => console.log(error));
  }


  render() {
    return (
      <Fragment>
        <Navbar />
        <br />
        <Detail
          data={this.state.status}
          active={this.state.activeFilter}
          filterUpdate={this.filterUpdate}
        />
        <br />
        <br />
        <div className="row">
        <div className="col-sm-4"></div>
          <div className="col-sm-8">
            <Logistics
              data={this.state.Table}
              active={this.state.activeFilter}
              rowActive={this.state.rowActive}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
