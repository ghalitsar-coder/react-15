import { Link } from "react-router-dom";
import StudentsList from "./StudentsList";

const Students = () => {
  return (
    <>
      <Link
        className="block mx-auto my-10 bg-blue-500 text-white font-semibold p-3
      shadow-lg rounded-full w-2/3 text-center "
        to="/add-student"
      >
        Create Student!
      </Link>
      <StudentsList />
    </>
  );
};

export default Students;
