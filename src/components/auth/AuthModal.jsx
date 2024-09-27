import Modal from 'react-modal';
import { useContext, useState } from 'react';
import { SignedInContext } from '../../App';
import { useForm } from 'react-hook-form';
import { loginUser, registerUser } from '../../services/api.users';
import crossIcon from '../../assets/crossIcon.jpg';
import passwordEye from '../../assets/passwordEye.png';
import './AuthModalStyles.css';

export default function AuthModal({
  openAuthModal,
  setOpenAuthModal,
  modalHeading,
  modalButtonText,
  onSuccess,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handlePasswordView = () => {
    setShowPassword(!showPassword);
  };

  const handleModalClose = () => {
    setOpenAuthModal(false);
    reset();
  };

  const { setIsSignedIn, customModalStyles } = useContext(SignedInContext);

  const onSubmit = async data => {
    try {
      if (modalHeading === 'Register') {
        const res = await registerUser(data);
        if (res.status === 201) {
          reset();
          onSuccess();
        }
      } else if (modalHeading === 'Login') {
        const res = await loginUser(data);
        if (res.status === 202) {
          reset();
          setIsSignedIn(true);
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error in authentication:', error);
    }
  };

  return (
    <Modal
      style={customModalStyles}
      isOpen={openAuthModal}
      onRequestClose={handleModalClose}
      className={'auth-modal'}
      ariaHideApp={false}
    >
      <div className='modal-contents'>
        <img
          className='cross-icon'
          src={crossIcon}
          alt='crossIcon'
          onClick={handleModalClose}
        />
        <div className='modal-heading'>{modalHeading}</div>
        <form>
          <div className='form-inputs'>
            <span>Username</span>
            <input
              type='text'
              placeholder='Enter username'
              {...register('username', {
                required: 'Please enter a valid username',
                minLength: {
                  value: 3,
                  message: 'Please enter a valid username of length 3',
                },
              })}
            />
          </div>
          <div className='form-inputs'>
            <span>Password</span>
            <div className='password-field'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter password'
                {...register('password', {
                  required: 'Please enter a valid password',
                  minLength: {
                    value: 6,
                    message: 'Please enter a valid password of length 6',
                  },
                })}
              />
              <img src={passwordEye} alt='' onClick={handlePasswordView} />
            </div>
          </div>
        </form>
        <div style={{ color: '#FF0E0E' }}>
          {(errors.username && errors.username.message) ||
            (errors.password && errors.password.message)}
        </div>
        <div onClick={handleSubmit(onSubmit)} className='modal-button button'>
          {modalButtonText}
        </div>
      </div>
    </Modal>
  );
}
