import React from "react";

export default function Tasks(props) {
  const { tasks } = props;

  return (
    <tr>
      <th scope="row">{props.index + 1}</th>
      <td>{tasks.title}</td>
      <td>{tasks.catagory}</td>
      <td>{tasks.status}</td>
      <td>{tasks.date}</td>
      <td>{tasks.id}</td>
    </tr>
  );
}
