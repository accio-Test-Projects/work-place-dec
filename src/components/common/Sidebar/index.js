import React from "react";
import "./Sidebar.css";
function SideBar({ lastMessages, handleClick, currentSelectedMessage }) {
  return (
    <div className="container">
      {lastMessages && lastMessages.length === 0 ? (
        <h1>No messages</h1>
      ) : lastMessages && lastMessages.length > 0 ? (
        lastMessages.map((message, key) => {
          return (
            <div
              key={key}
              className={
                message.last_message_id ===
                currentSelectedMessage?.last_message_id
                  ? "selected-card"
                  : "card"
              }
              onClick={() => handleClick(message)}
            >
              <h2>{message.candidate_name}</h2>
              <p>{message.last_message}</p>
            </div>
          );
        })
      ) : (
        <h2>loading</h2>
      )}
    </div>
  );
}

export default SideBar;
