"use client";

import apiEndPoint from "@/config/apiEndPoint";
import env from "@/config/env";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Header() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState();
  const pathname = usePathname();
  const routes = [
    { name: "Dashboard", url: "/" },
    { name: "Users", url: "/users" },
    { name: "Todos", url: "/todos" },
    { name: "Calender", url: "#" },
    { name: "Reports", url: "#" },
  ];
  const getUser = async () => {
    const response = await axios(env.baseUrl + apiEndPoint.Users, {
      withCredentials: true,
    })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        console.error(err);
      });
    setUser(response);
  };
  const logout = async (e) => {
    e.preventDefault();
    await fetch(env.baseUrl + apiEndPoint.logout);
    document.cookie = `token="";expires=0; path=/`;
    setShow(false);
    getUser();
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <nav className="bg-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline ml-10 space-x-4">
                {routes.map((url) => (
                  <Link
                    key={url.name}
                    href={url.url}
                    className={`px-3 py-2 text-sm font-medium   rounded-md ${
                      pathname === url.url
                        ? " bg-gray-900 text-white"
                        : "text-white/70"
                    }`}
                    aria-current="page"
                  >
                    {url.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center ml-4 md:ml-6">
              <button
                type="button"
                className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <div className="relative ml-3">
                <div>
                  {user ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={() => setShow(!show)}
                      >
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </button>{" "}
                      <span className="font-semibold text-white capitalize">
                        {user?.userName}
                      </span>{" "}
                    </div>
                  ) : (
                    <Link className="font-semibold text-white" href="/login">
                      Login
                    </Link>
                  )}
                </div>
                {show ? (
                  <div
                    className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-1"
                    >
                      Settings
                    </a>
                    <button
                      onClick={(e) => logout(e)}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex -mr-2 md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className="block w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Team
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Projects
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Calendar
          </a>
          <a
            href="#"
            className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Reports
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                Tom Cook
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                tom@example.com
              </div>
            </div>
            <button
              type="button"
              className="relative flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
          </div>
          <div className="px-2 mt-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
