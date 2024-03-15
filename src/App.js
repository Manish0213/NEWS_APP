// import './App.css';
import Navbar from "./Navbar";
import News from "./News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<News category={"general"}/>}/>
          <Route path="/business" element={<News category={"business"}/>}/>
          <Route path="/entertainment" element={<News category={"entertainment"}/>}/>
          <Route path="/health" element={<News category={"health"}/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
