import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData({ ...sidebarData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row bg-gray-100 min-h-screen'>
      <div className='p-6 bg-gray-200 border-b md:border-r md:min-h-screen border-gray-300  dark:bg-[rgb(16,23,42)] '>
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label className='font-bold text-gray-700 dark:text-white'>Search Term:</label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className='rounded-lg border border-gray-400'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='font-bold text-gray-700  dark:text-white'>Sort:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.sort}
              id='sort'
              className='rounded-lg border border-gray-400'
            >
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='font-bold text-gray-700  dark:text-white'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
              className='rounded-lg border border-gray-400'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
              <option value='javascript'>JavaScript</option>
            </Select>
          </div>
          <Button type='submit' className='bg-blue-600 text-white rounded-lg py-2'>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='flex-1  dark:bg-[rgb(16,23,42)] '>
        <h1 className='text-4xl font-bold text-gray-800 border-b border-gray-300 p-6 dark:text-white'>
          Posts results:
        </h1>
        <div className='p-6 flex flex-wrap gap-6'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-blue-600 text-lg hover:underline p-4 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
