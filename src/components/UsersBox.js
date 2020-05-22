import React, { Component } from "react";
import UserListGroupItem from "./UserListGroupItem";
import Jdenticon from "react-jdenticon";

export default class UsersBox extends Component {
  render() {
    return (
      <>
        <div className="messages-box">
          <div className="list-group rounded-0">
            {this.props.users.map((user, index) => {
              return <UserListGroupItem key={index} user={user} />;
            })}
          </div>
          <div className="user-info">
            <div className="media mb-1">
              <Jdenticon
                size="30"
                value={this.props.handle || ""}
                className="rounded-circle"
              />
              <div className="media-body ml-3">
                <div className="px-3">
                  <p className="text-small mb-0">
                    <span className="text-muted">You are chatting as:</span>
                    <br />
                    {this.props.handle}
                  </p>
                </div>
                <small className="text-muted"></small>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
