import { useEffect, useState } from "react"

const Profile = () => {
    const [profile, setProfile] = useState(false)
    const [user, setUser] = useState({username: ''})

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            setProfile(true)
        } else {
            setProfile(false)
        }
    })

    return (
        <div className='min-h-screen'>
            {profile ? 
                <div className='mt-4'>
                    <h1 className='text-center text-xl'>My Profile</h1>
                    <div className='mt-1 text-center'>{JSON.parse(localStorage.getItem('user')).username}</div>
                    <div className='mt-1 text-center'>Saved Quizzes</div>
                </div> 
                : <div className='mt-4 text-center'>Please sign in or sign up to access your profile.</div>}
        </div>
    )
}

export default Profile
