import { useEffect, useState } from "react"

const Profile = () => {
    const [profile, setProfile] = useState(false)
    const [user, setUser] = useState({username: '', library: []})

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            setProfile(true)
        } else {
            setProfile(false)
        }
        let isMounted = true
        if (localStorage.getItem('user')) {
            updateUser()
        }
        return () => { isMounted = false }
    }, [])

    const updateUser = () => {
        const jwt = JSON.parse(localStorage.getItem('jwt'))
        fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/users/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data))
            setUser(JSON.parse(JSON.stringify(data)))
        })
    }

    return (
        <div className='min-h-screen'>
                <div className={`${profile ? 'none' : 'hidden'} mt-4`}>
                    <h1 className='text-center text-xl'>My Profile</h1>
                    <div className='mt-1 text-center'>{user.username}</div>
                    <div className='mt-1 text-center font-semibold'>Liked Quizzes</div>
                    {user.library.map((elem, index) => 
                        <div key={index} className='text-center'>{elem}</div>
                    )}
                </div> 
                <div className={`${profile ? 'hidden' : 'none'} mt-4 text-center`}>
                    Please sign in or sign up to access your profile.</div>
        </div>
    )
}

export default Profile
