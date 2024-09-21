import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { loginUser, registerUser } from '../../services/api.users';
import crossIcon from '../../assets/crossIcon.jpg';
import './modalStyles.css';

export default function AuthModal({
  openAuthModal,
  setOpenAuthModal,
  modalHeading,
  modalButtonText,
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleModalClose = () => {
    setOpenAuthModal(false);
    reset();
  };

  const onSubmit = async data => {
    if (modalHeading === 'Register') {
      const res = await registerUser(data);
      if (res.status === 201) {
        //need to be fixed, also a toast msg if redundant username is used
        notify();
        reset();
        onSuccess();
      }
    } else if (modalHeading === 'Login') {
      const res = await loginUser(data);
      if (res.status === 202) {
        notify();
        reset();
        onSuccess();
      }
    }
  };

  const notify = () => {
    toast.success('User registered successfully');
    // navigator.clipboard.writeText(storyLink);
  };

  return (
    <Modal
      isOpen={openAuthModal}
      onRequestClose={handleModalClose}
      contentLabel='Example Modal'
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
          <div className='form-input-labels'>
            <span>Username</span> <span>Password</span>
          </div>
          <div className='form-inputs'>
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
            <input
              type='password'
              placeholder='Enter password'
              {...register('password', {
                required: 'Please enter a valid password',
                minLength: {
                  value: 6,
                  message: 'Please enter a valid password of length 6',
                },
              })}
            />
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
