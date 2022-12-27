import { Button } from '@mui/material'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import Messagearea from '../../../../common/Messagearea';
import {db} from '../../../../../firebasConfig';
import { v4 as uuid } from 'uuid';

function MessageArea({allConversations,setSelectedSectionMobile,currentSelectedMessage}) {
  let user=JSON.parse(localStorage.getItem("user"))
  let user_id=user.uid
  const submitMessage = (text) => {
    console.log(currentSelectedMessage);
    const conversation_doc_id=uuid()
    // update the last message in the last_message collection
    setDoc(doc(db, "last_messages", currentSelectedMessage.last_message_id
    ), {
      last_message: text,
    }, {merge: true}
    )
    // add a new document to the conversation collection
    setDoc(doc(db, "conversations",conversation_doc_id), {
      conversation_id: currentSelectedMessage.conversation_id,
      createdAt: new Date(),
      message: text,
      by: "candidate",
      user_id,
      conversation_doc_id
    })
  }
  const updateSeen = async () => {
    const q = await query(
      collection(db, "conversations"),
      where("conversation_id", "==", currentSelectedMessage.conversation_id)
    );
    try{
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc_) => {
      const data = doc_.data();
      console.log(data, "data");
      if (data.user_id !== user_id && !data.seen) {
        setDoc(
          doc(db, "conversations", data.conversation_doc_id),
          {
            seen: true,
          },
          { merge: true }
        );
      }
    });
  }catch(err){
    console.log(err);
  }
  }
  useEffect(() => {
    if (currentSelectedMessage) {
      // add a property  call seen=true to all conversation
      // where the conversation id is equal to the current selected message conversation id
      // and the user id should not be equal to the current user id
      updateSeen();
     
    }
  }, [currentSelectedMessage,allConversations]);
  return (
    <div>
      <Button
      sx={{
        display: {
          xs: "block",
          md: "none",
        }
      }} 
      onClick={()=>setSelectedSectionMobile("sidebar")}
      >back</Button>
      <Messagearea
      allConversations={allConversations}
      submitMessage={submitMessage}
      />
     
    </div>
  )
}

export default MessageArea