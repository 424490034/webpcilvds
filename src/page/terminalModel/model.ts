import { message } from 'antd';
import _, { cloneDeep } from 'lodash';
import {Model} from 'xl-study-com'
import {  GetOrderList } from 'utils';
import pageConfig from './config/pageConfig';
import { windowHave } from './unit/ipc';
const { namespace, listenRouter } = pageConfig;
const initState = {
  id: undefined, // 编辑或查看对应id
  userData: {}, // 用户详情
  isDetailLoading: true, // 默认数据请求状态
  isSysBtn: false, // 全局配置栏
  // electron 模板生成器定制化参数
  terminalList: [], // 终端需要执行的id集合
  electronConfig: {
    status: 'closeWindow', // 当前状态值
  },
};

export default Model.extend({
  namespace: namespace,
  state: _.cloneDeep(initState),
  subscriptions: {
    setup({ dispatch, listen }: any) {
      // 新建路由监听
      listen(listenRouter, () => {
        dispatch({
          type: 'updateState',
          payload: {
            ..._.cloneDeep(initState),
            isDetailLoading: false,
          },
        });
        dispatch({ type: 'feathCatergoey' });
      });
    },
  },
  effects: {
    *fetchAddTerminal(
      { payload }: any,
      { update, call, put, select }: any
    ): any {
      const orderList = GetOrderList();
      const { terminalList } = yield select((_: any) => _[namespace]);
      const { orderId, status, initOrderKey } = payload;
      if (Array.isArray(terminalList) && terminalList.length > 0) {
        let isHave = terminalList.filter((item) => item.id === orderId);
        if (isHave.length > 0) {
          // 已存在id
          if (initOrderKey) {
            // 如果存在指定指令
            let newTerminalList = terminalList.map((item: any) => {
              if (item.id === orderId) {
                return {
                  ...item,
                  initOrderKey,
                };
              } else {
                return item;
              }
            });
            yield update({
              terminalList: newTerminalList,
            });
          }
          // 不做处理
        } else {
          // 不存在id需要进行添加
          let data = orderList.filter((item) => item.id === orderId);
          let newList = [];
          if (initOrderKey) {
            newList = [
              ...terminalList,
              {
                ...data[0],
                initOrderKey,
              },
            ];
          } else {
            newList = [
              ...terminalList,
              {
                ...data[0],
              },
            ];
          }
          if (data.length > 0) {
            yield update({
              terminalList: newList,
              electronConfig: {
                status, // 当前状态值
              },
            });
            yield put('sendToOrderWindow');
          } else {
            message.error('未查询到对应指令数据,请排查');
          }
        }
      } else {
        // 不存在已有终端需要进行添加
        let data = orderList.filter((item) => item.id === orderId);
        let newList = [];
        if (initOrderKey) {
          newList = [
            {
              ...data[0],
              initOrderKey,
            },
          ];
        } else {
          newList = [
            {
              ...data[0],
            },
          ];
        }
        if (data.length > 0) {
          yield update({
            terminalList: newList,
            electronConfig: {
              status, // 当前状态值
            },
          });
          yield put('sendToOrderWindow');
        } else {
          message.error('未查询到对应指令数据,请排查');
        }
      }
    },
    *fetchRemoveOrder(
      { payload, callback }: any,
      { update, call, put, select }: any
    ): any {
      const { terminalList } = yield select((_: any) => _[namespace]);
      const { delId } = payload;
      const newData = terminalList.filter((item: any) => item.id !== delId);
      console.log(newData);
      yield update({
        terminalList: newData,
      });
      yield put('sendToOrderWindow');
    },
    // 通知主渲染窗口
    *sendToOrderWindow(
      { payload }: any,
      { update, call, put, select }: any
    ): any {
      const { terminalList } = yield select((_: any) => _[namespace]);
      if (terminalList.length > 0) {
        const ids = terminalList.map((item: any) => item.id);
        windowHave(ids);
      } else {
        windowHave([]);
      }
    },
    // 通知主渲染窗口指令窗口已关闭
    *sendToMainClose(
      { payload }: any,
      { update, call, put, select }: any
    ): any {
      yield update({
        status: 'closeWindow',
        terminalList: [],
      });
      yield put('sendToOrderWindow');
    },
  },

  reducers: {
    // 退出时默认清空指令
    clearOrderList(state: any, { payload }: any): void {
      return {
        ...state,
        electronConfig: {
          status: 'closeWindow', // 当前状态值
        },
        terminalList: [],
      };
    },
    // 是否展开操作栏
    editSysBtnFunc(state: any, { payload }: any): void {
      return {
        ...state,
        ...payload,
        isSysBtn: payload.isSysBtn,
      };
    },
    // electron定制化
    editElectronConfig(state: any, { payload }: any): void {
      let newState = cloneDeep(initState);
      const { status, terminalList } = payload;
      const electronConfig = {
        status,
      };
      return {
        ...state,
        ...newState,
        electronConfig,
        terminalList,
      };
    },
  },
});
