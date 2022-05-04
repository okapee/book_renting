import axios from "axios";
import { render } from "react-dom";
import { useEffect, useState } from "react";
import BookSearch from "./BookSearch";

const url = "https://www.googleapis.com/books/v1/volumes?q=鬼滅";

const Search = () => {
  var books = [];

  axios.get(url).then((res) => {
    // console.log(res.data);
    books = res.data["items"];
    // console.log(books);
  });

  return (
    <ul>
      {
        books.map((book) => {
          console.log(book);
          return <li>book[0].text</li>;
        })
      }
    </ul>
  );
};

export default Search;
