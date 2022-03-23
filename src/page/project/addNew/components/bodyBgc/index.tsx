/**
 * @file 核心区域包裹组件
 */
import React, { useMemo } from 'react';
import { FloatCard } from 'components';
import styles from '../index.module.scss';
import classNames from 'classnames';

export default function index(props: any) {
  const { children, width } = props;
  let floatProps = useMemo(() => {
    return {
      isVisualShow: false,
      aniOutCss: 'animate__bounce',
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
          'animate__bounce'
        )}
      >
        {children}
      </div>
    </FloatCard>
  );
}
