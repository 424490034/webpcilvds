/**
 * @file 左侧展示层
 */
import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
interface IProps {
  select: string;
  setSelect: any;
}
export default function LeftCard(props: IProps) {
  const { select, setSelect } = props;
  return (
    <div className={styles.left_preview_div}>
      <div
        className={classNames(
          styles.left_top_div,
          select === 'leftTop' && styles.btn_active
        )}
        onClick={() => {
          setSelect('leftTop');
        }}
      ></div>
      <div
        className={classNames(
          styles.right_top_div,
          select === 'rightTop' && styles.btn_active
        )}
        onClick={() => {
          setSelect('rightTop');
        }}
      ></div>
      <div
        className={classNames(
          styles.left_bottom_div,
          select === 'leftBottom' && styles.btn_active
        )}
        onClick={() => {
          setSelect('leftBottom');
        }}
      ></div>
      <div
        className={classNames(
          styles.right_bottom_div,
          select === 'rightBottom' && styles.btn_active
        )}
        onClick={() => {
          setSelect('rightBottom');
        }}
      ></div>
      <div className={styles.prereview_div}></div>
    </div>
  );
}
