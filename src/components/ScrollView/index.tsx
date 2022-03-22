import { debounce } from 'lodash';
import React from 'react';
interface IProps {
  data: any[]; // 需要展示的data列表数据
  component: any; // jsx元素
  scrolltolower: any; // 滚动到底部触发函数;
  scroll: any; // 滚动时触发函数
}
interface IState {
  list: any[]; // 内部接收并转换的list
}
/**
 * @file 虚拟列表
 */
export default class ScrollViewComponent extends React.Component<
  IProps,
  IState
> {
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
    if (scrollHeight === scrollTop + offsetHeight) {
      /* 到达容器底部位置 */
      scrolltolower && scrolltolower();
    }
  }
  node: any = null;

  /* ---——---生命周期------- */
  constructor(props: IProps) {
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
  static getDerivedStateFromProps(newProps: IProps) {
    const { data } = newProps;
    return {
      list: data || [],
    };
  }
  /* 性能优化，只有列表数据变化，渲染列表 */
  shouldComponentUpdate(newProps: IProps, newState: IState) {
    return newState.list !== this.state.list;
  }
  /* 获取更新前容器高度 */
  getSnapshotBeforeUpdate() {
    return this.node.scrollHeight;
  }
  /* 获取更新后容器高度 */
  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {
    console.log('scrollView容器高度变化:', this.node.scrollHeight - snapshot);
  }
  /* 绑定事件监听器 - 监听scorll事件 */
  componentDidMount() {
    this.node.addEventListener('scroll', this.handerScroll);
  }
  /* 解绑事件监听器 */
  componentWillUnmount() {
    this.node.removeEventListener('scroll', this.handerScroll);
  }
  render() {
    const { list } = this.state;
    const { component } = this.props;
    return (
      <div className="list_box" ref={(node) => (this.node = node)}>
        <div>
          {list.map(
            (item) => React.createElement(component, { item, key: item.id }) //渲染 Item 列表内容。
          )}
        </div>
      </div>
    );
  }
}
