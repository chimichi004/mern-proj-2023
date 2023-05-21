import { useState, useEffect } from 'react'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from  'react-redux'
import { useNavigate } from 'react-router-dom'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Register() {
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2} = formdata

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth)

    useEffect(() => {
      if(isError){
        toast.error(message)
      }

      if(isSuccess || user){
        navigate('/')
      }

      dispatch(reset())
    
    }, [user, isError, isSuccess, message, navigate, dispatch])
    

    const onChange = (e) => {
        setFormdata((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2){
            toast.error('Password did not match')
        } else {
            const userData = {
                name,
                email,
                password
            }

            //send off new user registred
            dispatch(register(userData))
        }   
    }

    if(isLoading){
        return <Spinner />
    }

    return <>
        <section className="heading">
            <h1>
                <FaUser /> Register
            </h1>
            <p>Creater an account</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={name} 
                        placeholder='Enter your name' 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={email} 
                        placeholder='Enter your email' 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={password} 
                        placeholder='Enter your password' 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password2" 
                        id="password2" 
                        value={password2} 
                        placeholder='Confirm your password' 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>
                        submit
                    </button>
                </div>
            </form>
        </section>
    </>
}

export default Register