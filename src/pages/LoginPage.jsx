import { useState,useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../UserContext.jsx";

export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const [isSubmitting,setIssubmitting]=useState(false);
    const {setUser}=useContext(UserContext);
    
    async function handleLoginSubmit(ev){
    ev.preventDefault();
        if(isSubmitting) return;
        setIsSubmitting(true);
    try{
    const {data}= await axios.post('/login',{email,password},{withCredentials:true});
    setUser(data);
    alert('login successful');
    setRedirect(true);
    }
    catch(e)
    {
        if(e.response && e.response.status===400){
       alert('login failed: invalid credentials or user not registered')
        }
        else{
            alert('login failed: something went wrong')
        }
        setEmail('');
        setPassword('');
        setIsSubmitting(false);
    }
}

if(redirect){
    return <Navigate to={'/'}/>
}

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
            <h1 className="text-3xl text-center mb-3">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
            <input type="email" 
                   placeholder="your@email.com" 
                   value={email} 
                   onChange={ev=>setEmail(ev.target.value)}
                   diasbled={isSubmitting}/>
            <input type="password" 
                   placeholder="type your password" 
                   value={password} 
                   onChange={ev=>setPassword(ev.target.value)}
                   diasbled={isSubmitting}/>
            <button className="primary">
                {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
            <div className="text-center py-2 text-gray-500">
                Don't have an account to login? <Link className="underline text-black " to={'/register'}>Sign Up here!</Link>
            </div>
            </form> 
            </div>
           
        </div>
    );
}
