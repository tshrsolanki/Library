import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ListEditdetail } from "./COMPONENTS/ListEditdetail";
import { StudentList } from "./COMPONENTS/StudentList";
import { BookList } from "./COMPONENTS/BookList";
import { StudentEdit } from "./COMPONENTS/StudentEdit";
import { BookEdit } from "./COMPONENTS/BookEdit";
import { Login } from "./COMPONENTS/LOGIN/Login";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/studentlogin" exact element={<StudentList />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/studentedit" exact element={<StudentEdit />} />
          <Route path="/bookedit" exact element={<BookEdit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
