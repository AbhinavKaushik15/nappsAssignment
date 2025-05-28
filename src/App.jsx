import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MyState from "./context/data/MyState";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import BlogInfo from "./pages/BlogInfo/BlogInfo";
import UserLogin from "./pages/admin/userLogin/UserLogin";
import Signup from "./pages/admin/userLogin/Signup";
import Dashboard from "./pages/admin/dashboard/DashBoard";
import CreateBlog from "./pages/admin/createBlog/CreateBlog";
import NoPage from "./pages/Nopage/NoPage";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <UserProtectedRoute>
                <Dashboard />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/createblog"
            element={
              <UserProtectedRoute>
                <CreateBlog />
              </UserProtectedRoute>
            }
          />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
};

export default App;

export const UserProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return children;
  } else {
    return <Navigate to={"/userlogin"} />;
  }
};
