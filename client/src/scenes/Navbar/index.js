import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../state';

function Navbar() {
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.user)
    function formatDateTime(date) {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayOfWeek = daysOfWeek[date.getDay()];
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${day}-${month}-${year}, ${dayOfWeek}, ${hours}:${minutes}`;
    }
    
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);
  
    
  return (
    <div className='navbar'>
<h2>Manage Your Task</h2>
<h4>{formattedDateTime}</h4>
<div className='links'>
{/* <Link to='/' >Home</Link>
<Link to='/create' style={{color:"white",backgroundColor:'#f1356d', borderRadius:"8px"}}>New blog</Link> */}
</div>   
<Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
       {user.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>dispatch(setLogout())} >Logout</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
 
    </div>
  )
}

export default Navbar