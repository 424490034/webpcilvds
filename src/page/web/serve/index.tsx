/**
 * @file 服务端项目页面
 */
import React, { useMemo } from 'react';
import { connect } from 'dva';
import pageConfig from './config/pageConfig';
import { FloatCard, HeaderCard } from 'components';
import styles from './index.module.scss';
const { namespace, pageName } = pageConfig;
function index(props: any) {
  let floatProps = useMemo(() => {
    return {
      isVisualShow: false,
      aniOutCss: 'animate__fadeInUpBig',
      style: {
        width: '100%',
        height: '100%',
        margin: 0,
      },
    };
  }, []);
  return (
    <div className={styles.show_card}>
      <FloatCard {...floatProps}>
        <HeaderCard title={pageName}></HeaderCard>
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
