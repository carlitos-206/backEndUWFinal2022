import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InfoWindow } from "google-maps-react";

export default class InfoWindowEx extends Component {
  constructor(props) {
    super(props);
    this.infoWindowRef = React.createRef();
    this.contentElement = document.createElement(`div`);
  }

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children && typeof this.props.children === 'object') {
      ReactDOM.render(
        React.Children.toArray(this.props.children),
        this.contentElement
      );
      this.infoWindowRef.current.infowindow.setContent(this.contentElement);
    }else{
      ReactDOM.render(
        React.Children.map(this.props.children, (child, index) => (
          <div>{child}</div>
      )),
        this.contentElement
      )
    }
  }

  render() {
    return <InfoWindow ref={this.infoWindowRef} {...this.props} />;
  }
}