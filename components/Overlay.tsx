import LogIn from './LogIn'
import SignUp from './SignUp'
import ConvinceSignUp from './ConvinceSignUp'

const Overlay = ({ overlay, setOverlay }) => {
    return (
        <>
        <div className='absolute md:top-1/2 md:left-1/2 z-50'>
            { overlay === 'logIn' && <LogIn  setOverlay={setOverlay} /> }
            { overlay === 'signUp' && <SignUp setOverlay={setOverlay} /> }
            { overlay === 'convinceSignUp' && <ConvinceSignUp setOverlay={setOverlay} /> }
        </div>
        { (overlay === 'logIn' || overlay === 'signUp' || overlay === 'convinceSignUp') &&
            <div className='absolute w-screen h-screen bg-black opacity-70 z-40'></div> }
        </>
    )
}

export default Overlay
