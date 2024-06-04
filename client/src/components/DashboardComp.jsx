import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {HiAnnotation,HiArrowNarrowUp,HiDocumentText,HiOutlineUserGroup,} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
function DashboardComp() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user);
    useEffect(()=>{
      const fetchUsers=async()=>{
        try {
            const res = await fetch('/api/user/getUsers?limit=5');
            const data = await res.json();
            if (res.ok) {
              setUsers(data.users);
              setTotalUsers(data.totalUsers);
              setLastMonthUsers(data.lastMonthUsers);
            }
          } catch (error) {
            console.log(error.message);
          }
      }
      const fetchComments=async()=>{
        try {
            const res = await fetch('/api/comment/getcomments?limit=5');
            const data = await res.json();
            if (res.ok) {
              setComments(data.comments);
              setTotalComments(data.totalComments);
              setLastMonthComments(data.lastMonthComments);
            }
          } catch (error) {
            console.log(error.message);
          }
       
      }
      const fetchPosts=async()=>{
        try {
            const res = await fetch('/api/post/getposts?limit=5');
            const data = await res.json();
            if (res.ok) {
              setPosts(data.posts);
              setTotalPosts(data.totalPosts);
              setLastMonthPosts(data.lastMonthPosts);
            }
          } catch (error) {
            console.log(error.message);
          }
      }
      if(currentUser.isAdmin){
        fetchUsers();
        fetchComments();
        fetchPosts();
      }
    },[currentUser])
  return (
    <div className="p-3 md:mx-auto">
    <div className="flex-wrap flex gap-6 justify-center">
      <div className="flex flex-col p-5 bg-gradient-to-r from-teal-400 to-blue-500 gap-6 md:w-72 w-full rounded-3xl shadow-xl transform transition duration-500 hover:scale-105">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-gray-200 text-md uppercase">Total Users</h3>
            <p className="text-3xl text-white">{totalUsers}</p>
          </div>
          <HiOutlineUserGroup className="text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-black-200 flex items-center">
            <HiArrowNarrowUp />
            {lastMonthUsers}
          </span>
          <div className="text-gray-300">Last month</div>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-gradient-to-r from-purple-400 to-pink-500 gap-6 md:w-72 w-full rounded-3xl shadow-xl transform transition duration-500 hover:scale-105">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-gray-200 text-md uppercase">Total Comments</h3>
            <p className="text-3xl text-white">{totalComments}</p>
          </div>
          <HiAnnotation className="text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-black-400 flex items-center">
            <HiArrowNarrowUp />
            {lastMonthComments}
          </span>
          <div className="text-gray-300">Last month</div>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-gradient-to-r from-green-400 to-teal-500 gap-6 md:w-72 w-full rounded-3xl shadow-xl transform transition duration-500 hover:scale-105">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-gray-200 text-md uppercase">Total Posts</h3>
            <p className="text-3xl text-white">{totalPosts}</p>
          </div>
          <HiDocumentText className="text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-black-200 flex items-center">
            <HiArrowNarrowUp />
            {lastMonthPosts}
          </span>
          <div className="text-gray-300">Last month</div>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-6 py-6 mx-auto justify-center">
      <div className="flex flex-col w-full md:w-auto shadow-xl p-5 rounded-3xl bg-gradient-to-r from-indigo-400 to-purple-500 transform transition duration-500 hover:scale-105">
        <div className="flex justify-between p-3 text-sm font-semibold text-white">
          <h1 className="text-center p-2">Recent users</h1>
          <Button outline gradientDuoTone="tealToBlue">
            <Link to="/dashboard?tab=users">See all</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
          </Table.Head>
          {users && users.map(user => (
            <Table.Body key={user._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <img
                    src={user.profilePicture}
                    alt="user"
                    className="w-10 h-10 rounded-full bg-gray-500"
                  />
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
      <div className="flex flex-col w-full md:w-auto shadow-xl p-5 rounded-3xl bg-gradient-to-r from-indigo-400 to-purple-500 transform transition duration-500 hover:scale-105">
        <div className="flex justify-between p-3 text-sm font-semibold text-white">
          <h1 className="text-center p-2">Recent comments</h1>
          <Button outline gradientDuoTone="tealToBlue">
            <Link to="/dashboard?tab=comments">See all</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Comment content</Table.HeadCell>
            <Table.HeadCell>Likes</Table.HeadCell>
          </Table.Head>
          {comments && comments.map(comment => (
            <Table.Body key={comment._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="w-96">
                  <p className="line-clamp-2">{comment.content}</p>
                </Table.Cell>
                <Table.Cell>{comment.numberOfLikes}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
      <div className="flex flex-col w-full md:w-auto shadow-xl p-5 rounded-3xl bg-gradient-to-r from-indigo-400 to-purple-500 transform transition duration-500 hover:scale-105">
        <div className="flex justify-between p-3 text-sm font-semibold text-white">
          <h1 className="text-center p-2">Recent posts</h1>
          <Button outline gradientDuoTone="tealToBlue">
            <Link to="/dashboard?tab=posts">See all</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
          </Table.Head>
          {posts && posts.map(post => (
            <Table.Body key={post._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <img
                    src={post.image}
                    alt="post"
                    className="w-14 h-10 rounded-md bg-gray-500"
                  />
                </Table.Cell>
                <Table.Cell className="w-96">{post.title}</Table.Cell>
                <Table.Cell className="w-5">{post.category}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
    </div>
  </div>
  )
}

export default DashboardComp