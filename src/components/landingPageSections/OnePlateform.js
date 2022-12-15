import React from "react";
import SolutionCard from "../common/SolutionCard";
import "./landingpage.css";
import icon from "../../acessts/marketing.svg";
import { Grid } from "@mui/material";
const dataList = [
  {
    title: "Marketing & Communication",
    description: "237 Jobs Available",
    icon: icon,
  },
  {
    title: "Design & Development",
    description: "237 Jobs Available",
    icon: icon,
  },
  {
    title: "Human Research & Development",
    description: "237 Jobs Available",
    icon: icon,
  },
  {
    title: "Finance Management",
    description: "237 Jobs Available",
    icon: icon,
  },
  {
    title: "Government Jobs",
    description: "237 Jobs Available",
    icon: icon,
  },
  {
    title: "Business & Consulting",
    description: "237 Jobs Available",
    icon: icon,
  },
  {
    title: "Customer Support Care",
    description: "237 Jobs Available",
    icon: icon,
  },
  {
    title: "Project Management",
    description: "237 Jobs Available",
    icon: icon,
  },
];
function OnePlateform() {
  return (
    <div className="onePlateform-container">
      <h1>
        One Plateform many <span>Solution</span>
      </h1>
      <Grid container 
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}

    
      >
        {dataList.map((e, i) => (
          <SolutionCard
            title={e.title}
            description={e.description}
            icon={e.icon}
            key={i}
          />
        ))}
      </Grid>
    </div>
  );
}

export default OnePlateform;
