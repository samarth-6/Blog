import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-pink-500 to-yellow-500 text-white">
      <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto ">
        <h1 className="text-5xl font-bold lg:text-7xl">Welcome to My Blog</h1>
        <p className="text-gray-100 text-sm sm:text-lg">
          Discover articles and tutorials on web development, software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="text-sm sm:text-lg text-center text-white font-bold bg-teal-700 hover:bg-teal-600 rounded-full py-2 px-4"
        >
          View all posts
        </Link>
      </div>


      <div className="max-w-8xl mx-auto p-5 flex flex-col gap-10 py-10 bg-white text-gray-800 rounded-lg shadow-lg dark:bg-[rgb(16,23,42)]">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-8 ">
            <h2 className="text-3xl font-semibold text-center text-gray-800  dark:text-white ">Recent Posts</h2>
            <div className="flex flex-wrap gap-8 justify-center dark:text-white">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 hover:underline text-center "
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
