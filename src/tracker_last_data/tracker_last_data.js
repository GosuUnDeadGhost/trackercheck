import React, { Component } from 'react';
import './tracker_last_data.css';
import {TrackerLastDataModel} from './tracker_last_data_model.js';

import {
  isMobile
} from "react-device-detect";

class TrackerLastData extends Component {

  // constructor(props) {
  //   super(props);
  // }

  checkValue = (...params) => {
    let item = params[0];
    let value = params[1];

    if (value === undefined)
      return "-";

    let result;

    if (item.divider)
      value /= item.divider;

    switch (item.type) {
      case "integer":
        result = this.checkInteger(value);
        break;
      case "divisional":
        result = this.checkDivision(value);
        break;
      case "datetime":
        result = this.convertToDatetime(value*1000);
        break;
      case "boolean":
        result = this.checkBoolean(value);
        break;
      default:
        result = value;
        break;
    }

    if (item.unit)
      result += " " + item.unit;

    return result;
  }

  // Целое
  checkInteger = (value) => {
    return parseInt(value);
  }

  // Дробное
  checkDivision = (value) => {
    return value.toFixed(2);
  }

  // Дата и время
  convertToDatetime = (value) => {
    return new Intl.DateTimeFormat('ru-RU', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }).format(value);
  }

  checkBoolean = (value) => {
    return value === 1 ? "+" : "-";
  }

  getMapUtl = () => {
    if (isMobile)
      return "yandexnavi://build_route_on_map?lat_to=" + this.props.tracker_last_data.xcoord + "&lon_to=" + this.props.tracker_last_data.ycoord;
    return "https://yandex.by/maps/?l=sat,skl,&ll=" + this.props.tracker_last_data.ycoord + "," + this.props.tracker_last_data.xcoord + "&pt=" + this.props.tracker_last_data.ycoord + "E," + this.props.tracker_last_data.xcoord + "N,pmwtm1&z=16";
  }

  render() {
    return (
      this.props.tracker_last_data ?
      <table className="table">
        <thead>
          <a className="btn btn-success" target="_blank" href={this.getMapUtl()} rel="noopener noreferrer">Yandex</a>
        </thead>
        <tbody>
          {Object.keys(TrackerLastDataModel).map((item, i) => {
            let value = this.props.tracker_last_data[item];
            return (
              <tr key={i}>
                <td>{TrackerLastDataModel[item].name}</td>
                <td>{this.checkValue(TrackerLastDataModel[item], value)}</td>
              </tr>
            );
          })}
        </tbody>
      </table> : <p>Нет данных</p>
    )
  }
}

export default TrackerLastData;
