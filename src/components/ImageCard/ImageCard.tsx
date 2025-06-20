import clsx from 'clsx';
import css from './ImageCard.module.css';
import { Image } from '../types/image';

interface Props {
  image: Image;
}

export default function ImageCard({ image }: Props) {
    return(<div>
  <img className={clsx(css.img)} src={image.urls.small} alt={image.alt_description}/>
  </div>)
}