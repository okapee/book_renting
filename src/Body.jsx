import React from "react";
import { Routes, Route } from "react-router";
import About from "./About";
import BookSearch from "./BookSearch";

export default function Body() {
  return (
    <Routes>
      {/* <Route path="/" exact element={Home} /> */}
      <Route path="/booksearch" element={BookSearch} />
      <Route path="/about" element={About} />
      {/* what's :slug? You'll learn it */}
    </Routes>
  );
}
