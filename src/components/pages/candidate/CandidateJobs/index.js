import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../../firebasConfig";
import CandidateJobCard from "./CandidateJobCard";
import { v4 as uuid } from "uuid";
import { Notification } from "../../../../utils/Notification";
function CandidateJobs() {
  const [allJobs, setAllJobs] = useState(null);
  const fetchData = async () => {
    const q = query(collection(db, "jobs"));
    const querySnapshot = await getDocs(q);
    let jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push(doc.data());
    });

    setAllJobs(jobs);
  };

  useEffect(() => {
    fetchData();
    //fetch all the data from jobs collection
  }, []);

  const applyonJob = async (job) => {
    console.log(job, "apply");
    let userInfo = JSON.parse(localStorage.getItem("user"));
    let candidate_id = userInfo.uid;
    // 1.add this job in my applications section from which i can see all the jobs that i have applied for
    // 2.add a check in apply button that if i have already applied for this job then i should not be able to apply again
    //3.employer can also see that i have applied for this job

    let application_id = uuid();
    // add a check if user aleady applied for this job then show a notification that you have already applied for this job

    // fetch all the applications of this user with candidate_id
    // if job_id is already present in the applications then show a notification that you have already applied for this job

    const allApplications = await getDocs(
      query(
        collection(db, "applications"),
        where("candidate_id", "==", candidate_id)
      )
    );

    const alreadyApplied = allApplications.docs.find((doc) => {
      return doc.data().job_id === job.job_id;
    });
    //find returns the first element that satisfies the condition
    console.log(alreadyApplied, "alreadyApplied");
    if (alreadyApplied) {
      Notification({
        message: "You have already applied for this job",
        type: "error",
      });
      return;
    } else {
try{
      // fetch the candidate info from the candidate collection
      const candidate = await getDoc(doc(db,'userInfo',candidate_id))
      console.log(candidate.data(),'ssss')
      let candidate_resume=candidate.data().resume
      let candidate_exp=candidate.data().totalExperience;
      let candidate_name=candidate.data().name;

      await setDoc(doc(db, "applications", application_id), {
        job_id: job.job_id,
        candidate_id: candidate_id,
        application_id: application_id,
        status: "applied",
        createdAt: new Date(),
        employer_id: job.employer_id,
        jobTitle: job.jobTitle,
        company_name: job.company_name,
        candidate_resume,
        candidate_exp,
        candidate_name
      });
    }
    catch(err){
      console.log(err)
    }
    }

    Notification({
      message: "Applied Successfully",
      type: "success",
    });
    
  };
  return (
    <div>
      {allJobs && allJobs.length === 0 ? (
        <div>No Jobs Found</div>
      ) : allJobs && allJobs.length > 0 ? (
        <div>
          {allJobs.map((job) => {
            return <CandidateJobCard applyonJob={applyonJob} job={job} />;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CandidateJobs;
