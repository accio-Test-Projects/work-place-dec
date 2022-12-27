import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Message.css";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function MessageArea({ allConversations, submitMessage }) {
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.uid;
  const [sortedConversations, setSortedConversations] =
    useState(allConversations);
  useEffect(() => {
    if (allConversations) {
      setSortedConversations(
        allConversations.sort((a, b) => {
          return a.createdAt.toDate() - b.createdAt.toDate();
        })
      );
    }
  }, [allConversations]);

  const submit = (e) => {
    e.preventDefault();
    submitMessage(text);
  };
  return (
    allConversations && (
    <form
      onSubmit={(e) => submit(e)}
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "grid", gridGap: "10px" }}>
        {sortedConversations &&
          sortedConversations.map((conversation) => {
            return (
              <div>
                <div
                  className={
                    conversation.user_id === user_id
                      ? "send-by-user"
                      : "sent-by-other"
                  }
                >
                  <div>{conversation.message}</div>
                  <p>
                    {moment(conversation.createdAt.toDate())
                      .format("lll")
                      .toString()}
                     {  conversation.user_id === user_id&& <CheckCircleIcon 
                      size="small"
                      sx={{
                        fontSize: '16px',
                        marginLeft: '5px',
                        color:conversation.seen?'green':'gray'
                      }}
                      />}
                  </p>

                </div>
              </div>
            );
          })}
      </div>
      <Grid
        container
        spacing={1}
        sx={{
          border: " 1px solid #00000021",
          borderRadius: "10px",
          padding: "10px",
          position: "sticky",
          bottom: "10px",
          background: "#fff",
        }}
      >
        <Grid item xs={10}>
          <TextField
            size="small"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline={true}
            maxRows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button type="submit">
            <SendIcon
              sx={{
                color: user.type === "candidate" ? "green" : "#7F31D2",
              }}
            />
          </Button>
        </Grid>
      </Grid>
    </form>
    )
  );
}

export default MessageArea;
