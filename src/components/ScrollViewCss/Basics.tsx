/**
 * @file 基础卡片包裹
 * @description 根据传入的item进行展示
 */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
interface routeProps {
  item: any; //对应数据
  component: any;
  scrollTop: number;
  toCss: string; // 进入的css类名
  outCss: string; // 出去的css类名
  scrollClassName: string; // 顶层滚动的class类名
  customDivClassName?: string; // 每个div额外新增类名
}
export default function Basics(props: routeProps) {
  const {
    // 对应参数
    item,
    scrollTop = 0,
    toCss,
    outCss,
    scrollClassName,
    customDivClassName,
    component,
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
    let offsetTop: number = document.querySelector(`.${scrollClassName}`)
      ?.offsetTop;
    if (basicsRef.current) {
      const { current } = basicsRef;
      setToTop(current.offsetTop - offsetTop);
    }
  }
  // 判断当前元素是否需要进行渲染
  function isVray() {
    // 获取顶层dom 并计算首屏展示最高高度
    let topDom = document.querySelector(`.${scrollClassName}`);
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
  return (
    <div
      ref={basicsRef}
      className={classNames(
        customDivClassName,
        'animate__animated',
        isShow ? toCss : outCss
      )}
    >
      {
        React.createElement(component, {
          item,
        }) //渲染 Item 列表内容。
      }
    </div>
  );
}
