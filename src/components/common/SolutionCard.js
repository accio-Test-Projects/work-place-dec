import { Grid } from "@mui/material";
import React from "react";

function SolutionCard({ title, description, icon }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <div className="solutionCard-container">
        <div>
          <img style={{marginRight:'10px'}} alt="icon" src={icon} />
        </div>
        <div className="solutionCard-title" >
          <div>{title}</div>
          <div>{description}</div>
        </div>
      </div>
    </Grid>
  );
}

export default SolutionCard;
