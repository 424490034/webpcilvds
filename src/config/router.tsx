import {
  FundViewOutlined,
  SnippetsOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import React from 'react';
import Layout from 'layouts';
// 首页
import Home from 'page/Home';
// web-pc
import WebPc from 'page/web/pc';
// web-mobile
import WebMobile from 'page/web/mobile';
// Toots-工具栏
import WebTools from 'page/web/Tools';
export const btnMenus = [
  // 右侧顶部快捷菜单栏配置
  {
    path: '/menu/home',
    name: '总览',
  },
  {
    path: '/menu/web-pc',
    name: 'web-PC端',
  },
  {
    path: '/menu/web-mobile',
    name: 'web-移动端',
  },
  {
    path: '/menu/web-tools',
    name: '前端工具',
  },
];
const routes = [
  {
    name: '首页',
    icon: <FundViewOutlined />,
    layout: Layout,
    children: [
      {
        name: '总览',
        route: '/menu/home',
        icon: <FundViewOutlined />,
        component: Home,
        // display: false,
      },
      {
        name: 'web-PC端',
        icon: <SnippetsOutlined />,
        route: '/menu/web-pc',
        component: WebPc,
      },
      {
        name: 'web-移动端',
        icon: <SnippetsOutlined />,
        route: '/menu/web-mobile',
        component: WebMobile,
      },
      {
        name: '工具库',
        icon: <ToolOutlined />,
        route: '/menu/web-tools',
        component: WebTools,
      },
    ],
  },
  //   {
  //     redirect: '/',
  //     to: '/menu/home',
  //   },
];
export default routes;
function formatPaths(ary: any[]) {
  let results: any[] = [];
  function addPath(data: any[]) {
    if (Array.isArray(data) && data.length > 0) {
      data.map((item: any, index: number) => {
        if (item.children) {
          addPath(item.children);
        }
        if (item.route && !item.display) {
          results.push(item);
        }
      });
    }
  }
  addPath(ary);
  return results;
}
export const routePaths = formatPaths(routes);
