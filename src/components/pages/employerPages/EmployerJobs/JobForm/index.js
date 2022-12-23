import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { Notification } from "../../../../../utils/Notification";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebasConfig";
import RTE from "../../../../common/RTE";

const innitialValues = {
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
};
function JobForm({ setMobileSectionState, selectedJob }) {
  const [jobData, setJobData] = useState({
    ...innitialValues,
  });

  useEffect(() => {
    if (selectedJob) {
      setJobData({ ...selectedJob });
    } else {
      setJobData({ ...innitialValues });
    }
  }, [selectedJob]);

  const handleSkillsInput = (data) => {
    if (!jobData.skills.includes(data)) {
      setJobData({ ...jobData, skills: [...jobData.skills, data] });
    }
  };
  const submitJob = async (e) => {
    e.preventDefault();
    let job_id = uuidv4();
    let usetInfo = JSON.parse(localStorage.getItem("user"));
    let employer_id = usetInfo.uid;
    try {
      // setDoc(docRef,data)
      // docRef(databaseRef, collection, document id)
      if (selectedJob) {
        await setDoc(
          doc(db, "jobs", selectedJob.job_id),
          {
            ...jobData,
            createdAt: new Date(),
          },
          { merge: true }
        );
        Notification({ message: "Job Updated Successfully", type: "success" });
      } else {
        let conpanyInfo = {};
        await getDoc(doc(db, "userInfo", employer_id)).then((docSnap) => {
          conpanyInfo = docSnap.data();
        });

        await setDoc(doc(db, "jobs", job_id), {
          job_id,
          employer_id,
          company_name: conpanyInfo.companyName,
          company_logo: conpanyInfo.logo,
          companyTagLine: conpanyInfo.companyTagline,
          ...jobData,
          createdAt: new Date(),
        });
        Notification({ message: "Job Posted Successfully", type: "success" });
      }
    } catch (err) {
      console.log(err);
      Notification({ message: "something went wrong", type: "error" });
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
      <form onSubmit={(e) => submitJob(e)}>
        <Grid className="form-container" container>
          <Grid item xs={12} md={6}>
            <label className="text-label">Job Title</label>
            <CustomDropDown
              required={true}
              dropDownList={jobTitle}
              val={jobData.jobTitle}
              onChange={(data) => setJobData({ ...jobData, jobTitle: data })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="text-label">Job Type</label>
            <CustomDropDown
              required={true}
              dropDownList={jobType}
              val={jobData.jobType}
              onChange={(data) => setJobData({ ...jobData, jobType: data })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="text-label">Location</label>
            <CustomDropDown
              required={true}
              dropDownList={jobLocation}
              val={jobData.jobLocation}
              onChange={(data) => setJobData({ ...jobData, jobLocation: data })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className="text-label">Experience</label>
            <CustomDropDown
              required={true}
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
                  required={true}
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
                  required={true}
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
                  required={true}
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
              required={true}
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
                          skills: jobData.skills.filter(
                            (item) => item !== skill
                          ),
                        })
                      }
                    />
                  </div>
                );
              })}
            </div>
          </Grid>
          <Grid item xs={12}>
            <RTE
              content={jobData.jobDescription}
              setContent={(data) =>
                setJobData({ ...jobData, jobDescription: data })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <button type="submit" className="publish-btn">
              {selectedJob ? "Update" : "Publish"}
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default JobForm;

// salary  3 input fields( currency, min, max)
// job description
