/**
 * @file 右侧项目卡片
 */
import React from 'react';
import styles from '../../index.module.scss';
import router from 'utils/History';

export default function index(props: any) {
  const {
    models: { projectNums },
  } = props;
  function toPC() {
    router.push('/menu/web-pc');
  }
  function toMobile() {
    router.push('/menu/web-mobile');
  }
  function toServe() {
    router.push('/menu/web-serve');
  }
  function toRest() {
    router.push('/menu/web-rest');
  }
  return (
    <>
      <div className={styles.right_ball_div}>
        {/* PC项目展示球 */}
        <div className={styles.web_pc_div} onClick={toPC}>
          <div className={styles.sub_title_div}>PC项目</div>
          <div className={styles.num_div}>
            {projectNums.pc}
            <span>个</span>
          </div>
        </div>
        {/*移动端项目展示球 */}
        <div className={styles.mobile_pc_div} onClick={toMobile}>
          <div className={styles.sub_title_div}>Mobile项目</div>
          <div className={styles.num_div}>
            {projectNums.mobile}
            <span>个</span>
          </div>
        </div>
        {/*服务端项目展示球 */}
        <div className={styles.serve_pc_div} onClick={toServe}>
          <div className={styles.sub_title_div}>服务端项目</div>
          <div className={styles.num_div}>
            {projectNums.serve}
            <span>个</span>
          </div>
        </div>
        {/*更多项目展示球 */}
        <div className={styles.more_pc_div} onClick={toRest}>
          <div className={styles.sub_title_div}>其他项目</div>
          <div className={styles.num_div}>
            {projectNums.rest}
            <span>个</span>
          </div>
        </div>
      </div>
    </>
  );
}
