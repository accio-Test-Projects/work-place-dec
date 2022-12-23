import { Button, Grid } from "@mui/material";
import React from "react";
import "./Candidatejobs.css";
function CandidateJobCard({ job,applyonJob }) {
  console.log(job);
  const {
    company_logo,
    company_name,
    companyTagLine,
    jobTitle,
    jobLocation,
    salary,
    createdAt,
  } = job;
  return (
    <div className="jobCard">
      <Grid container>
        <Grid item xs={3}>
          <img
            width="70%"
            style={{ maxWidth: "110px" }}
            src={company_logo}
            alt="company logo"
          />
        </Grid>
        <Grid sx={{ textAlign: "left" }} item xs={9}>
          <h1>{company_name}</h1>
          <h2>{companyTagLine}</h2>
        </Grid>
      </Grid>

      <Grid className="jobCard_details" container spacing={1}>
        <Grid item xs={12} md={2}>
          {jobTitle}
        </Grid>
        <Grid item xs={2}>
          {jobLocation}
        </Grid>
        <Grid item xs={6} md={3}>
          {salary.currency} {salary.min} - {salary.max}
        </Grid>
        <Grid item xs={3} md={3}>
          {createdAt.toDate().toDateString()}
        </Grid>
        <Grid item xs={12} md={2}>
          <button
          onClick={()=>{applyonJob(job)}}
          className="apply-btn">Apply</button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CandidateJobCard;

//company name
//conpany tagline
//company logo

//job title
//job location
//salary range
// createdAt

// createdAt

// jobLocation
// jobTitle
// job_id
// salary
