/**
 * @file web-工具库
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'dva';
import pageConfig from './config/pageConfig';
import { FloatCard, HeaderCard } from 'components';
import styles from './index.module.scss';
import { debounce } from 'lodash';
import DomainCom from './components/DomainCom';
import CursorCom from './components/CursorCom';
import KeyBoardCom from './components/keyBoardCom';
import ColorCom from './components/ColorCom';
import MimesisCom from './components/mimesisCom/index';
// import ImgCompress from './components/ImgCompress';
const { namespace, pageName } = pageConfig;
function index(props: any) {
  const {
    location: { search },
    actions,
  } = props;

  const bodyRef: any = useRef();
  // 进行数据同步
  const [scrollTop, setScrollTop] = useState(0);
  const [parentClient, setParentClient] = useState(721);
  useEffect(() => {
    registerScroll();
    return () => {
      registerScroll(true);
    };
  }, []);
  let func = debounce(handerScroll, 200);
  function registerScroll(isDestory: boolean = false) {
    if (isDestory) {
      if (bodyRef.current) {
        const { current } = bodyRef;
        current.removeEventListener('scroll', func);
      }
    }
    if (bodyRef.current) {
      const { current } = bodyRef;
      const { clientHeight } = current;
      setParentClient(clientHeight);
      current.removeEventListener('scroll', func);
      current.addEventListener('scroll', func);
    }
  }
  function handerScroll() {
    const { current = {} } = bodyRef;
    const { scrollTop } = current;
    setScrollTop(scrollTop);
  }
  let floatProps = useMemo(() => {
    return {
      scrollTop,
      parentClient,
      isVisualShow: true,
    };
  }, [scrollTop, parentClient]);
  let dataComProps = useMemo(() => {
    return {
      models: props[namespace],
      actions,
    };
  }, [props[namespace]]);
  return (
    <div className={styles.show_card} ref={bodyRef}>
      {/* <FloatCard
        {...floatProps}
        style={{
          height: 350,
          marginBottom: 12,
        }}
      >
        <HeaderCard title="图片压缩">
          <ImgCompress {...dataComProps} />
        </HeaderCard>
      </FloatCard> */}
      {/* 颜色转换 */}
      <FloatCard
        {...floatProps}
        style={{
          height: 300,
          marginBottom: 12,
        }}
      >
        <HeaderCard title="颜色转换">
          <ColorCom {...dataComProps} />
        </HeaderCard>
      </FloatCard>
      {/* 鼠标指针样式 */}
      <FloatCard
        {...floatProps}
        style={{
          height: 300,
          marginBottom: 12,
        }}
      >
        <HeaderCard title="鼠标指针样式">
          <CursorCom {...dataComProps} />
        </HeaderCard>
      </FloatCard>
      {/* 键盘code获取 */}
      <FloatCard
        {...floatProps}
        style={{
          height: 350,
          marginBottom: 12,
        }}
      >
        <HeaderCard title="键盘code获取">
          <KeyBoardCom {...dataComProps} />
        </HeaderCard>
      </FloatCard>
      {/* 拟态按钮设计 */}
      <FloatCard
        {...floatProps}
        style={{
          height: 620,
          marginBottom: 12,
        }}
      >
        <HeaderCard title="拟态按钮设计">
          <MimesisCom {...dataComProps} />
        </HeaderCard>
      </FloatCard>
      {/* 域名IP获取 */}
      <FloatCard
        {...floatProps}
        style={{
          height: 169,
          marginBottom: 12,
        }}
      >
        <HeaderCard title="域名IP获取">
          <DomainCom {...dataComProps} />
        </HeaderCard>
      </FloatCard>
    </div>
  );
}
const mapStateToProps = (props: any) => {
  return {
    [namespace]: props[namespace],
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: {
      //  setProject(payload: any) {
      //    dispatch({
      //      type: `${namespace}/setProject`,
      //      payload,
      //    });
      //  },
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
