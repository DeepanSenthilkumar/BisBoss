// // import Home from './component/Home';
// // import Dashboard from './component/Dashboard';
// // import Sales from './component/Sales';
// import User from './component/User';


// export default function App() {
//   return (
//     // <Home />
//     // <Dashboard />
//     // <Sales />
//     <User/>
//   );
// }




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Dashboard from './component/Dashboard';
import Sales from './component/Sales';
import User from './component/User';
import RealtimeView from './component/RealtimeView';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/user" element={<User />} />
      <Route path="/real" element={<RealtimeView />} />
    </Routes>
  );
};

export default App;
