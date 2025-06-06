import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyContext from "./MyContext";
import { fireDb } from "../../firebase/FirebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function MyState(props) {
  const [mode, setMode] = useState("light"); // Whether dark mode is enabled or not
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [loading, setloading] = useState(false);

  const [getAllBlog, setGetAllBlog] = useState([]);

  function getAllBlogs() {
    setloading(true);
    try {
      const q = query(collection(fireDb, "blogPost"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let blogArray = [];
        QuerySnapshot.forEach((doc) => {
          blogArray.push({ ...doc.data(), id: doc.id });
        });

        setGetAllBlog(blogArray);
        setloading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  // Blog Delete Function
  const deleteBlogs = async (id) => {
    try {
      await deleteDoc(doc(fireDb, "blogPost", id));
      getAllBlogs();
      toast.success("Blogs deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setloading,
        getAllBlog,
        deleteBlogs,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
