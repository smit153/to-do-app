import React, { useState, useEffect } from "react";
import { db } from "../../FireBase";
import { collection, getDocs } from "@firebase/firestore";
import Tasks from "./Tasks";
export default function Data() {
  const [tasks, setTasks] = useState([]);
  var d = new Date();
  var date1 = new Date();
  date1.setDate(date1.getDate() - 7);
  var date2 = new Date();
  date2.setDate(date2.getDate() - 14);

  const compareweek2 = (date) => {
    let d1 = new Date(date.date);
    return d1 < date1 && d1 >= date2;
  };
  const week2 = tasks.filter(compareweek2);
  const compareweek1 = (date) => {
    let d1 = new Date(date.date);
    return d1 >= date1;
  };
  const week1 = tasks.filter(compareweek1);
  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collection(db, "todos"));
      setTasks(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getData();
  }, []);
  return (
    <div className="w-100 pt-3 pe-5 ps-5 d-flex flex-column align-items-center">
      <div className="fs-3 fw-bold">
        From {date1.getDate() + "/" + date1.getMonth() + " "}
        to {d.getDate() + "/" + d.getMonth()}
      </div>
      <table className="table table-sm table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Catagory</th>
            <th scope="col">status</th>
            <th scope="col">Due</th>
            <th scope="col">Id</th>
          </tr>
        </thead>
        <tbody>
          {week1.map((task, index) => (
            <Tasks tasks={task} index={index} />
          ))}
        </tbody>
      </table>
      <div className="fs-3 pt-5 fw-bold">
        From {date2.getDate() + "/" + date2.getMonth() + " "}
        to {date1.getDate() + "/" + date1.getMonth()}
      </div>
      <table className="table table-sm table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Catagory</th>
            <th scope="col">status</th>
            <th scope="col">Due</th>
            <th scope="col">Id</th>
          </tr>
        </thead>
        <tbody>
          {week2.map((task, index) => (
            <Tasks tasks={task} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
