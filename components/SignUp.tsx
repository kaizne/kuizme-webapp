import axios from 'axios'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/solid'

const SignUp = ({ setOverlay }) => {
    const initialValues = { email: '', password: '', _password: '', username: '' }
    const initialErrors = { email: '', password: '', _password: '', username: '' }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState(initialErrors)
    const [isDisable, setIsDisable] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        setFormErrors(validate(formValues))
        setIsDisable(enable(formValues, formErrors))
    }, [formValues])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({...formValues, [name]: value})
        setFormErrors(validate({...formValues, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmit(true)

        /*
        const response = await fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/auth/local/register', { 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formValues.email,
                password: formValues.password,
                username: formValues.username,
            }),
            method: 'POST',   
        })
        */

        axios.post('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/auth/local/register', {
            email: formValues.email,
            password: formValues.password,
            username: formValues.username,
            library: []
        }).catch(error => {
            console.error('An error occured:', error.response)
        })
    }

    const validate = (values) => {
        const errors: any = {email: '', password: '', _password: '', username: ''}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const usernameRegex = /^[a-z0-9]+$/i
        if (values.email && !emailRegex.test(values.email)) 
            errors.email = 'Please enter a valid email.'
        if (values.password != '' && values.password.length < 8) 
            errors.password = 'Password must be at least 8 characters long.'
        if (values._password != '' && values._password !== values.password)
            errors._password = 'Passwords do not match.'
        if (values.username != '' && !usernameRegex.test(values.username)) 
            errors.username = 'Username only alphanumeric characters.'
        return errors
    }

    const enable = (values, errors) => {
        if (values.email !== '' && values.password !== '' && values._password !== '' && values.username !== ''
         && formErrors.email === '' && formErrors.password === '' && formErrors._password === '' && formErrors.username === '')
            return true
        return false
    }

    return (
        <>
        <div className='absolute top-0 right-0 md:-mt-64'>
            <XIcon className='h-7 w-7 mt-1 mr-1 hover:cursor-pointer hover:bg-gray-200'
                    onClick={() => setOverlay('')} />
        </div>
        { !isSubmit ? 
        <div className='w-screen md:w-96 md:h-auto h-screen md:-ml-48 md:-mt-64 rounded bg-white'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <div className='mt-4 text-center hover:text-indigo-400
                                       text-2xl font-semibold text-indigo-600'>Kuizme</div>
                <h1 className='mt-1 text-center text-xl font-semibold'>Sign Up</h1>
                <div className='text-center mt-1'>
                    Or <span className='text-indigo-600
                                        hover:text-indigo-400'>
                        <span className='hover:cursor-pointer'
                                onClick={() => setOverlay('logIn')}>log in</span></span> to your account</div>
                <div className='flex flex-col w-80 h-16 mt-3 text-lg'>
                    <label className='text-base font-medium'>Email</label>
                    <input className='h-8 border p-2 text-base' 
                           type='text' name='email' value={formValues.email} onChange={handleChange} />
                    <p className='text-sm text-red-500'>{formErrors.email}</p>
                </div>
                <div className='flex flex-col w-80 h-16 mt-3 text-lg'>
                    <label className='text-base font-medium'>Password</label>
                    <input className='h-8 border p-2 text-base' 
                           type='password' name='password' value={formValues.password} onChange={handleChange} />
                    <p className='text-sm text-red-500'>{formErrors.password}</p>
                </div>
                <div className='flex flex-col w-80 h-16 mt-3 text-lg'>
                    <label className='text-base font-medium'>Confirm Password</label>
                    <input className='h-8 border p-2 text-base' 
                           type='password' name='_password' value={formValues._password} onChange={handleChange} />
                    <p className='text-sm text-red-500'>{formErrors._password}</p>
                </div>
                <div className='flex flex-col w-80 h-16 mt-3 text-lg'>
                    <label className='text-base font-medium'>Username</label>
                    <input className='h-8 border p-2 text-base' 
                           type='text' name='username' value={formValues.username} onChange={handleChange} />
                    <p className='text-sm text-red-500'>{formErrors.username}</p>
                </div>
                <button className={`w-80 h-10 mt-3 rounded text-white 
                                   ${isDisable ? 'bg-indigo-600 hover:bg-indigo-400 hover:cursor-pointer' 
                                               : 'bg-gray-300'}`}
                        disabled={!isDisable}>
                                Sign up</button>
                <div className='w-80 mt-4 ml-1 mb-3 text-sm'>
                    By signing up, you are agreeing to the  
                    <span className='text-indigo-600 hover:text-indigo-400'><a href='https://www.kuizme.com/terms-of-service'
                    target='_blank'> Terms of Conditions </a></span> and 
                    <span className='text-indigo-600 hover:text-indigo-400'><a href='https://www.kuizme.com/privacy'
                    target='_blank'> Privacy Policy</a></span>.
                </div>
            </form>
        </div>
        : 
        <div className='w-96 h-72 -ml-48 -mt-64 rounded bg-white'>
            <div>
                <div className='text-center'>
                    <Link href='/'>
                        <button className='mt-8 md:mt-12
                                        text-2xl font-semibold text-indigo-600'>Kuizme</button>
                    </Link>
                </div>
                <h1 className='mt-2 text-center
                                text-xl font-semibold'>Sign Up</h1>
                <div className='mt-4 ml-2 mr-2 text-center'>
                     We have sent a verification email to <span className='font-semibold'>{formValues.email}</span>.
                </div>
                <p className='mt-4 ml-2 mr-2 text-center'>Please click it to activate your account.</p>
            </div>
        </div>
        }
        </>
    )
}

export default SignUp
