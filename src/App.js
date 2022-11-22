import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StudentComp } from "./COMPONENTS/STUDENTLOGIN/StudentComp";
import { BookList } from "./COMPONENTS/BookList";
import { AdminComp } from "./COMPONENTS/ADMINLOGIN/AdminComp";
import { StudentLogin } from "./COMPONENTS/STUDENTLOGIN/StudentLogin";
import { Login } from "./COMPONENTS/LOGIN/Login";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/studentlogin" exact element={<StudentComp />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/adminlogin" exact element={<AdminComp />} />
          <Route path="/login" exact element={<StudentLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
