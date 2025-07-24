"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./table.module.css";

export default function TableComponent() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const usersWithDate = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: new Date().toISOString().split("T")[0],
        }));
        setUsers(usersWithDate);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "createdAt")
          return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
  }, [users, query, sortBy]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles["table-container"]}>
      <div className={styles["table-header"]}>
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
          className={styles["input-search"]}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles["select-sort"]}
        >
          <option value="name">Sort by Name</option>
          <option value="createdAt">Sort by Date</option>
        </select>
      </div>

      <table className={styles["data-table"]}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles["pagination"]}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`${styles["page-button"]} ${
              currentPage === i + 1 ? styles["active"] : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
