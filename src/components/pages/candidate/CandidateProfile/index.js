import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebasConfig";
import "./candidateOnboarding.css";
import { Notification } from "../../../../utils/Notification";
import loadingimg from "../.../../../../../acessts/loading.gif";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebasConfig";
import CustomDropDown from "../../../common/CustomDropDown";
import SearchDropDown from "../../../common/SearchDropDown";
import { useNavigate } from "react-router-dom";
import {
  jobTitle,
  SkillsDownList,
  yearsOfExperience,
} from "../../../../constants";

function CandidateProfile() {
  const navigate = useNavigate();
  const [uploadLoading, setUploadLoading] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disableFields, setDisableFields] = useState(true);
  let inputRef = React.createRef();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
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
      navigate("/candidate/profile");
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

  useEffect(() => {
    //get user info from firestore
    setLoading(true);
    let user = JSON.parse(localStorage.getItem("user"));
    let uid = user.uid;
    let docRef = doc(db, "userInfo", uid);
    getDoc(docRef).then((doc) => {
      console.log(doc);
      if (doc.exists()) {
        console.log("Document data:", doc.data());
        setValues({ ...doc.data() });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        Notification({ message: "No profile found" });
      }
      setLoading(false);
    });
  }, []);
  const makeEditable = () => {
    setDisableFields(prevState => !prevState);
  };
  return (
    <div>
      {loading ? (
        <div>
          <img
            style={{ width: "inherit", maxWidth: "100%" }}
            src={loadingimg}
            alt="loading"
          />
        </div>
      ) : (
        <form onSubmit={(e) => submit(e)} className="onboarding-container">
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <div className="btn-container">
                <Button
                type={disableFields ? "submit" : "button"}
                onClick={makeEditable}>
                  {" "}
                  {disableFields ? "Edit" : "save"}
                </Button>
                <Button>Logout</Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="field-label"> Name</label>
              <TextField
                disabled={disableFields}
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
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="field-label">Phone</label>
              <TextField
                size="small"
                disabled={disableFields}
                required
                fullWidth
                value={values.phone}
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="text-label">Experience</label>
              <CustomDropDown
                  disabled={disableFields}
                required={true}
                dropDownList={yearsOfExperience}
                val={values.totalExperience}
                onChange={(data) =>
                  setValues({ ...values, totalExperience: data })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="text-label">Primary Role</label>

              <CustomDropDown
                  disabled={disableFields}
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
                  disabled={disableFields}
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
                          pointerEvents:disableFields ? "none" : "auto",
                        }}
                        onClick={() =>
                          setValues({
                            ...values,
                            skills: values.skills.filter(
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
                    <Button     disabled={disableFields} onClick={() => inputRef.current.click()}>
                      Upoad Resume
                    </Button>
                    {values.logo && (
                      <img alt="logo" width="200px" src={values.logo} />
                    )}
                  </div>
                </>
              )}
            </Grid>
          
          </Grid>
        </form>
      )}
    </div>
  );
}

export default CandidateProfile;
