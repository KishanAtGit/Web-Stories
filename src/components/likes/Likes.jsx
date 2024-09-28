import { useState } from 'react';
import unlike from '../../assets/unlike.png';
import like from '../../assets/like.png';

export default function Likes() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className='likes'>
      <img
        src={isLiked ? unlike : like}
        alt='bookmark'
        onClick={() => setIsLiked(prev => !prev)}
      />
      <span className='likes-count'>22</span>
    </div>
  );
}
