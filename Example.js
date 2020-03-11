import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: AllModules,
      columnDefs: [
        {
          headerName: "Athlete",
          field: "athlete",
          width: 150,
          filter: "agSetColumnFilter"
        },
        {
          headerName: "Age",
          field: "age",
          width: 90,
          filter: "agNumberColumnFilter"
        },
        {
          headerName: "Country",
          field: "country",
          width: 120
        },
        {
          headerName: "Year",
          field: "year",
          width: 90
        },
        {
          headerName: "Date",
          field: "date",
          width: 145,
          filter: "agDateColumnFilter",
          filterParams: {
            comparator: function(filterLocalDateAtMidnight, cellValue) {
              var dateAsString = cellValue;
              if (dateAsString == null) return -1;
              var dateParts = dateAsString.split("/");
              var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
              if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            }
          }
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 110,
          filter: "agTextColumnFilter"
        },
        {
          headerName: "Gold",
          field: "gold",
          width: 100,
          filter: "agNumberColumnFilter"
        },
        {
          headerName: "Silver",
          field: "silver",
          width: 100,
          filter: "agNumberColumnFilter"
        },
        {
          headerName: "Bronze",
          field: "bronze",
          width: 100,
          filter: "agNumberColumnFilter"
        },
        {
          headerName: "Total",
          field: "total",
          width: 100,
          filter: false
        }
      ],
      defaultColDef: {
        sortable: true,
        filter: true
      },
      rowData: null
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  irelandAndUk() {
    var countryFilterComponent = this.gridApi.getFilterInstance("country");
    countryFilterComponent.selectNothing();
    countryFilterComponent.selectValue("Ireland");
    countryFilterComponent.selectValue("Great Britain");
    countryFilterComponent.applyModel();
    this.gridApi.onFilterChanged();
  }
  clearCountryFilter() {
    var countryFilterComponent = this.gridApi.getFilterInstance("country");
    countryFilterComponent.selectEverything();
    countryFilterComponent.applyModel();
    this.gridApi.onFilterChanged();
  }
  destroyCountryFilter() {
    this.gridApi.destroyFilter("country");
  }
  endingStan() {
    var countryFilterComponent = this.gridApi.getFilterInstance("country");
    countryFilterComponent.selectNothing();
    for (var i = 0; i < countryFilterComponent.getUniqueValueCount(); i++) {
      var value = countryFilterComponent.getUniqueValue(i);
      var valueEndsWithStan = value.indexOf("stan") === value.length - 4;
      if (valueEndsWithStan) {
        countryFilterComponent.selectValue(value);
      }
    }
    countryFilterComponent.applyModel();
    this.gridApi.onFilterChanged();
  }
  setCountryModel() {
    var countryFilterComponent = this.gridApi.getFilterInstance("country");
    var model = {
      type: "set",
      values: ["Algeria", "Argentina"]
    };
    countryFilterComponent.setModel(model);
    this.gridApi.onFilterChanged();
  }
  printCountryModel() {
    var countryFilterComponent = this.gridApi.getFilterInstance("country");
    var model = countryFilterComponent.getModel();
    if (model) {
      console.log("Country model is: [" + model.values.join(",") + "]");
    } else {
      console.log("Country model filter is not active");
    }
  }
  
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div>
          <span className="button-group">
            <button onClick={this.irelandAndUk.bind(this)}>Ireland &amp; UK</button>
            <button onClick={this.endingStan.bind(this)}>Countries Ending 'stan'</button>
            <button onClick={this.setCountryModel.bind(this)}>Set Model ['Algeria','Argentina']</button>
            <button onClick={this.printCountryModel.bind(this)}>Print Country Model</button>
            <button onClick={this.clearCountryFilter.bind(this)}>Clear Country</button>
            <button onClick={this.destroyCountryFilter.bind(this)}>Destroy Country</button>
          </span>
          <br />
        </div>
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%"
          }}
          className="ag-theme-balham"
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
