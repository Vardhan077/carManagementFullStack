// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import Dashboard from './pages/Dashboard';
// import CarDetail from './pages/CarDetail';
// // import CreateCar from './pages/CreateCar';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/cars/:carId" element={<CarDetail />} />
//         {/* <Route path="/add-car" element={<CreateCar />} /> */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import CarDetail from './pages/CarDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cars/:carId" element={<CarDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
