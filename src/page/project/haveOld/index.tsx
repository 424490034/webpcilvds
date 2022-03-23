/**
 * @file 已有项目添加
 */
import React from 'react';
import pageConfig from './config/pageConfig';
import { connect } from 'dva';
import styles from './index.module.scss';
const { namespace, pageName } = pageConfig;

function index() {
  return <div>index</div>;
}
const mapStateToProps = (props: any) => {
  return {
    [namespace]: props[namespace],
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: {
      // fetchSystem(payload: any) {
      //   dispatch({
      //     type: `${namespace}/reloadSystem`,
      //     payload,
      //   });
      // },
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
