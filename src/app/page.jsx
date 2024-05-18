
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";

export default function Home() {

  const [postData, setPostData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  
  const getPosts = async () => {
    try {
      const res = await fetch("https://back-end-final499.onrender.com//api/posts", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data);
    } catch (error) {
      console.error("Error loading posts: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Menu</h1>
      <hr className="my-4" />
      <div className="text-center mb-6">
        <Link href="/create" legacyBehavior>
          <a className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            Create menu
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {postData && postData.length > 0 ? (
          postData.map((val) => (
            <div key={val._id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img src={val.img} width={300} height={200} alt={val.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">{val.title}</h4>
                <p className="text-gray-600 mb-4">{val.content}</p>
                <div className="flex justify-between items-center">
                  <Link href={`/edit/${val._id}`} legacyBehavior>
                    <a className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300 ease-in-out transform hover:-translate-y-1">
                      Edit menu
                    </a>
                  </Link>
                  <DeleteBtn id={val._id} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="bg-gray-300 p-4 rounded">Not posts</p>
        )}
      </div>
    </main>
  );
}
