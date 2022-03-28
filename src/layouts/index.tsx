import React, { useEffect } from 'react';
import LeftCard from './LeftCard';
import styles from './index.module.scss';
import RightCard from './RightCard';
import router from 'utils/History';
export default function index(props: any) {
  const { history } = props;
  useEffect(() => {
    // 注册路由
    router.setHistory(history);
  }, []);
  return (
    <div className={styles.theme_div}>
      <LeftCard />
      <RightCard {...props} />
    </div>
  );
}
