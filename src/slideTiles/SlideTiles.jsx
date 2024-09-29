import activeSlideTile from '../assets/activeSlideTile.png';
import slideTile from '../assets/slideTile.png';
export default function SlideTiles({ isActiveSlideTile }) {
  return <img src={isActiveSlideTile ? activeSlideTile : slideTile} alt='' />;
}
