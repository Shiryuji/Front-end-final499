"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function EditPostPage({ params }) {

    const { id } = params;

    const [postData, setPostData] = useState("");

    //New data of post
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [content, setContent] = useState("");

    const router = useRouter();

    const getPostById = async (id) => {
        try {
            const res = await fetch(`https://back-end-final499.onrender.com/api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch a post");
            }

            const data = await res.json();
            console.log("edit post: ", data);
            setTitle(data.title);
            setImg(data.img);
            setContent(data.content);

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostById(id);
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await fetch(`https://back-end-final499.onrender.com/api/posts/${id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ title, img, content })
          })
  
          if (!res.ok) {
              throw new Error("Failed to update Posts")
          }
  
          router.refresh();
          router.push("/")
  
      } catch(error) {
          console.log(error);
      }
    }

    return (
        <div className="container mx-auto py-10 px-4">
          <h3 className="text-3xl font-bold mb-4">Edit menu</h3>
          <hr className="my-4" />
          <Link href="/" legacyBehavior>
            <a className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mb-4 inline-block">Back</a>
          </Link>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full bg-gray-100 border border-gray-300 py-2 px-4 rounded mb-4"
              placeholder={postData.title}
              value={title}
            />
            <input
              onChange={(e) => setImg(e.target.value)}
              type="text"
              className="w-full bg-gray-100 border border-gray-300 py-2 px-4 rounded mb-4"
              placeholder={postData.img}
              value={img}
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              cols="30"
              rows="10"
              className="w-full bg-gray-100 border border-gray-300 py-2 px-4 rounded mb-4"
              placeholder={postData.content}
              value={content}
            ></textarea>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
              Edit menu
            </button>
          </form>
        </div>
      );
    }
    
    export default EditPostPage;
