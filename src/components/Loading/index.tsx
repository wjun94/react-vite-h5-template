import { FC, memo } from 'react';
import './index.less';
export interface LoadingProps {
  className?: string;
  style?: string;
  height?: number;
  width?: number;
  isPage?: boolean;
}

const Loading: FC<LoadingProps> = ({
  className,
  width,
  height,
  isPage,
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center fullBody ${
        className ?? (isPage && 'page_loading_body')
      }`}>
      <div
        className="la-square-jelly-box"
        style={{ height: height ?? 64, width: width ?? 64 }}>
        <div />
        <div />
      </div>
    </div>
  );
};
export default memo(Loading);
