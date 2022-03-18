import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
// 主页 控制台
import Home from '../page/Home';
// 桌面窗口
import Desktop from '../page/desktop';
import Theme from '../components/Theme';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
function MenuCom(props: any) {
  const { match } = props;
  return (
    <Theme {...props}>
      <Route path={`${match.url}/deafult`} component={Home} />
    </Theme>
  );
}
const RouterConfig = ({ history }: any) => (
  <ConfigProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <Route path="/menu" component={MenuCom} />
        <Redirect path="/" to="/menu/deafult" />
      </Switch>
    </Router>
  </ConfigProvider>
);

export default RouterConfig;
