import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../../context/data/MyContext";
import Loader from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, fireDb } from "../../../firebase/FirebaseConfig";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Context = useContext(MyContext);
  const { loading, setloading } = Context;

  const signup = async () => {
    setloading(true);
    if (!name || !email || !password) {
      return toast.error("All fields are required!");
    }
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
      };
      const userRef = collection(fireDb, "users");
      await addDoc(userRef, user);
      toast.success("Signup Successful.");
      setloading(false);
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        window.location.href = "/userlogin";
      }, 2000);
    } catch (error) {
      toast.error("Signup failed!");
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      {loading && <Loader />}
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Signup</h2>
        <div className="flex flex-col">
          <input
            placeholder="Name"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email address"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between flex-wrap">
            <p className="text-white mt-4">
              Have an account?
              <Link
                to={"/userlogin"}
                className="text-sm text-blue-500 -200 hover:underline mt-4"
                href="#"
              >
                Login
              </Link>
            </p>
          </div>
          <button
            onClick={signup}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
