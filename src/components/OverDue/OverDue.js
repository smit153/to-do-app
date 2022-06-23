import React, { useContext } from "react";
import NavBar from "../NavBar/NavBar";
import Container from "../Container/Container";
import DataContext from "../../context/data-context";
export default function OverDue() {
  const ctx = useContext(DataContext);
  return (
    <div>
      <NavBar />
      {ctx.isLoggedIn === "true" ? (
        <Container title="Over Due" tasks={ctx.overDue} />
      ) : (
        <h1 className="text-center">Error: check auth token</h1>
      )}
    </div>
  );
}
