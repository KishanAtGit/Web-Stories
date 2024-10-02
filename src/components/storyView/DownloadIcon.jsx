import { useState } from 'react';
import { downloadImage } from '../../services/api.downloadFile';
import downloadIcon from '../../assets/downloadIcon.png';
import downloadedIcon from '../../assets/downloadedIcon.png';
export default function DownloadIcon({ imageUrl }) {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownloadImage = async () => {
    const success = await downloadImage(imageUrl);
    if (success) {
      setIsDownloaded(true);
    }
  };

  return (
    <img
      className='download-icon'
      src={isDownloaded ? downloadedIcon : downloadIcon}
      onClick={handleDownloadImage}
      alt='downloadIcon'
    />
  );
}
