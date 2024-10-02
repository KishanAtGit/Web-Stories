import shareIcon from '../../assets/shareIcon.png';
import { notifyOnSuccess } from '../../axios.config';

export default function ShareIcon({ storyId, slideId, isSingleSlideViewed }) {
  const handleShareClick = () => {
    const shareUrl = `${window.location.href}?storyId=${storyId}&slideId=${slideId}&isShared=true`;
    navigator.clipboard.writeText(shareUrl);
    notifyOnSuccess('Link copied to clipboard');
  };

  return (
    <img
      className='share-icon'
      style={{ top: isSingleSlideViewed ? '5%' : '' }}
      onClick={handleShareClick}
      src={shareIcon}
      alt=''
    />
  );
}
