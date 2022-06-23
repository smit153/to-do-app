import React, { useContext, useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../FireBase";
import DataContext from "../../context/data-context";
const { v4: uuidv4 } = require("uuid");
export default function Form() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [Catagory, setCatagory] = useState("");
  const ctx = useContext(DataContext);

  const submitHandler = async (e) => {
    const uid = uuidv4();
    e.preventDefault();
    ctx.setTasks([
      ...ctx.tasks,
      {
        title: title,
        date: date,
        catagory: Catagory,
        status: "incomplete",
        uid: uid,
      },
    ]);
    await addDoc(collection(db, "todos"), {
      title: title,
      date: date,
      catagory: Catagory,
      status: "incomplete",
      uid: uid,
    });
    setTitle("");
    setDate("");
    setCatagory("");
  };

  return (
    <form
      className="shadow-lg p-3 mb-5 bg-body rounded mt-3"
      onSubmit={submitHandler}
    >
      <div className="input-group mb-3 d-flex align-items-center">
        <label className="fw-bold">Task Name</label>
        <input
          type="text"
          className="form-control ms-4"
          placeholder="Task Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-between">
        <div className="input-group mb-3">
          <label className="fw-bold d-flex align-items-center">
            Task due date
          </label>
          <input
            type="date"
            className="form-control ms-1"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <label className="form-check-label fw-bold ms-5">Catagory</label>
          <div className="form-check ms-3 ">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="Personal"
              onChange={(e) => setCatagory(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Personal
            </label>
          </div>
          <div className="form-check ms-3 ">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="Home"
              onChange={(e) => setCatagory(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Home
            </label>
          </div>
          <div className="form-check ms-3">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="Office"
              onChange={(e) => setCatagory(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Office
            </label>
          </div>
        </div>
      </div>
      <div>
        <input className="btn btn-primary " type="submit" value="Add Task" />
      </div>
    </form>
  );
}
