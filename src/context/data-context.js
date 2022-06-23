import React, { useState, useEffect } from "react";
import { db } from "../FireBase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "@firebase/firestore";
const DataContext = React.createContext({
  tasks: [],
  setTasks: () => {},
  completed: [],
  setCompleted: () => {},
  deleteTask: () => {},
  updateTask: () => {},
  deleteCompletedTask: () => {},
  todayTask: [],
  overDue: [],
  isLoggedIn: "false",
  setIsLoggedIn: () => {},
});

export const DataContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [overDue, setOverDue] = useState([]);
  const [todayTask, setTodayTask] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  useEffect(() => {
    const getData = async () => {
      const q1 = query(
        collection(db, "todos"),
        where("status", "==", "incomplete")
      );
      const data = await getDocs(q1);
      setTasks(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );

      const q2 = query(
        collection(db, "todos"),
        where("status", "==", "complete")
      );
      const dataCompleted = await getDocs(q2);
      setCompleted(
        dataCompleted.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getData();
  }, []);
  useEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    let d2 = new Date(yyyy + "-" + mm + "-" + dd);

    const compareDate = (date) => {
      let d1 = new Date(date.date);
      return d1 < d2;
    };
    const dataOverdue = tasks.filter(compareDate);
    setOverDue(dataOverdue);
    const compareToday = (date) => {
      let d1 = new Date(date.date);

      return (
        d1.getDate() === today.getDate() &&
        d1.getMonth() === today.getMonth() &&
        d1.getFullYear() === today.getFullYear()
      );
    };
    const dataToday = tasks.filter(compareToday);
    const dataTodaycomplete = completed.filter(compareToday);
    setTodayTask([...dataToday, ...dataTodaycomplete]);
  }, [tasks, completed]);

  const deleteTask = async (id) => {
    const index = tasks.indexOf(id);
    tasks.splice(index, 1);
    setTasks((prevState) => {
      return [...prevState];
    });
    const userDoc = doc(db, "todos", id.id);
    await deleteDoc(userDoc);
  };

  const deleteCompletedTask = async (id) => {
    const index = completed.indexOf(id);
    completed.splice(index, 1);
    setCompleted((prevState) => {
      return [...prevState];
    });
    const userDoc = doc(db, "todos", id.id);
    await deleteDoc(userDoc);
  };

  const updateTask = async (id) => {
    const index = tasks.indexOf(id);
    let obj = { ...tasks.splice(index, 1) };

    setCompleted(() => {
      return [...completed, { ...obj[0], status: "complete" }];
    });
    setTasks((prevState) => {
      return [...prevState];
    });
    const userDoc = doc(db, "todos", id.id);
    await updateDoc(userDoc, { status: "complete" });
  };

  return (
    <DataContext.Provider
      value={{
        tasks: tasks,
        setTasks: setTasks,
        completed: completed,
        setCompleted: setCompleted,
        deleteTask: deleteTask,
        deleteCompletedTask: deleteCompletedTask,
        updateTask: updateTask,
        todayTask: todayTask,
        overDue: overDue,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
