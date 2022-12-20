import { Button, TextField } from "@mui/material";
import React from "react";
import "./SideBar.css";
import SearchIcon from '@mui/icons-material/Search';
import SidebarCard from "./SidebarCard";
function Sidebar({ setMobileSectionState }) {
  return (
    <div className="sidebar-container">
      <div
      style={{
        position:'sticky',
        background:'white',
        top:'0',
        zIndex: '2',
        padding: '5px'
      }}
      >
      <button
        className="post-job-btn"
        onClick={() => setMobileSectionState("jobform")}
      >
        Post a Job
        <p>Post your requirements and hire candidates</p>
      </button>
     
      <TextField
        sx={{
          marginTop: "10px",
          "div": {
            boxShadow:' 0px 1px 4px rgba(0, 0, 0, 0.25)',
            borderRadius:' 45px'
          },
        }}
        placeholder="Search Jobs"
        fullWidth
        InputProps={{
          startAdornment: <SearchIcon/>
        }}
        size="small"
      />
       </div>
      {[1,2,4,5,6,7,8].map((item,i) => {
        return(
          <SidebarCard
          updateAt="2 hours ago"
          jobTitle="Software Engineer"
          location="New Delhi"
          key={i}
          i={i}
          />
        )
      })}
    </div>
  );
}

export default Sidebar;
