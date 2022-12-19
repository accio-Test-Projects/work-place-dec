import { Label } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebasConfig";
import "./employerOnboarding.css";
import { Notification } from "../../../../utils/Notification";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../../firebasConfig";
function EmployerOnboarding() {
  const navigate = useNavigate();
  const [uploadLoading, setUploadLoading] = useState(0);
  let inputRef = React.createRef();
  const [values, setValues] = useState({
    companyName: "",
    companyWebsite: "",
    companyEmail: "",
    companyPhone: "",
    industryType: "",
    noOfEmployees: "",

    companyLocation: "",
    companyTagline: "",
    companyDescription: "",
    logo: "",
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
      navigate("/employer/profile");
    } catch (err) {
      console.log(err);
      Notification({ message: "something went wrong" });
    }
  };

  const uploadLogo = (e) => {
    let file = e.target.files[0];
    console.log(file);
    //ref(storage,'path to file',file,name)
    const storageRef = ref(storage, "company-logo/" + file.name);
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
            logo: downloadURL,
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
  return (
    <form onSubmit={(e) => submit(e)} className="onboarding-container">
      <h2>Setup your Employer Profile</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <label className="field-label">Company Name</label>
          <TextField
            required
            size="small"
            fullWidth
            value={values.companyName}
            onChange={(e) =>
              setValues({ ...values, companyName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="field-label">Company Email</label>
          <TextField
            size="small"
            type="email"
            required
            fullWidth
            value={values.companyEmail}
            onChange={(e) =>
              setValues({ ...values, companyEmail: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="field-label">Company Phone</label>
          <TextField
            size="small"
            required
            fullWidth
            value={values.companyPhone}
            onChange={(e) =>
              setValues({ ...values, companyPhone: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <label className="field-label">Company Website</label>
          <TextField
            size="small"
            fullWidth
            value={values.companyWebsite}
            onChange={(e) =>
              setValues({ ...values, companyWebsite: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <label className="field-label">Company Location</label>
          <TextField
            size="small"
            fullWidth
            value={values.companyLocation}
            onChange={(e) =>
              setValues({ ...values, companyLocation: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <label className="field-label">Company tagline</label>
          <TextField
            size="small"
            fullWidth
            value={values.companyTagline}
            onChange={(e) =>
              setValues({ ...values, companyTagline: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <label className="field-label">Industry Type</label>
          <TextField
            size="small"
            fullWidth
            value={values.industryType}
            onChange={(e) =>
              setValues({ ...values, industryType: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <label className="field-label">No. of employees</label>
          <TextField
            size="small"
            fullWidth
            value={values.noOfEmployees}
            onChange={(e) =>
              setValues({ ...values, noOfEmployees: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label className="field-label">Company description</label>
          <TextField
            multiline
            minRows={5}
            fullWidth
            value={values.companyDescription}
            onChange={(e) =>
              setValues({ ...values, companyDescription: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label className="field-label">Company Logo</label>
          {uploadLoading > 0 && uploadLoading <= 100 ? (
            <div>Loading {uploadLoading} %</div>
          ) : (
            <>
              <input
                accept="image/*"
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
                  Upoad Logo
                </Button>
               { values.logo&&<img alt="logo" width="200px" src={values.logo} />}
              </div>
            </>
          )}
        </Grid>
        <div className="btn-container">
          <Button type="submit">Complete Setup</Button>
        </div>
      </Grid>
    </form>
  );
}

export default EmployerOnboarding;

// candidate name
// candidate email
// candidate phone
// total experience
// skills (array)
// primary role 
// resume (file)

// change the path of file 

// change type of user to candidate