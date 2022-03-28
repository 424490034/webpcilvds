import React, { useEffect, useMemo, useRef, useState } from 'react';
import { withRouter } from 'dva/router';
import { FloatCard } from 'components';
import styles from './index.module.scss';
import { debounce } from 'lodash';
import PrejectBoard from './component/ProjectBoard';
import SystemInfo from './component/SystemInfo';
import CpuLoadCard from './component/CpuLoadCard';
import GateWayCard from './component/GateWay';
import ProjectCard from './component/ProjectCard';
import { connect } from 'dva';
import pageConfig from './config/pageConfig';
import { SyncOutlined } from '@ant-design/icons';
const { namespace, pageName } = pageConfig;
const Overview = function (props: any) {
  const { actions } = props;
  useEffect(() => {
    registerScroll();
    return () => {
      registerScroll(true);
    };
  }, []);
  // 进行数据同步
  const [scrollTop, setScrollTop] = useState(0);
  const [parentClient, setParentClient] = useState(721);
  const bodyRef: any = useRef();
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
    const { current } = bodyRef;
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
  return (
    <div className={styles.overview_div} ref={bodyRef}>
      <div className={styles.left_body_div}>
        <div className={styles.left_title_div}>
          系统看版
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
              cursor: 'pointer',
            }}
            onClick={actions.fetchSystem}
          >
            <SyncOutlined spin />
          </span>
        </div>
        <FloatCard {...floatProps}>
          <SystemInfo {...props} />
        </FloatCard>
        <CpuLoadCard models={props[namespace]} />
        <FloatCard {...floatProps}>
          <GateWayCard models={props[namespace]} />
        </FloatCard>
      </div>
      <div className={styles.right_stat_div}>
        <PrejectBoard models={props[namespace]} />
        <FloatCard {...floatProps}>
          <ProjectCard />
        </FloatCard>
      </div>
    </div>
  );
};
const mapStateToProps = (props: any) => {
  return {
    [namespace]: props[namespace],
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: {
      fetchSystem(payload: any) {
        dispatch({
          type: `${namespace}/reloadSystem`,
          payload,
        });
      },
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Overview);
