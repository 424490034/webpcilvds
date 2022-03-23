/**
 * @file 新增项目
 */
import React, { useMemo, useState, useRef, useEffect } from 'react';
import pageConfig from './config/pageConfig';
import { connect } from 'dva';
import styles from './index.module.scss';
import { FloatCard, HeaderCard } from 'components';
import StepsCom from './components/Steps';
import StepOne from './components/StepOne';
const { namespace, pageName } = pageConfig;

function index(props: any) {
  const stepsOne: any = useRef();
  useEffect(() => {
    resetAll();
  }, []);
  function resetAll() {
    stepsOne.current.register();
  }
  const [current, setCurrent] = useState(0);
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
    <div className={styles.add_new_div}>
      <FloatCard {...floatProps}>
        <HeaderCard title="新增项目">
          <div className={styles.body_div}>
            <StepsCom
              models={props[namespace]}
              current={current}
              setCurrent={setCurrent}
            />
            {current == 0 && <StepOne setCurrent={setCurrent} ref={stepsOne} />}
          </div>
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
