import React from "react";
import "./SendMail.css";
import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { closeSendMessage } from "./features/mailSlice";
import { useDispatch } from "react-redux";
import { db } from "./firebase";
import firebase from 'firebase/compat/app';

const SendMail = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (formData) => {
db.collection('emails').add({
    to:formData.to,
    subject:formData.subject,
    message:formData.message,
    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
})
dispatch(closeSendMessage())
};
  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <Close
          className="sendMail__close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="to" placeholder="To" type="email" {...register("to")} />
        <input
          name="subject"
          placeholder="Subject"
          type="text"
          {...register("subject")}
        />
        <input
          name="message"
          placeholder="Message..."
          type="text"
          className="sendMail__message"
          {...register("message")}
        />
        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            type="submit"
            variant="contained"
            style={{ color: "white" }}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
