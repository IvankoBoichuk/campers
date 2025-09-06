type IconProps = {
  name: string;
  size?: number;
  [key: string]: any;
};

const Icon = ({ name, size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} {...props}>
    <use href={`/sprite.svg#icon-${name}`} />
  </svg>
);

export default Icon;
