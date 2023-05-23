import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from  'react-redux'
import { useNavigate } from 'react-router-dom'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formdata

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

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading){
        return <Spinner />
    }

    return <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Login an account</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
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
                    <button type="submit" className='btn btn-block'>
                        submit
                    </button>
                </div>
            </form>
        </section>
    </>
}

export default Login