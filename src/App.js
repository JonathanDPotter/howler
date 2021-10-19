import React from "react";
import "./App.scss";
import { database } from "./app/firebase";

const App = () => {
  console.log(database.collection("test").doc("FCZxifbzBrxT4YYi29MH").get().then((doc) => doc.testText));
  return (
    <div className="App">
      <h1>{database.collection("test").doc("FCZxifbzBrxT4YYi29MH")}</h1>
    </div>
  );
};

export default App;
