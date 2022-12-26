import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../../../../../firebasConfig";

function Sidebar({handleClick}) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);
  const [lastMessages, setLastMessages] = useState(null);
  const fetchData = async () => {
    const q = query(
      collection(db, "last_messages"),
      where("employer_id", "==", currentUser.uid)
    );
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      setLastMessages(docs);
    });
  };
  useEffect(() => {
    // fetch data from last message collection
    // get all the docs from last message collection where th employer id is equal to the current user id
    // subscribe to  it

    fetchData();
  }, []);
  return (
    <div>
      {lastMessages && lastMessages.length === 0 ? (
        <h1>No messages</h1>
      ) : lastMessages && lastMessages.length > 0 ? (
        lastMessages.map((message) => {
          return (
            <div
            onClick={()=>handleClick(message)}
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

export default Sidebar;
