"use client";
import GoBack from "@/components/goBack";
import apiEndPoint from "@/config/apiEndPoint";
import env from "@/config/env";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Todo({ params }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();
  const getTodo = async () => {
    try {
      const response = await fetch(
        env.baseUrl + apiEndPoint.singleTodo + "?title=" + params?.title
      );
      const result = await response.json();
      if (result.success) {
        setTitle(result.data.title);
        setDescription(result.data.description);
        setId(result.data._id);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const addUpdateTodo = async (e) => {
    e.preventDefault();
    try {
      if (params?.title) {
        await axios
          .patch(
            env.baseUrl + apiEndPoint.updateTodo,
            { title, description, id },
            { withCredentials: true }
          )
          .then((res) => {
            // router.push("/todos");
            window.location.href = "/todos";
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .post(
            env.baseUrl + apiEndPoint.createTodo,
            { title, description },
            { withCredentials: true }
          )
          .then((res) => {
            // router.push("/todos");
            window.location.href = "/todos";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (ids) => {
    await axios
      .delete(env.baseUrl + apiEndPoint.deleteTodo + "/" + ids, {
        withCredentials: true,
      })
      .then((res) => {
        router.back();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (params?.title) {
      getTodo();
    }
  }, []);
  return (
    <div className="">
      <GoBack />
      <form
        onSubmit={(e) => addUpdateTodo(e)}
        className="max-w-lg p-6 mx-auto mt-6 border shadow-sm rounded-xl"
      >
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="message"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {params?.title ? "Update" : "Add Todo"}
        </button>
        <button
          onClick={() => router.back()}
          type="button"
          className="text-black mx-3 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-white dark:focus:ring-gray-200"
        >
          Cancel
        </button>
        {params?.title ? (
          <button
            onClick={() => deleteTodo(id)}
            type="button"
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-white dark:focus:ring-gray-200"
          >
            Delete
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default Todo;
