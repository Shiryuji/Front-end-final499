"use client";

import React from "react";

function DeleteBtn({ id }) {
  const handleDelete = async () => {
    const confirmed = confirm("You want delete?");

    if (confirmed) {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          window.location.reload();
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
