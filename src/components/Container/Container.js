import React, { useState } from "react";
import Form from "./Form";
import Task from "../Task/Task";
export default function Container(props) {
  const [catagory, setCatagory] = useState("");
  let tasks = props.tasks;
  let completeTasks = [];
  if (catagory !== "") {
    tasks = tasks.filter((task) => task.catagory === catagory);
    console.log("hello");
  }

  if (props.title === "Today") {
    completeTasks = tasks.filter((task) => task.status === "complete");
    tasks = tasks.filter((task) => task.status === "incomplete");
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-3 fs-5 p-2 bd-highlight">
          <div className="fw-bold fs-2">Catagory</div>
          <button
            className="btn btn-secondary m-2 p-2 pe-5 ps-5 d-flex justify-content-between w-100"
            onClick={() => {
              setCatagory("Personal");
            }}
          >
            <div>Personal</div>
          </button>
          <button
            className="btn btn-secondary m-2 p-2 pe-5 ps-5 d-flex justify-content-between w-100"
            onClick={() => {
              setCatagory("Home");
            }}
          >
            <div>Home</div>
          </button>
          <button
            className="btn btn-secondary m-2 p-2 pe-5 ps-5 d-flex justify-content-between w-100"
            onClick={() => {
              setCatagory("Office");
            }}
          >
            <div>Office</div>
          </button>
        </div>
        <div className="col-9">
          <div className="fs-1 fw-bold">{props.title}</div>
          <Form />
          <div className="fs-3 fw-bold">In Progress</div>
          {tasks.map((task) => (
            <Task key={task.title} task={task} />
          ))}

          {props.title !== "Today" ? (
            <div></div>
          ) : (
            <div>
              <hr style={{ height: "5px" }}></hr>
              <div className="fs-3 fw-bold">Completed</div>
              {completeTasks.map((task) => (
                <Task key={task.title} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
