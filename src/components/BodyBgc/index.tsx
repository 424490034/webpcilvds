/**
 * @file 核心区域包裹组件
 */
import React, { useMemo } from 'react';
import FloatCard from '../FloatCard';
import styles from './index.module.scss';
import classNames from 'classnames';

export default function index(props: any) {
  const { children, width } = props;
  let floatProps = useMemo(() => {
    return {
      isVisualShow: false,
      aniOutCss: 'animate__zoomIn',
      style: {
        width,
        margin: '0 auto',
      },
    };
  }, []);
  return (
    <FloatCard {...floatProps}>
      <div
        className={classNames(
          styles.bodyBgc_div,
          'animate__animated',
          'animate__zoomIn'
        )}
      >
        {children}
      </div>
    </FloatCard>
  );
}
