import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";
import MyState from "./context/data/MyState";

// Lazy-loaded pages
const Dashboard = lazy(() => import("./pages/admin/dashboard/DashBoard"));
const UserLogin = lazy(() => import("./pages/admin/userLogin/UserLogin"));
const Signup = lazy(() => import("./pages/admin/userLogin/Signup"));
const BlogInfo = lazy(() => import("./pages/BlogInfo/BlogInfo"));
const AllBlogs = lazy(() => import("./pages/allBlogs/AllBlogs"));
const NoPage = lazy(() => import("./pages/Nopage/NoPage"));
const CreateBlog = lazy(() => import("./pages/admin/createBlog/CreateBlog"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const Home = lazy(() => import("./pages/home/Home"));

const App = () => {
  return (
    <MyState>
      <Router>
        <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
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
        </Suspense>
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
