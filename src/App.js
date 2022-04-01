import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/home/HomePage";
import ChatPage from "./Pages/Chat/ChatPage";
import ChatProvider from "./Context/ChatPrivider";
function App() {
  return (
    <div className="App">
      
      <Router>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/chat" element={<ChatPage/>} />
        </Routes>
        </ChatProvider>
      </Router>
      
    </div>
  );
}

export default App;
