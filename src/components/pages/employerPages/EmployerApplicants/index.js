import React, { useEffect, useState } from "react";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebasConfig";
import CommonTable from "../../../common/CommonTable";

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

  function handleClick(action, data) {
    console.log(action, "----", data);
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
