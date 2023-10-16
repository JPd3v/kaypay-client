import { CgSpinner } from 'react-icons/cg';

const sizes = {
  none: '',
  small: 'text-base',
  medium: 'text-3xl',
  large: 'text-5xl',
  extraLarge: 'text-6xl',
};

type Sizes = keyof typeof sizes;

interface Props {
  className?: string;
  color?: string;
  size?: Sizes;
}

export default function Spinner({
  className = '',
  color = 'text-blue-600',
  size = 'medium',
}: Props) {
  return (
    <CgSpinner
      className={`${className} animate-spin ${color} ${sizes[size]}`}
    />
  );
}
