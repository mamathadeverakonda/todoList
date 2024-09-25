import React,{useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'

function Login() {
    const [values,setValues] = useState({
        email:'',
      password : ''
    })
    
    const [errors,setErrors] = useState({})
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    } 
    const handleSubmit = async (event) => {
      event.preventDefault();
      setErrors(Validation(values));

      // If there are no validation errors, proceed with login
      if (Object.keys(errors).length === 0) {
          try {
              const response = await axios.post('http://localhost:5000/login', values);
              console.log(response.data); 
              navigate('/tasks');
          } catch (error) {
              console.error('Error during login:', error);
              
          }
      }
  };

  return (
    <div className = 'd-flex justify-content-center align-items-center bg-primary vh-100'>
         <div className = "bg-white p-3 rounded w-25">
            <h2>Sign-In</h2>
            <form action = "" onSubmit = {handleSubmit}>
                <div className = "mb-3">
                    <label htmlFor = "email"><strong>Email</strong></label>
                    <input type = "email" placeholder = "Enter Email"  name = "email" onChange = {handleInput}
                    className = "form-control rounded-0"/>
                    {errors.email && <span className = "text-danger">{errors.email}</span>}
                </div>

                <div className = "mb-3">
                    <label htmlFor = "password"><strong>Password</strong></label>
                    <input type = "password" placeholder = "Enter Password" name = "password" onChange = {handleInput}
                    className = "form-control rounded-0" />
                    {errors.password && <span className = "text-danger">{errors.password}</span>}
                </div>

                <button type = "submit" className = "btn btn-success w-100 rounded-0">Log In</button>

                <p>You are agree to terms and policies</p>
                <Link to = "/signup" className = "btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Create Account</Link>
            </form>
         </div>
    </div>
  )
}

export default Login
