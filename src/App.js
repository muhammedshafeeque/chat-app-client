import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/home/HomePage";
import ChatPage from "./Pages/Chat/ChatPage";
import Store from "./Context/ChatPrivider";
function App() {
  return (
    <div className="App">
      
      <Router>
      <Store>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/chat" element={<ChatPage/>} />
        </Routes>
        </Store>
      </Router>
      
    </div>
  );
}

export default App;
