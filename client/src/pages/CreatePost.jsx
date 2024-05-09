import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React,{useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

const CreatePost = () => {
  const [file,setFile]=useState(null);
  const [imageUploadProgress,setimageUploadProgress]=useState(null);
  const [imageUploadError,setImageUploadError]=useState(null);
  const [formData,setFormData]=useState({});
  const handleUploadImage=async()=>{
    try {
      if(!file){
        setImageUploadError('Please Select an Image');
        return 
      }
      setImageUploadError(null);
      const storage=getStorage(app)
      const fileName = new Date().getTime()+'-'+file.name;
      const storageRef=ref(storage,fileName);
      const uploadTask=uploadBytesResumable(storageRef,file);
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setimageUploadProgress(progress.toFixed(0));
        },
        (error)=>{
          setImageUploadError('Image Upload Failed');
          setimageUploadProgress(null);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setimageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...formData,image:downloadURL})
          })
        }
      )



      //look at firebase.js for app thing we have exported app from there
    } catch (error) {
      setImageUploadError('image upload failed');
      setimageUploadProgress(null);
      console.log(error);
      
    }

  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>
        Create a Post
      </h1>
      <form className='flex flex-col gap-4'>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
          <Select>
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
        <ReactQuill theme="snow" placeholder='Write something...' className='h-72 mb-12' required/>
        <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
      </form>
    </div>
  )
}

export default CreatePost