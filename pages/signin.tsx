import Link from 'next/link'
import { useState, useEffect } from 'react'

const Signup = () => {
    const initialValues = { email: '', password: '' }
    const initialErrors = { email: '', password: '' }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState(initialErrors)
    const [isDisable, setIsDisable] = useState(false)

    useEffect(() => {
        setFormErrors(validate(formValues))
    }, [formValues])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({...formValues, [name]: value})
        setFormErrors(validate(formValues))
        setIsDisable(enable(formValues, formErrors))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/auth/local/', { 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formValues.email,
                password: formValues.password,
            }),
            method: 'POST',   
        }).then(response => console.log(response.json()) )
          .then(data => console.log(data) )
    }

    const validate = (values) => {
        const errors: any = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (values.email && !emailRegex.test(values.email)) 
            errors.email = 'Please enter a valid email.'
        return errors
    }

    const enable = (values, errors) => {
        if (values.email !== '' && values.password !== ''
         && Object.keys(errors).length === 0)
            return true
        return false
    }

    return (
        <div className='min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <Link href='/'>
                    <button className='mt-8 md:mt-12 text-center
                                       text-2xl font-semibold text-sky-500'>Kuizme</button>
                </Link>
                <h1 className='mt-2 text-center
                               text-xl font-semibold'>Sign In</h1>
                <div className='text-center mt-2'>
                    Or <span className='text-sky-500
                                        hover:text-sky-600'>
                        <Link href='/signup'>sign up</Link></span> for an account</div>
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
                <button className={`w-80 h-10 mt-3 rounded text-white 
                                   ${isDisable ? 'bg-sky-500 hover:bg-sky-600 hover:cursor-pointer' 
                                              : 'bg-gray-300'}`}
                        disabled={!isDisable}>
                                Sign in</button>
                <div className='w-80 mt-4 ml-1 text-sm'>
                    By signing in, you are agreeing to the  
                    <span className='text-sky-500 hover:text-sky-600'><Link href='/terms-of-service'> Terms of Conditions </Link></span> and 
                    <span className='text-sky-500 hover:text-sky-600'><Link href='/privacy'> Privacy Policy</Link></span>.
                </div>
            </form>
        </div>
    )
}

export default Signup
