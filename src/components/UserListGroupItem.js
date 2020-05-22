import React, { Component } from "react";
import Jdenticon from "react-jdenticon";

export default class UserListGroupItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinedAt: this.dateToString(props.user.joinedAt),
    };
  }

  dateToString(time) {
    if (new Date(time).getTime() > 0) {
      const stringTime = new Date(time);
      return stringTime.toLocaleString();
    }
    return null;
  }

  render() {
    return (
      <span className="list-group-item list-group-item-action rounded-0">
        <div className="media">
          <Jdenticon
            size="50"
            value={this.props.user.handle || ""}
            className="rounded-circle"
          />
          <div className="media-body ml-4">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <h6 className="mb-0">{this.props.user.handle}</h6>
              <small className="small font-weight-bold"></small>
            </div>
            <small className="font-italic mb-0">
              Online since {this.state.joinedAt}
            </small>
          </div>
        </div>
      </span>
    );
  }
}
