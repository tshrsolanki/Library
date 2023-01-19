import "./Details.css";

export const Details = ({ studentData }) => {
  return (
    <div className="details">
      <div>Firstname :&nbsp;{studentData.firstname} </div>
      <div>Lastname :&nbsp; {studentData.lastname}</div>
      <div>Rollno :&nbsp;{studentData.studentid} </div>
      <div>Moblie no. :&nbsp; {studentData.number} </div>
    </div>
  );
};
