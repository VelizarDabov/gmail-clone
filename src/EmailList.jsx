import React, { useEffect, useState } from "react";
import "./EmailList.css";

import { IconButton, Checkbox } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RedoIcon from "@mui/icons-material/Redo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import InboxIcon from "@mui/icons-material/Inbox";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Section from "./Section";
import EmailRow from "./EmailRow";
import { db } from "./firebase";
import { useDispatch } from "react-redux";
const EmailList = () => {
  const [emails, setEmails] = useState([]);
const dispatch = useDispatch();

  useEffect(() => {
db.collection('emails').orderBy('timestamp', 'desc').onSnapshot(snapshot => setEmails(snapshot.docs.map((doc) => ({
  id:doc.id,
  data:doc.data(),
}))))
  }, [])

  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>

          <IconButton>
            <RedoIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>

        <div className="emailList__settingsRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>

      
      </div>
      <div className="emailList__sections">
<Section Icon={InboxIcon} title='Primary' color='red' selected/>
<Section Icon={PeopleIcon} title='Social' color='#1A73E8' />
<Section Icon={LocalOfferIcon} title='Promotions' color='green' />
        </div>
        <div className="emailList__list">
          {emails.map(({id, data:{to, subject, message, timestamp}}) => (
<EmailRow id={id} key={id} title={to} subject={subject} description={message} time={new Date(timestamp?.seconds*1000).toUTCString()}/>
          ))}

        </div>
    </div>
  );
};

export default EmailList;
