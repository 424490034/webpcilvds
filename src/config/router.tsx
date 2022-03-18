import { FundViewOutlined } from '@ant-design/icons';
import React from 'react';
import Layout from 'layouts';
import Home from 'page/Home';
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
    path: '/menu/web-qt',
    name: '其他项目',
  },
];
export default [
  {
    name: '首页',
    icon: <FundViewOutlined />,
    layout: Layout,
    children: [
      {
        name: '基础页',
        route: '/menu/home',
        component: Home,
        // display: false,
      },
    ],
  },
  //   {
  //     redirect: '/',
  //     to: '/menu/home',
  //   },
];
