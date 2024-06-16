import React from "react";
import Todo from "../todo";

function page({ params }) {
  return <Todo params={params} />;
}

export default page;
