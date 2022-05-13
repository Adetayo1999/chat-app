import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <div className='h-screen overflow-hidden'>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute component={Home} />} />
          <Route
            path='/login'
            element={<PublicRoute restricted component={Login} />}
          />
          <Route
            path='/register'
            element={<PublicRoute restricted component={Register} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
