import React, { useEffect } from "react";
import { useStudentContext } from "../../hooks/useStudentContext";
import { useUserContext } from "../../hooks/useUserContext";

import StudentDetails from "../../components/StudentDetails";
import StudentForm from "../../components/StudentForm";

const Home = () => {
  const { user } = useUserContext();

  // fetching global state of for students list
  const { students, dispatch } = useStudentContext();

  useEffect(() => {
    const fetchStudents = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await fetch("/api/students", options);
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_STUDENTS", payload: data });
      }
    };

    if (user) {
      fetchStudents();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {students.length > 0 ?
          students.map((each) => (
            <StudentDetails details={each} key={each._id} />
          )) : <h1>No Recoreds Added</h1>}
      </div>
      <StudentForm />
    </div>
  );
};

export default Home;
