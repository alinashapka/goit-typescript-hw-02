import clsx from 'clsx';
import css from './LoadMoreBtn.module.css';

interface Props {
    onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: Props) {
    return(<div className={clsx(css.wrapper)}>
        <button className={clsx(css.button)} type="button" onClick={onClick}>Load more</button>
    </div>)
}