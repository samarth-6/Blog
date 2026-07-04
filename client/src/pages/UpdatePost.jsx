import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import  {useNavigate,useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { supabase } from '../supa_base';

const UpdatePost = () => {
  const [file,setFile]=useState(null);
  const [imageUploadProgress,setimageUploadProgress]=useState(null);
  const [imageUploadError,setImageUploadError]=useState(null);
  const [formData,setFormData]=useState({});
  const [publishError,setPublishError]=useState(null);
  const {postId}=useParams();


  const navigate=useNavigate()
  const {currentUser} = useSelector((state)=>state.user);
  useEffect(()=>{
    try {
        const fetchPost=async()=>{
        const res=await fetch(`/api/post/getposts?postId=${postId}`);
        const data=await res.json();
        if(!res.ok){
            console.log(data.message);
            setPublishError(data.message);
            return;
        }
        if(res.ok){
            setPublishError(null);
            setFormData(data.posts[0]);


        }
        }
        fetchPost();
    } catch (error) {
        console.log(error);
    }
  },[postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`)
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  // const handleUploadImage=async()=>{
  //   try {
  //     if(!file){
  //       setImageUploadError('Please Select an Image');
  //       return 
  //     }
  //     setImageUploadError(null);
  //     const storage=getStorage(app)
  //     const fileName = new Date().getTime()+'-'+file.name;
  //     const storageRef=ref(storage,fileName);
  //     const uploadTask=uploadBytesResumable(storageRef,file);
  //     uploadTask.on(
  //       'state_changed',
  //       (snapshot)=>{
  //         const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
  //         setimageUploadProgress(progress.toFixed(0));
  //       },
  //       (error)=>{
  //         setImageUploadError('Image Upload Failed');
  //         setimageUploadProgress(null);
  //       },
  //       ()=>{
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
  //           setimageUploadProgress(null);
  //           setImageUploadError(null);
  //           setFormData({...formData,image:downloadURL})
  //         })
  //       }
  //     )



  //     //look at firebase.js for app thing we have exported app from there
  //   } catch (error) {
  //     setImageUploadError('image upload failed');
  //     setimageUploadProgress(null);
  //     console.log(error);
      
  //   }

  // }
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please Select an Image');
        return;
      }
      setImageUploadError(null);
      setimageUploadProgress(30); // Initialize progress

      const fileName = new Date().getTime() + '-' + file.name;
      const filePath = `public/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('mern-blog')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      setimageUploadProgress(70); // Update progress

      // Get the public URL
      const { data } = supabase.storage
        .from('mern-blog')
        .getPublicUrl(filePath);

      setimageUploadProgress(100); // Complete progress
      setImageUploadError(null);
      setFormData({ ...formData, image: data.publicUrl });

      // Clear the progress bar after 1 second
      setTimeout(() => {
        setimageUploadProgress(null);
      }, 1000);

    } catch (error) {
      setImageUploadError('Image upload failed');
      setimageUploadProgress(null);
      console.log(error);
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>
        Update Post
      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
          onChange={(e)=>setFormData({...formData,category:e.target.value})}
          value={formData.category}
          >
          <option value="uncategorized">Select a Category</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="React">React.js</option>
          <option value="nextjs">Next.js</option>
          </Select>

        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type='file ' accept ='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
          {/* in above we used that [0] cause we just want to chose one image */}
          <Button type='button' onClick={handleUploadImage} disabled={imageUploadProgress} className='text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' size='sm' outline>
            {
              imageUploadProgress ?(
              <div className="w-16 h-16">
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
              </div>
              ):(
              'Upload Image'
              )
            }
          </Button>
        </div>
        {imageUploadError && (
          <Alert color='failure'>
             {imageUploadError}
          </Alert>
        )}
        {formData.image && (
          <img src={formData.image}
          alt='upload'
          className='w-full h-72 object-cover'
        />)}
        <ReactQuill onChange={(value)=>{setFormData({...formData,content:value})}} value={formData.content} theme="snow" placeholder='Write something...' className='h-72 mb-12' required/>
        <Button type='submit' gradientDuoTone='purpleToPink'>Update post</Button>
        {
          publishError && <Alert className='mt-5'color='failure'>{publishError}</Alert>
        }
      
      </form>
    </div>
  )
}

export default UpdatePost