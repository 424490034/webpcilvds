import React, { useEffect } from 'react';
import LeftCard from './LeftCard';
import styles from './index.module.scss';
import RightCard from './RightCard';
import router from 'utils/History';
import { noLayoutRoute } from 'config/router';
export default function index(props: any) {
  const {
    history,
    location: { pathname },
  } = props;
  if (noLayoutRoute.indexOf(pathname) !== -1) {
    return null;
  }
  useEffect(() => {
    // 注册路由
    router.setHistory(history);
    history.push('/menu/home');
  }, []);
  return (
    <div className={styles.theme_div}>
      <LeftCard />
      <RightCard {...props} />
    </div>
  );
}
