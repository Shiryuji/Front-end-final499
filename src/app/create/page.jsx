"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !img || !content) {
      alert("Please complete all input");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, img, content }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a post");
      }
    } catch (error) {
      console.log("Error creating post: ", error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h3 className="text-3xl font-bold mb-4">Create menu</h3>
      <hr className="my-4" />
      <Link href="/" legacyBehavior>
        <a className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mb-4 inline-block">Back</a>
      </Link>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="w-full bg-gray-100 border border-gray-300 py-2 px-4 rounded mb-4"
          placeholder="Name"
          value={title}
        />
        <input
          onChange={(e) => setImg(e.target.value)}
          type="text"
          className="w-full bg-gray-100 border border-gray-300 py-2 px-4 rounded mb-4"
          placeholder="Img Url"
          value={img}
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          cols="30"
          rows="10"
          className="w-full bg-gray-100 border border-gray-300 py-2 px-4 rounded mb-4"
          placeholder="Description"
          value={content}
        ></textarea>
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
          Add menu
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;
