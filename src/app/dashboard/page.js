"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logout } from "../../store/slices/authSlice";
import styles from "./page.module.css";
import TableComponent from "./TableComponent";
import dynamic from 'next/dynamic';
import ChartComponentBar from"./ChartComponentBar.";
import { FaUser, FaHome, FaHandPeace, FaCog, FaDashcube, FaModx, FaMoneyBill, FaBell } from "react-icons/fa";
import { MdDashboard } from 'react-icons/md';



export default function DashboardPage() {
  const ChartComponent = dynamic(() => import('@/app/dashboard/ChartComponent'), {
  ssr: false, 
});

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <p className="text-center mt-10">loading</p>;
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <body className={styles.body}>    
     <div className={styles.mainpage}>
      <aside className={`${styles.sidebar}  w-full`}>
        <h1 style={{color:"white"}} > <FaHome/>  Welcome {user.name} </h1>
        <h2 style={{color:"white"}}> <MdDashboard/>    Dashboard</h2>
        <ul className={styles.navList}>
          <li><a href="#" className={styles.navItem}> <FaHome/>  Home Page</a></li>
          <li><a href="#" className={styles.navItem}> <FaUser/>     Your Profile</a></li>
          <li><a href="#" className={styles.navItem}> <FaCog/>   Settings</a>   </li>
          <li><a href="#" className={styles.navItem}> <FaBell/> notifications</a></li>
          <li><a href="#" className={styles.navItem}> <FaDashcube/>about Page</a></li>
          <li><a href="#" className={styles.navItem}> <FaDashcube/>about Page</a></li>
          <li><a href="#" className={styles.navItem}> <FaDashcube/>about Page</a></li>
          <li><a href="#" className={styles.navItem}> <FaDashcube/>about Page</a></li>
          <li><a href="#" className={styles.navItem}> <FaDashcube/>about Page</a></li>
          <li><a href="#" className={styles.navItem}> <FaDashcube/>about Page</a></li>
          <li><a href="#" className={styles.navItem}> <FaDashcube/>about Page</a></li>
          <li><a href="#" className={styles.navItem}> <FaDashcube/>about Page</a></li>
          <li><a href="#" className={styles.navItem}> <FaDashcube/>about Page</a></li>
          <li><a href="#" className={styles.navItem}>
            <button   style={{border:"none",color:"black"}}  className={styles.navItem}  onClick={handleLogout}>
                  Logout
            </button>  
          </a></li>
        </ul>
      </aside>
       <div className={`${styles.mainContent}  w-full`}>
        <div className={styles.cardsGrid}>

          <div className={styles.card}>
            <h3>Users</h3>
            <p className={styles.cardNumber}>1,024</p>
            <p className={styles.cardSub}>Total registered users</p>
          </div>

          <div className={styles.card}>
            <h3>Revenue</h3>
            <p className={`${styles.cardNumber} text-green-600`}>$12,340</p>
            <p className={styles.cardSub}>This month</p>
          </div>

          <div className={styles.card}>
            <h3>Orders</h3>
            <p className={`${styles.cardNumber} text-purple-600`}>320</p>
            <p className={styles.cardSub}>Completed orders</p>
          </div>
          <div className={styles.card}>
            <h3>Orders</h3>
            <p className={`${styles.cardNumber} text-purple-600`}>320</p>
            <p className={styles.cardSub}>Completed orders</p>
          </div>   
        </div>
         <div className={styles.charts}>
      <ChartComponent />
      <ChartComponentBar/>
        </div>

           <div className={`${styles.datatable} w-full`}>
          
          <div className={styles["table-container"]}    >
            <TableComponent />
          </div>
           </div>

      </div>
     </div>
    </body>
  );
}




