import React, { useEffect, useState } from "react";
import {
  query,
  where,
  collection,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../../firebasConfig";
import CommonTable from "../../../common/CommonTable";
import { doc, deleteDoc } from "firebase/firestore";
import { Notification } from "../../../../utils/Notification";
import { v4 as uuid } from "uuid";

const columns = [
  {
    title: "Candidate Name",
    dataIndex: "candidate_name",
    width: "20%",
  },
  {
    title: "Job Title",
    dataIndex: "jobTitle",
    width: "15%",
  },
  {
    title: "Experience",
    dataIndex: "candidate_exp",
    width: "10%",
  },
  {
    title: "Resume",
    dataIndex: "candidate_resume",
    type: "file",
    width: "10%",
  },
  {
    title: "Interest shown on",
    dataIndex: "createdAt",
    type: "date",
    width: "15%",
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "10%",
  },
  {
    title: "Action",
    type: "action",
    width: "20%",
    childrenAction: [
      { action: "accept", label: "Accept" },
      { action: "reject", label: "Reject" },
    ],
  },
];
function EmployerApplicants() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [allApplications, setAllApplications] = useState(null);
  let employerId = userInfo.uid;

  const fetch = () => {
    // fetch all the docs in applications collection where employerId === current user id

    const q = query(
      collection(db, "applications"),
      where("employer_id", "==", employerId)
    );

    //subscribe to the query
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let docs = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        docs.push(doc.data());
      });
      setAllApplications(docs);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  async function handleClick(action, data) {
    if (action === "accept") {
      //update the status of the application to "accepted"

      // a update call to the application collection
      setDoc(
        doc(db, "applications", data.application_id),
        {
          status: "accepted",
        },
        { merge: true }
      );
      Notification({
        type: "success",
        message: "Application Accepted",
      });
      // initialize a conversation between the employer and the candidate

      //1. initialize last message in the last_message collection
      // hey (candidate name) we  have accepted your application for the job (job title)
      //2. initialize the conversation in the conversations collection
      // hey (candidate name) we  have accepted your application for the job (job title)

      let conversation_id = uuid();
      let last_message = `Hey ${data.candidate_name} we have accepted your application for the job ${data.jobTitle}`;
      let last_message_id = uuid();
      let conversation_doc_id = uuid();
      await setDoc(doc(db, "last_messages", last_message_id), {
        last_message,
        last_message_id,
        createdAt: new Date(),
        conversation_id: conversation_id,
        employer_id: employerId,
        candidate_id: data.candidate_id,
        company_name: data.company_name,
        candidate_name: data.candidate_name,
        jobTitle: data.jobTitle,
      });

      await setDoc(doc(db, "conversations", conversation_doc_id), {
        conversation_id,
        message: last_message,
        createdAt: new Date(),
        by: "employer",
        user_id: employerId,
        conversation_doc_id,
      });
    } else if (action === "reject") {
      //delete the application from the collection
      console.log(data);
      deleteDoc(doc(db, "applications", data.application_id));
      Notification({
        type: "success",
        message: "Application Rejected",
      });
    }
  }

  return (
    <div>
      {allApplications && allApplications.length === 0 ? (
        <h1>no data</h1>
      ) : allApplications && allApplications.length > 0 ? (
        <CommonTable
          data={allApplications}
          columns={columns}
          handleClick={handleClick}
        />
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
}

export default EmployerApplicants;

//cand name
// cand resume
// cand experience
