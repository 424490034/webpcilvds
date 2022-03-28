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
// web-serve
import WebServe from 'page/web/serve';
// web-resr
import WebRest from 'page/web/rest';
// Toots-工具栏
import WebTools from 'page/web/Tools';
// 新增项目页
import AddNewProject from 'page/project/addNew';
// 添加已有项目
import AddHaveProject from 'page/project/haveOld';
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
        name: 'web-服务端',
        icon: <SnippetsOutlined />,
        route: '/menu/web-serve',
        component: WebServe,
      },
      {
        name: 'web-其他',
        icon: <SnippetsOutlined />,
        route: '/menu/web-rest',
        component: WebRest,
      },
      {
        name: '工具库',
        icon: <ToolOutlined />,
        route: '/menu/web-tools',
        component: WebTools,
      },
      {
        name: '添加项目',
        route: '/menu/addProjetc',
        component: AddNewProject,
        display: true,
      },
      {
        name: '添加已有项目',
        route: '/menu/addHaveProject',
        component: AddHaveProject,
        display: true,
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
