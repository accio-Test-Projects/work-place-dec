import { Label } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebasConfig";
import "./candidateOnboarding.css";
import { Notification } from "../../../../utils/Notification";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../../firebasConfig";
import CustomDropDown from "../../../common/CustomDropDown";
import SearchDropDown from "../../../common/SearchDropDown";
import { useNavigate } from "react-router-dom";
import {
  currencyDropDownList,
  yearsOfExperience,
  jobTitle,
  SkillsDownList,
} from "../../../../constants";
function EmployerOnboarding() {
  const navigate = useNavigate();
  const [uploadLoading, setUploadLoading] = useState(0);
  let inputRef = React.createRef();
  const [values, setValues] = useState({
    name: JSON.parse(localStorage.getItem("user")).displayName || "",
    phone: "",
    email: JSON.parse(localStorage.getItem("user")).email,
    totalExperience: "", //d
    skills: [], // m d
    primaryRole: "", //d
    resume: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    console.log(values);
    const user = JSON.parse(localStorage.getItem("user"));
    const uid = user.uid;
    //call firebase function to create employer profile
    //store in firestore collection (userInfo)
    //create a doc with docId = uid

    // setDoc(docInfo,data)
    //docInfo= doc(database,collection name, docId)
    try {
      await setDoc(doc(db, "userInfo", uid), {
        ...values,
        type: "employer",
      });
      Notification({ message: "profile created successfully" });
      navigate("/candidate/profile")
    } catch (err) {
      console.log(err);
      Notification({ message: "something went wrong" });
    }
  };

  const uploadLogo = (e) => {
    let file = e.target.files[0];
    setUploadLoading(1);
    //ref(storage,'path to file',file,name)
    const storageRef = ref(storage, "resumes/" + file.name);
    //uploadBytesResumable(storage-Ref,file)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadLoading(progress);
      },
      (error) => {
        Notification({ message: "something went wrong" });
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValues({
            ...values,
            resume: downloadURL,
          });
          Notification({ message: "file uploaded successfully" });
          setUploadLoading(0);
        });
      }
    );

    // upload file to firebase storage
    // get the url of the file
    // set the url to the logo value state
  };

  const handleSkillsInput = (skill) => {
    if (!values.skills.includes(skill)) {
      setValues({
        ...values,
        skills: [...values.skills, skill],
      });
    }
  };
  return (
    <form onSubmit={(e) => submit(e)} className="onboarding-container">
      <h2>Setup your Profile</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <label className="field-label"> Name</label>
          <TextField
            required
            size="small"
            fullWidth
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="field-label">Email</label>
          <TextField
          disabled
            size="small"
            type="email"
            required
            fullWidth
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="field-label">Phone</label>
          <TextField
            size="small"
            required
            fullWidth
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label className="text-label">Experience</label>
          <CustomDropDown
            required={true}
            dropDownList={yearsOfExperience}
            val={values.totalExperience}
            onChange={(data) => setValues({ ...values, totalExperience: data })}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label className="text-label">Primary Role</label>

          <CustomDropDown
            required={true}
            dropDownList={jobTitle}
            val={values.primaryRole}
            onChange={(data) =>
              setValues({
                ...values,
                primaryRole: data,
              })
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label className="text-label">skills</label>
          <SearchDropDown
            required={true}
            dropDownList={SkillsDownList}
            onChange={(data) => handleSkillsInput(data)}
          />
          <div className="skills-container">
            {values.skills.map((skill, index) => {
              return (
                <div>
                  <div>{skill}</div>
                  <CancelRoundedIcon
                    color="error"
                    sx={{
                      fontSize: "14px",
                    }}
                    onClick={() =>
                      setValues({
                        ...values,
                        skills: values.skills.filter((item) => item !== skill),
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          <label className="field-label">Company Logo</label>
          {uploadLoading > 0 && uploadLoading <= 100 ? (
            <div>Loading {uploadLoading} %</div>
          ) : (
            <>
              <input
                accept="pdf/*"
                style={{
                  display: "none",
                }}
                ref={inputRef}
                type={"file"}
                value={""}
                onChange={(e) => uploadLogo(e)}
              />
              <div className="upload-btn-container">
                <Button onClick={() => inputRef.current.click()}>
                  Upoad Resume
                </Button>
                {values.logo && (
                  <img alt="logo" width="200px" src={values.logo} />
                )}
              </div>
            </>
          )}
        </Grid>
        <div className="btn-container">
          <Button type="submit">Complete onboarding</Button>
        </div>
      </Grid>
    </form>
  );
}

export default EmployerOnboarding;
