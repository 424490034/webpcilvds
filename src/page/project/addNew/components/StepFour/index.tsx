/**
 * @file 添加成功页
 */
import React from 'react';
import { Button, message, Result } from 'antd';
import router from 'utils/History';
export default function index(props: any) {
  const { twoData } = props;
  function toHome() {
    router.push('/menu/home');
  }
  function toList() {
    switch (twoData.type) {
      case '1':
        router.push('/menu/web-pc');
        break;
      case '2':
        router.push('/menu/web-mobile');
        break;
      case '3':
        router.push('/menu/web-serve');
        break;
      case '4':
        router.push('/menu/web-rest');
        break;
      case '5':
        router.push('/menu/web-rest');
        break;
      default:
        message.error('数据丢失,请排查!');
        break;
    }
  }
  return (
    <Result
      status="success"
      title={
        twoData.name ? `完成${twoData.name}项目添加!` : '完成自定义项目添加!'
      }
      subTitle="项目已添加管理,请在首页或列表页进行启动或其他操作"
      extra={[
        <Button type="primary" key="console" onClick={toHome}>
          返回首页
        </Button>,
        <Button key="buy" type="primary" onClick={toList}>
          前往列表页
        </Button>,
      ]}
    />
  );
}
