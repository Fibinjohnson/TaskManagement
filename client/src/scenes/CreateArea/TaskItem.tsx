import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState ,useEffect} from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { setPosts,setPost ,setDelete} from "../../state";
import CheckIcon from '@mui/icons-material/Check';
import config from '../../config';

interface TaskItemProperty{
  completed:boolean,
  postId:string,
  title:string,
  content:string
}
interface State{
   _id:string
}
interface Userid {
  user:State
}
interface Token {
  token :string
}
function TaskItem({completed,postId,title,content}:TaskItemProperty) {
    const userId=useSelector((state:Userid)=>state.user._id)
    const token=useSelector((state:Token)=>state.token)
    const dispatch=useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteClicked,setDeleteClicked]=useState(false)
    const [isChecked,setChecked]=useState(true);
    const [heading,setTitle]=useState(title);
    const [descreption,setContent]=useState(content);
    const taskItemStyles:React.CSSProperties  = {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    width:'518px',
    marginLeft:'378px',
    position: 'relative',
  };
  const taskcheckedItemStyles :React.CSSProperties = {
    border: '3px solid black ',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    width:'518px',
    marginLeft:'378px',
    position: 'relative',
  };

  const iconsContainerStyles :React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const titleStyles :React.CSSProperties= {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  };

  
  const checkStatus = async (e:any) => {
    e.preventDefault();
    
    try {
        const response = await fetch(`${config.apiUrl}/post/${postId}/checked`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
const handleDelete = async (e:any) => {
 e.preventDefault();
  setDeleteClicked(!deleteClicked);
 

  try {
      const response = await fetch(`${config.apiUrl}/post/${postId}/deletePost`, {
          method: 'DELETE',
          headers: {
              "Authorization": `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({userId:userId})
      });

      if (!response.ok) {
          throw new Error('Request failed');
      }

      const deletedPost = await response.json();
      dispatch(setPosts({ posts: deletedPost }));
      
  } catch (error) {
      console.error('An error occurred:', error);
  }
};

  const getMyPosts=async ()=>{
    try{
     const postResponse=await fetch(`${config.apiUrl}/post/${userId}`,{
         method:"GET",
         headers:{Authorization:`Bearer ${token}`}
     });
     const data=await postResponse.json()
        dispatch(setPosts({posts:data}))
       
 }catch(err){
     console.log("get feedPosts error",err)
 }
}
 


const handleEditIconClick=async()=>{
    setIsEditMode(true);
}

const handleSaveIconClick = async () => {
  try {
      setIsEditMode(false);
      setChecked(!isChecked)

      const response = await fetch(`${config.apiUrl}/post/${postId}/editpost`, {
          method: 'PATCH',
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({  title: heading, content: descreption, completed: false })
      });

      if (!response.ok) {
          throw new Error('Request failed');
      }

      const editedPost = await response.json();
      dispatch(setPost({ post: editedPost }));
  } catch (error) {
      console.error('An error occurred:', error);
  }
};

useEffect(()=>{getMyPosts()},[deleteClicked])
  return (
    <div style={completed ?taskcheckedItemStyles:taskItemStyles}>
      <FormControlLabel
        control={<Checkbox />}
        checked={completed}
        onChange={checkStatus} 
        label={completed?"Completed":'Mark as complete'}
        style={{ marginBottom: '5px' }}
      />
      
      <div style={iconsContainerStyles}>
      {isEditMode ? (
          <CheckIcon style={{ marginRight: '10px' }} onClick={handleSaveIconClick} />
        ) : (
          <EditIcon style={{ marginRight: '10px' }} onClick={handleEditIconClick} />
        )}
        <DeleteIcon onClick={handleDelete} />
      </div>
      
       
      {isEditMode ? (
        <input
          type="text"
          value={heading}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <Typography variant="h6" style={titleStyles}>
          {title}
        </Typography>
      )}

      {isEditMode ? (
        <textarea
          value={descreption}
          onChange={(e) => setContent(e.target.value)}
          rows={4} // Adjust the number of rows as needed
           cols={5}
        />
      ) : (
        <Typography style={{ fontStyle: 'italic' }}>{content}</Typography>
      )}
    </div>
  );
}

export default TaskItem;

