import { cleanup } from "@testing-library/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { StudentsContext } from "../StudentsContext";

const CreateStudent = () => {
  const { showAlert } = useContext(StudentsContext);
  const [btnDisable, setBtnDisable] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    course: "",
    score: 0,
  });
  const [editOrder, setEditOrder] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const abortCont = new AbortController();

    if (id !== undefined) {
      axios
        .get(`http://localhost:8000/students/${id}`, {
          signal: abortCont.signal,
        })
        .then((res) => {
          Object.assign(inputs, res.data);
          setEditOrder(true);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch Aborted");
          }
          console.log(err.message);
        });
    }
    return () => abortCont.abort();
  }, []);

  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    if (key === "score") {
      setInputs({ ...inputs, [key]: value });
    } else {
      setInputs({ ...inputs, [key]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnDisable(true);

    if (!editOrder) {
      axios
        .post("http://localhost:8000/students", inputs)
        .then((res) => {
          showAlert(true, "Data Has been Created", "green");
          setInputs({
            name: "",
            course: "",
            score: 0,
          });

          history.push("/");
          setBtnDisable(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios
        .put(`http://localhost:8000/students/${inputs.id}`, inputs)
        .then((res) => {
          showAlert(true, "Data Has been Updated", "green");
          setInputs({
            name: "",
            course: "",
            score: 0,
          });
          setBtnDisable(false);
          history.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <div className="container mx-auto my-14 rounded-lg shadow-lg p-8 ">
      <h1 className="text-4xl font-bold text-center">Form Add Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-input my-10   flex flex-col ">
          <label htmlFor="">Name</label>
          <input
            className="outline-none pl-2  border-2 rounded-lg shadow-md h-10"
            type="text"
            name="name"
            onChange={handleChange}
            value={inputs.name}
            required
          />
        </div>
        <div className="form-input my-10 flex flex-col ">
          <label htmlFor="">Course</label>
          <input
            className="outline-none pl-2  border-2 rounded-lg shadow-md h-10"
            type="text"
            name="course"
            onChange={handleChange}
            value={inputs.course}
            required
          />
        </div>
        <div className="form-input my-10 flex flex-col ">
          <label htmlFor="">Scores</label>
          <input
            className="outline-none pl-2  border-2 rounded-lg shadow-md h-10"
            type="number"
            name="score"
            onChange={handleChange}
            value={inputs.score}
            required
          />
        </div>
        <button
          disabled={btnDisable}
          className="bg-indigo-600 text-white font-semibold block mx-auto my-10 p-3 rounded-lg shadow-lg"
        >
          {" "}
          {editOrder ? "Edit Student!" : "Create Student"}{" "}
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;
