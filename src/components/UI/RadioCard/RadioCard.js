import React from "react";
import Radio from "@mui/material/Radio";
import classes from "./RadioCard.module.css";
import { useState } from "react";

const RadioCard = (props) => {
  const { name, value, description, fontSize, color, checked, onChange } = props;

  return (
    <React.Fragment>
      <div className={` ${classes["container-radio"] } ${checked ? classes.active : ''}`}>
        <Radio          
          name={name}
          value={color}
          checked={checked}
          onChange={onChange}
          sx={{
            padding: '0px',
            color: color,
            background: color,
            "&.Mui-checked": {
              color: color, // #FCB900
              background: "#fff", // #9900EF
            },
            "& .MuiSvgIcon-root": {
              fontSize: fontSize,
            },
          }}
        />
        <div className={classes.message}>
          <div className={`${checked ? classes["title-active"] : classes.title}`} >{value}</div>
          <div className={classes.description}>{description}</div>
      </div>
      </div>
      
    </React.Fragment>
  );
};

export default RadioCard;
