import Link from 'next/link'
import { useState, useEffect } from 'react'

const Signup = () => {
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
        { !isSubmit ? 
        <div className='min-h-screen flex justify-center'>
            <form onSubmit={handleSubmit}>
                <h1 className='mt-8 md:mt-12 text-center
                               text-2xl font-semibold text-sky-500'>Kuizme</h1>
                <h1 className='mt-2 text-center
                               text-xl font-semibold'>Sign Up</h1>
                <div className='text-center mt-2'>
                    Or <span className='text-sky-500
                                        hover:text-sky-600'>
                        <Link href='/signin'>sign in</Link></span> to your account</div>
                <div className='flex flex-col w-80 h-20 mt-4 text-lg'>
                    <label className='font-medium'>Email</label>
                    <input className='h-10 border p-2 text-base' 
                           type='text' name='email' value={formValues.email} onChange={handleChange} />
                    <p className='text-sm text-red-500'>{formErrors.email}</p>
                </div>
                <div className='flex flex-col w-80 h-20 mt-2 text-lg'>
                    <label className='font-medium'>Password</label>
                    <input className='h-10 border p-2 text-base' 
                           type='password' name='password' value={formValues.password} onChange={handleChange} />
                    <p className='text-sm text-red-500'>{formErrors.password}</p>
                </div>
                <div className='flex flex-col w-80 h-20 mt-2 text-lg'>
                    <label className='font-medium'>Confirm Password</label>
                    <input className='h-10 border p-2 text-base' 
                           type='password' name='_password' value={formValues._password} onChange={handleChange} />
                    <p className='text-sm text-red-500'>{formErrors._password}</p>
                </div>
                <div className='flex flex-col w-80 h-20 mt-2 text-lg'>
                    <label className='font-medium'>Username</label>
                    <input className='h-10 border p-2 text-base' 
                           type='text' name='username' value={formValues.username} onChange={handleChange} />
                    <p className='text-sm text-red-500'>{formErrors.username}</p>
                </div>
                <button className={`w-80 h-10 mt-3 rounded text-white 
                                   ${isDisable ? 'bg-sky-500 hover:bg-sky-600 hover:cursor-pointer' 
                                               : 'bg-gray-300'}`}
                        disabled={!isDisable}>
                                Sign up</button>
                <div className='w-80 mt-4 ml-1 text-sm'>
                    By signing up, you are agreeing to the  
                    <span className='text-sky-500'><Link href='/terms-of-service'> Terms of Conditions </Link></span> and 
                    <span className='text-sky-500'><Link href='/privacy'> Privacy Policy</Link></span>.
                </div>
            </form>
        </div>
        : 
        <div className='min-h-screen flex justify-center'>
            <div>
                <h1 className='mt-12 text-center
                                text-2xl font-semibold text-sky-500'>Kuizme</h1>
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

export default Signup
