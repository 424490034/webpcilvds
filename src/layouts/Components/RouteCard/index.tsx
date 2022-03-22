import { debounce, isEqual } from 'lodash';
import React from 'react';
import BasicsCard from './Basics';
/**
 * @file 左侧快捷路由卡片
 */
class ScrollView extends React.Component<any, any> {
  /* -----自定义事件---- */
  /* 控制滚动条滚动 */
  handerScroll = (e: any) => {
    const { scroll } = this.props;
    scroll && scroll(e);
    this.handerScrolltolower();
  };
  /* 判断滚动条是否到底部 */
  handerScrolltolower() {
    const { scrolltolower } = this.props;
    const { scrollHeight, scrollTop, offsetHeight } = this.node;
    this.setState({
      scrollTop,
    });
    if (scrollHeight === scrollTop + offsetHeight) {
      /* 到达容器底部位置 */
      scrolltolower && scrolltolower();
    }
  }
  node: any = null;

  /* ---——---生命周期------- */
  constructor(props: any) {
    super(props);
    this.state = {
      /* 初始化 Data */ list: [],
    };
    this.handerScrolltolower = debounce(
      this.handerScrolltolower,
      200
    ); /* 防抖处理 */
  }
  /* 接收props, 合并到state */
  static getDerivedStateFromProps(newProps: any) {
    const { data } = newProps;
    return {
      list: data || [],
    };
  }
  /* 性能优化，只有列表数据变化，渲染列表 */
  shouldComponentUpdate(newProps: any, newState: any) {
    // if (newState.scrollTop !== this.state.scrollTop) {
    return true;
    // } else {
    // return newState.list !== this.state.list;
    // }
  }
  /* 获取更新前容器高度 */
  getSnapshotBeforeUpdate() {
    return this.node.scrollHeight;
  }
  /* 获取更新后容器高度 */
  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    //   console.log(
    //     'scrollView容器高度变化:',
    //     this.node.scrollHeight - snapshot,
    //   );
  }
  /* 绑定事件监听器 - 监听scorll事件 */
  componentDidMount() {
    this.node.removeEventListener('scroll', this.handerScroll);
    this.node.addEventListener('scroll', this.handerScroll);
  }
  /* 解绑事件监听器 */
  componentWillUnmount() {
    this.node.removeEventListener('scroll', this.handerScroll);
  }
  render() {
    const { list, scrollTop } = this.state;
    return (
      <div
        style={{
          flex: 1,
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
        className="list_box"
        ref={(node) => (this.node = node)}
      >
        <div>
          {list.map(
            (item: any, index: number) =>
              React.createElement(BasicsCard, {
                ...item,
                key: index,
                scrollTop,
                index,
              }) //渲染 Item 列表内容。
          )}
        </div>
      </div>
    );
  }
}

export default ScrollView;
