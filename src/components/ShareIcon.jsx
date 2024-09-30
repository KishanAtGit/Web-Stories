import shareIcon from '../assets/shareIcon.png';
import { notifyOnSuccess } from '../axios.config';

export default function ShareIcon({ storyId, slideId }) {
  const handleShareClick = () => {
    const shareUrl = `${window.location.href}?storyId=${storyId}&slideId=${slideId}&isShared=true`;
    navigator.clipboard.writeText(shareUrl);
    notifyOnSuccess('Link copied to clipboard');
  };

  return (
    <img
      onClick={handleShareClick}
      className='share-icon'
      src={shareIcon}
      alt=''
    />
  );
}
