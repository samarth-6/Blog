import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full border border-gray-300 hover:border-teal-500 overflow-hidden rounded-lg flex flex-col sm:flex-row transition-all shadow-lg">
      <Link to={`/post/${post.slug}`} className="flex-shrink-0 dark:text-white">
        <img
          src={post.image}
          alt="post image"
          className="w-full sm:w-64 h-48 sm:h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="p-4 flex flex-col justify-between dark:text-white">
        <div>
          <p className="text-xl font-semibold text-gray-800 line-clamp-2 dark:text-white">{post.title}</p>
          <span className="italic text-gray-500 dark:text-white">{post.category}</span>
        </div>
        <Link
          to={`/post/${post.slug}`}
          className="mt-4 text-sm text-white bg-teal-500 hover:bg-teal-600 py-2 px-4 rounded-md self-start transition-all duration-300"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}
