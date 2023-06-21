import React from "react";
//import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { useStudentContext } from "../../hooks/useStudentContext";
import { useUserContext } from "../../hooks/useUserContext";

const StudentDetails = ({ details }) => {
  const { dispatch } = useStudentContext();
  const { user } = useUserContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await fetch("/api/students/" + details._id, options);
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_STUDENT", payload: data });
    }
  };

  return (
    <div className="workout-details">
      <h4>{details.name}</h4>
      <p>
        <strong>Class : </strong>
        {details.standard}
      </p>
      <p>
        <strong>Gender : </strong>
        {details.gender}
      </p>
      <p>
        <strong>Marks : </strong>
        {details.marks}
      </p>
      {/* <p>
        {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
      </p> */}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default StudentDetails;
