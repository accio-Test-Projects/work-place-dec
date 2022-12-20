import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import "./JobForm.css";
import {
  jobTitle,
  jobType,
  jobLocation,
  yearsOfExperience,
  SkillsDownList,
  currencyDropDownList,
} from "../../../../../constants";
import CustomDropDown from "../../../../common/CustomDropDown";
import SearchDropDown from "../../../../common/SearchDropDown";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

function JobForm({ setMobileSectionState }) {
  const [jobData, setJobData] = useState({
    jobTitle: "",
    jobType: "",
    jobLocation: "",
    yearsOfExperience: "",
    salary: {
      currency: "",
      min: "",
      max: "",
    },
    jobDescription: "",
    skills: [],
  });

  const handleSkillsInput = (data) => {
    if (!jobData.skills.includes(data)) {
      setJobData({ ...jobData, skills: [...jobData.skills, data] });
    }
  };
  return (
    <div>
      <Button
        sx={{
          display: { xs: "block", md: "none" },
        }}
        onClick={() => setMobileSectionState("sidebar")}
      >
        back
      </Button>
      <Grid className="form-container" container>
        <Grid item xs={12} md={6}>
          <label className="text-label">Job Title</label>
          <CustomDropDown
            dropDownList={jobTitle}
            val={jobData.jobTitle}
            onChange={(data) => setJobData({ ...jobData, jobTitle: data })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="text-label">Job Type</label>
          <CustomDropDown
            dropDownList={jobType}
            val={jobData.jobType}
            onChange={(data) => setJobData({ ...jobData, jobType: data })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="text-label">Location</label>
          <CustomDropDown
            dropDownList={jobLocation}
            val={jobData.jobLocation}
            onChange={(data) => setJobData({ ...jobData, jobLocation: data })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label className="text-label">Experience</label>
          <CustomDropDown
            dropDownList={yearsOfExperience}
            val={jobData.yearsOfExperience}
            onChange={(data) =>
              setJobData({ ...jobData, yearsOfExperience: data })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="text-label">Salary</label>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomDropDown
                dropDownList={currencyDropDownList}
                val={jobData.salary.currency}
                onChange={(data) =>
                  setJobData({
                    ...jobData,
                    salary: { ...jobData.salary, currency: data },
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                placeholder="min"
                value={jobData.salary.min}
                onChange={(e) =>
                  setJobData({
                    ...jobData,
                    salary: { ...jobData.salary, min: e.target.value },
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                placeholder="max"
                value={jobData.salary.max}
                onChange={(e) =>
                  setJobData({
                    ...jobData,
                    salary: { ...jobData.salary, max: e.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="text-label">skills</label>
          <SearchDropDown
            dropDownList={SkillsDownList}
            onChange={(data) => handleSkillsInput(data)}
          />
          <div className="skills-container">
            {jobData.skills.map((skill, index) => {
              return (
                <div>
                  <div>{skill}</div>
                  <CancelRoundedIcon
                    color="error"
                    sx={{
                      fontSize: "14px",
                    }}
                    onClick={() =>
                      setJobData({
                        ...jobData,
                        skills: jobData.skills.filter((item) => item !== skill),
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
        </Grid>
        <Grid item xs={12}>
          <button
          onClick={() => console.log(jobData)}
          className="publish-btn">Publish</button>
        </Grid>
      </Grid>
    </div>
  );
}

export default JobForm;

// salary  3 input fields( currency, min, max)
// job description
