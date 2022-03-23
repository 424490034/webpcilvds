/**
 * @file 浮动卡片
 * @description 高阶组件-
 */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
interface IProps {
  isOpenCss?: Boolean; // 是否开启载入动画 默认开启
  isVisualShow?: Boolean; // 是否在可视范围内进行动画展示
  className?: string; // 额外样式
  aniCss?: string; // 定制载入样式
  aniOutCss?: string; // 定制淡出样式
  scrollTop?: number; // 滚动距离
  parentClient?: number; // 父级可视区域高度
  style?: any; // 自定义样式
  [name: string]: any;
}
export default function index(props: IProps) {
  if (props.isVisualShow && props.parentClient === undefined) {
    console.error('未传入父级高度');
  }
  if (props.isVisualShow && props.scrollTop === undefined) {
    console.error('未传入滚动高度');
  }
  const {
    // 传入数据
    isOpenCss = true,
    isVisualShow = false,
    className,
    children,
    aniCss = 'animate__fadeInUp',
    aniOutCss = 'animate__fadeOut',
    scrollTop = 0,
    parentClient = 0,
    style = {},
  } = props;
  const [toTop, setToTop] = useState<number>(0);
  // 用于判断是否已经进入展示范围
  const [isShow, setIsShow] = useState<boolean>(false);
  useEffect(() => {
    getTopScroll();
  }, []);
  // 监听是否进入滚动范围
  useEffect(() => {
    if (isVisualShow) {
      isVray();
    }
  }, [scrollTop]);
  // 判断当前元素是否需要进行渲染
  function isVray() {
    if (basicsRef.current) {
      /**
       * @description 使用可视范围高度+已滚动高度
       * 判断是否大于当前元素距离顶部的距离
       * 从而判断是否进入对应元素展示区域
       */
      if (!(parentClient + scrollTop > toTop)) {
        setIsShow(false);
      } else {
        setIsShow(true);
      }
    }
  }
  // 获取当前元素距离顶部高度
  function getTopScroll() {
    if (basicsRef.current) {
      const { current } = basicsRef;
      setToTop(current.getBoundingClientRect().top);
    }
  }
  const basicsRef: any = useRef();
  let initAniCss = isOpenCss
    ? ['animate__animated', isShow ? aniCss : aniOutCss]
    : [];
  return (
    <div
      ref={basicsRef}
      className={
        className
          ? classNames(className, 'card_shadox', ...initAniCss)
          : classNames('card_shadox', ...initAniCss)
      }
      style={{
        animationDuration: isShow ? '.5s' : '.25s',
        ...style,
      }}
    >
      {children && React.cloneElement(children, { isShow })}
    </div>
  );
}
