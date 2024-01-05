import React from "react";
import "./EmailRow.css";
import { Checkbox, IconButton } from "@mui/material";

import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import {useNavigate} from 'react-router-dom'
const EmailRow = ({ title, subject, description, id, time }) => {
    const navigate= useNavigate();
  return (
    <div className="emailRow" onClick={() => navigate('/mail')}>
      <div className="emailRow__options" >
        <Checkbox />
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>

        <IconButton>
          <LabelImportantOutlinedIcon />
        </IconButton>
      </div>

      <div className="emailRow__title">
        <h3>{title}</h3>
      </div>

      <div className="emailRow__message">
        <h4>
          {subject}{' '}
          <span className="emailRow__description">-{description}</span>
        </h4>
      </div>

      <p className="emailRow__time">{time}</p>
    </div>
  );
};
export default EmailRow;
