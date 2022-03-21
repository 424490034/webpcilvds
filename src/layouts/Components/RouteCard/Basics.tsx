/**
 * @file 基础路由卡片
 */
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Button } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import router from 'utils/History';
import { withRouter } from 'dva/router';

interface routeProps {
  name: string;
  icon?: JSX.Element;
  component: any;
  scrollTop: number;
  index: number;
  route: string;
  location: any;
}
function Basics(props: routeProps) {
  const {
    scrollTop = 0,
    name,
    icon,
    route,
    location: { pathname },
  } = props;
  // 当前元素距离顶部距离
  const [toTop, setToTop] = useState<number>(0);
  // 用于判断是否已经进入展示范围
  const [isShow, setIsShow] = useState<boolean>(false);
  const basicsRef: any = useRef();
  useEffect(() => {
    getTopScroll();
  }, []);
  // 监听是否进入滚动范围
  useEffect(() => {
    isVray();
  }, [scrollTop]);
  // 获取当前元素距离顶部高度
  function getTopScroll() {
    let offsetTop: number = document.querySelector('.list_box')?.offsetTop;
    if (basicsRef.current) {
      const { current } = basicsRef;
      setToTop(current.offsetTop - offsetTop);
    }
  }
  // 判断当前元素是否需要进行渲染
  function isVray() {
    // 获取顶层dom 并计算首屏展示最高高度
    let topDom = document.querySelector('.list_box');
    let topHeight = topDom?.clientHeight;
    /**
     * @description 使用可视范围高度+已滚动高度
     * 判断是否大于当前元素距离顶部的距离
     * 从而判断是否进入对应元素展示区域
     */
    if (!(topHeight + scrollTop > toTop)) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }
  // 点击跳转
  function toRouter() {
    router.push(route);
  }
  return (
    <div
      ref={basicsRef}
      className={classNames(
        styles.basics_div,
        'animate__animated',
        isShow ? 'animate__backInLeft' : 'animate__backOutRight',
        route === pathname ? styles.checked_div : ''
      )}
      onClick={toRouter}
    >
      <Button
        type="link"
        // block
        className={classNames(
          styles.subTitle_div,
          isShow && styles.subTitle_ani
        )}
        title={name}
      >
        {icon && <span className={styles.subTitle_span}>{icon}</span>} {name}
      </Button>
      <div
        className={classNames(
          styles.subTitle_icon_div,
          isShow && styles.subIcon_ani
        )}
      >
        <RightCircleOutlined />
      </div>
    </div>
  );
}
export default withRouter(Basics);
