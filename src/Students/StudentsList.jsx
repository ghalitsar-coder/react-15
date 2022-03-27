import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { StudentsContext } from "../StudentsContext";
import Alert from "./Alert";

const StudentsList = () => {
  const { students, setStudents, showAlert, alert } =
    useContext(StudentsContext);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios.get("http://localhost:8000/students");
      setStudents(data);
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/students/${id}`)
      .then(() => {
        showAlert(true, "Data Has been deleted", "red");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleEdit = (id) => {
    history.push(`/student/edit/${id}`);
  };

  if (alert.show) {
    setTimeout(() => {
      showAlert();
    }, 2000);
  }

  const checkIndex = (scores) => {
    if (scores >= 80) {
      return "A";
    } else if (scores >= 70 && scores < 80) {
      return "B";
    } else if (scores >= 60 && scores < 70) {
      return "C";
    } else if (scores >= 50 && scores < 60) {
      return "D";
    } else {
      return "E";
    }
  };

  return (
    <>
      {alert.show && <Alert {...alert} />}
      <table className="table-auto container mx-auto my-10 shadow-lg rounded-lg border text-center p-4 ">
        <thead>
          <tr className=" border-b-2 h-20 border-slate-200">
            <th>#</th>
            <th>Name</th>
            <th>Course</th>
            <th>Score</th>
            <th>Index Score</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, i) => (
            <tr key={i + 1} className="h-20 border-b-2 border-slate-200">
              <td>{i + 1}</td>
              <td> {student.name} </td>
              <td> {student.course} </td>
              <td> {student.score} </td>
              <td> {checkIndex(student.score)} </td>
              <td>
                <button
                  className="border-2 border-yellow-400 text-yellow-400 p-3 rounded-lg shadow-lg mr-3"
                  onClick={() => handleEdit(student.id)}
                >
                  Edit
                </button>
                <button
                  className="border-2 border-red-400 text-red-400 p-3 rounded-lg shadow-lg font-semibold "
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StudentsList;
