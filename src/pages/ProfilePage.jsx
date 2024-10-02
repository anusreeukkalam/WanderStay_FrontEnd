import { useContext,useState } from "react";
import { UserContext } from "../UserContext";
import { Link,Navigate,useParams } from "react-router-dom";
import axios from 'axios';
import Placespage from "./Placespage";
import AccountNav from "../AccountNav";

export default function AccountPage(){
    const {ready,user,setUser}=useContext(UserContext);
    const [redirect,setRedirect]=useState(null);

    let {subpage}=useParams();
    if(subpage===undefined){
        subpage='profile';
    }

    async function logout(){
        try{
        await axios.post('/logout');
        setUser(null);
        setRedirect('/ogin');
        } catch (err){
            alert('logout failed');
            console.error('Logout failed:', err);
        }
    }

    if(!ready)
    {
        return 'Loading...';
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
       <div> 
         <AccountNav />  
          {subpage==='profile' &&(
            <div className="text-center max-w-lg mx-auto">
               logged in as {user.name} ({user.email})<br/>
               <button onClick={logout} className="primary max-w-xs mt-4">Logout</button>
            </div>
        )}
        {subpage==='places'&&(
              <Placespage/>
        )}
       </div>
    );
}
