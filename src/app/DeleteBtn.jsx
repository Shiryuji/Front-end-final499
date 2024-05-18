"use client";

import React from "react";

function DeleteBtn({ id }) {
  const handleDelete = async () => {
    const confirmed = confirm("ํYou want delete?");

    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to delete the post");
        }

        window.location.reload();
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
    >
      Delete
    </button>
  );
}

export default DeleteBtn;
