export default function Navbar({ setOpenRegisterModal, setOpenSignInModal }) {
  return (
    <div className='navbar'>
      <div
        className='register button'
        onClick={() => setOpenRegisterModal(true)}
      >
        Register Now
      </div>
      <div className='sign-in button' onClick={() => setOpenSignInModal(true)}>
        Sign In
      </div>
    </div>
  );
}
