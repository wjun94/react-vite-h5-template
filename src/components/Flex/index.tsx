/* eslint-disable no-undef */
import { memo } from 'react';
import clsx from 'clsx';
import './index.less';

export type FlexProps = {
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  // 对齐项目
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  // Flex Direction
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
} & JSX.IntrinsicElements['div'];

const Flex = ({
  align = 'start',
  justify = 'start',
  direction = 'row',
  wrap = 'wrap',
  className,
  ...props
}: FlexProps) => {
  const prefixCls = 'tv-flex';
  const classes = clsx(
    prefixCls,
    {
      [`${prefixCls}-${direction}`]: direction,
      [`${prefixCls}-${wrap}`]: wrap,
      [`${prefixCls}-justify-${justify}`]: justify,
      [`${prefixCls}-align-${align}`]: align,
    },
    className,
  );
  return <div className={classes} {...props} />;
};

export default memo(Flex);
