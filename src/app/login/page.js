"use client";

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "../../../src/store/slices/authSlice";
import styles from "./page.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/users");
      const users = res.data;

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        dispatch(setUser(foundUser));
        router.push("/dashboard");
      } else {
        setError("Wrong email or password !");
      }
    } catch (err) {
      console.error("API Error", err);
      setError("API Error 404");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div  className={`${styles.loginform} w-full bg-white shadow-md rounded p-8 w-full max-w-md`}>
        <h2 style={{color:"white"}}>
          Login Page
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button
          onClick={handleLogin}
          className={styles.button}
        >
          Login
        </button>

        {error && <p className={styles.error}  >{error}</p>}
      </div>
    </div>
  );
}
