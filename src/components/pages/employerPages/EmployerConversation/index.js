import { Grid } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../firebasConfig";
import React,{useState} from "react";
import MessageArea from "./MessageArea";
import SideBar from "./SideBar";

function EmployerConversation() {
  const [allConversations, setAllConversations] = useState(null);
  const handleClick = async (message) => {
    console.log(message);
  

    // fetch all the docs from the conversation collection,
    //  where the conversation id is equal to the conversation id of the message
    // subscribe to it

    const q = query(
      collection(db, "conversations"),
      where("conversation_id", "==", message.conversation_id)
    );
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      setAllConversations(docs);
    });
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <SideBar handleClick={handleClick} />
      </Grid>
      <Grid item xs={9}>
        <MessageArea allConversations={allConversations} />
      </Grid>
    </Grid>
  );
}

export default EmployerConversation;
