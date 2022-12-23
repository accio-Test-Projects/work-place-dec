import React, { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebasConfig";
import CommmonTable from "../../../common/CommonTable";

const columns=[
  {
    title: "Company Name",
    dataIndex: "company_name",
  },
  {
    title: "Job Title",
    dataIndex: "jobTitle",
  },
  {
    title: "Interest shown on",
    dataIndex: "createdAt",
    type: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  }
]

function CandidateApplication() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const candidate_id = userInfo.uid;
  const [allApplications, setAllapplications] = useState(null);

  const fetch = async () => {
    // get call to firesetore to get the all the
    // applications where candidate id is equal to the current user id
    //
    try {
      const q = await query(
        collection(db, "applications"),
        where("candidate_id", "==", candidate_id)
      );
      const querySnapshot = await getDocs(q);
      let applications = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        applications.push(doc.data());
      });
      setAllapplications(applications);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {allApplications && allApplications.length === 0 ? (
        <h1>No Applications</h1>
      ) : allApplications && allApplications.length > 0 ? (
      <CommmonTable
      data={allApplications}
      columns={columns}
      />
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default CandidateApplication;
