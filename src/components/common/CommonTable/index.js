import { Grid } from "@mui/material";
import React from "react";
import "./commonTable.css";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
function CommmonTable({ data, columns,handleClick=null }) {
  return (
    <div style={{ maxWidth: "90%", margin: "auto" }}>
      <div className="table-head">
        {columns.map((column, index) => {
          return (
            <div
              style={{
                width: column.width ? column.width : "25%",
              }}
              key={index}
            >
              {column.title}
            </div>
          );
        })}
      </div>
      {data.map((row, index) => {
        return (
          <div className="table-row">
            {columns.map((column, j) => {
              if (column.type === "date") {
                return (
                  <div 
                  style={{
                    width: column.width?column.width:'25%',
                  }}
                  key={j}>
                    {row[column.dataIndex].toDate().toDateString()}
                  </div>
                );
              } else if (column.dataIndex === "status") {
                if (row[column.dataIndex] === "applied") {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: column.width?column.width:'25%',
                      }}
                      key={j}
                    >
                      <HourglassEmptyIcon
                        sx={{
                          color: "#FFC107",
                        }}
                      />
                      <div>Applied</div>
                    </div>
                  );
                } else if (row[column.dataIndex] === "rejected") {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: column.width?column.width:'25%',
                      }}
                      key={j}
                    >
                      <ThumbDownOffAltIcon
                        sx={{
                          color: "red",
                        }}
                      />
                      <div> Rejected</div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: column.width?column.width:'25%',
                      }}
                      key={j}
                    >
                      <ThumbUpOffAltIcon
                        sx={{
                          color: "green",
                        }}
                      />
                      <div> Accepted</div>
                    </div>
                  );
                }
              }
              else if(column.type==='file'){
                return(
                  <a
                  className="resume-btn"
                  href={row[column.dataIndex]}
                  target='__blank'
                  >View resume</a>
                )
              }
              else if(column.type==='action'){
               return(
                <div>
                  {
                     column.childrenAction.map((item)=>{
                      return(
                        // row.status
                        //row['status']
                        <button
                        disabled={row['status']==='accepted'?true:false}
                        onClick={()=>handleClick(item.action,row)}
                        >{item.label}</button>
                      )
                     })
                  }
                </div>
               )

              }
              else {
                return (
                  <div
                    style={{ width: column.width ? column.width : "25%" }}
                    key={j}
                  >
                    {row[column.dataIndex]}
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

export default CommmonTable;
//?   row[column.dataIndex] ===row["company_name"] === Google
//?   row[column.dataIndex] ===row["jobTitle"] ===software engineer
//?   rew[column.dataIndex] ===row["createdAt"] === 2021-10-10

// data=[
// { //? row1
// jobTitle: "Software Engineer",
// createdAt: "2021-10-10",
// status: "Applied"
//companyName: "Google"
// },

//! columns

// {//? row2
// jobTitle: "Software Engineer",
// createdAt: "2021-10-10",
// status: "Applied"
//companyName: "Google"
// }
// ]
