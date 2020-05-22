import React, { Component } from "react";
import Jdenticon from "react-jdenticon";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentAt: this.dateToString(props.sentAt),
      owned: props.handle === props.myHandle,
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
      <div className="media mb-1">
        <Jdenticon
          size="40"
          value={this.props.handle || ""}
          className="rounded-circle"
        />
        <div className="media-body ml-3">
          <div
            className={`px-3 rounded py-2 ${
              this.state.owned ? "bg-primary" : "bg-light"
            }`}
          >
            <p
              className={`text-small mb-0 ${
                this.state.owned ? "text-white" : ""
              }`}
            >
              {this.props.content}
            </p>
          </div>
          <small className="text-muted">
            {this.state.owned ? "You " : `${this.props.handle} `}
            sent at {this.state.sentAt}
          </small>
        </div>
      </div>
    );
  }
}
