import axios from "axios";
import { render } from "react-dom";
import { useEffect, useState } from "react";
import BookSearch from "./BookSearch";

const url = "https://www.googleapis.com/books/v1/volumes?q=鬼滅";

const Search = () => {
  // const [books, setBooks] = useState({});
  var books = [];

  // useEffect(() => {
  //   axios.get(url).then((res) => {
  //     // console.log(res.data);
  //     books_array = res.data["items"];
  //     setBooks(books_array);
  //     console.log("useEffectが呼ばれた");
  //   });
  // }, [books]);

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
        /* {Object.keys(books).forEach((key) => {
        // console.log("key: " + key + ", value: " + books[key]);
        console.log(books[key]);
        return <li>{books["1"].kind}</li>;
      })} */
      }
    </ul>
  );
};

export default Search;
