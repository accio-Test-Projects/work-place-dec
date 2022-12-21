import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SideBar.css";
import SearchIcon from "@mui/icons-material/Search";
import SidebarCard from "./SidebarCard";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../firebasConfig";

function Sidebar({ setMobileSectionState, selectedJob, setSelectedJob }) {
  const [jobs, setJobs] = useState(null);
  const [jobearch, setJobSearch] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    // fetch the jobs with employer id===login user id
    // subscribe to the jobs collection where employer id===login user id
    //so that frontend is updated when a new job is added or an existing job is updated

    //quary(collect ref,condition)
    //collection ref(databaseRef, collection name)
    //condition(where(field,operator,value))
    //onSnapshot(query, callback)
    let usetInfo = JSON.parse(localStorage.getItem("user"));
    let employer_id = usetInfo.uid;

    const q = query(
      collection(db, "jobs"),
      where("employer_id", "==", employer_id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      setJobs(jobs);
      setJobSearch(jobs);
      console.log(jobs);
    });
  }, []);

  useEffect(() => {
    if (search) {
      const filteredJobs = jobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(search.toLowerCase())||
        job.jobLocation.toLowerCase().includes(search.toLowerCase())
      );
      setJobSearch(filteredJobs);
    } else {
      setJobSearch(jobs);
    }

  }, [search]);
  return (
    <div className="sidebar-container">
      <div
        style={{
          position: "sticky",
          background: "white",
          top: "0",
          zIndex: "2",
          padding: "5px",
        }}
      >
        <button
          className="post-job-btn"
          onClick={() => {
            setMobileSectionState("jobform");
            setSelectedJob(null);
          }}
        >
          Post a Job
          <p>Post your requirements and hire candidates</p>
        </button>

        <TextField
          sx={{
            marginTop: "10px",
            div: {
              boxShadow: " 0px 1px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: " 45px",
            },
          }}
          placeholder="Search Jobs"
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {jobearch && jobearch.length === 0 ? (
        <div>no job</div>
      ) : jobearch && jobearch.length > 0 ? (
        <div>
          {jobearch.map((job, i) => {
            return (
              <SidebarCard
                job={job}
                setSelectedJob={setSelectedJob}
                selectedJob={selectedJob}
                key={job.job_id}
              />
            );
          })}
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Sidebar;
