import _ from 'lodash';
import {Model} from 'xl-study-com'
import pageConfig from './config/pageConfig';
import ToolFormFields from './config/ToolsFormFields';
import { cursorList } from './config/cursorConfig';
const {namespace,listenRouter,} = pageConfig
const initState = {
  ToolFormFields,
  cursorList,
}

export default Model.extend({
  namespace: namespace,
  state: _.cloneDeep(initState),
  subscriptions: {
    setup({ dispatch, listen }: any) {
      // 路由监听
      listen(listenRouter, () => {
        dispatch({
          type: 'updateState',
          payload: {
            ..._.cloneDeep(initState),
            isProject:undefined
          }
        })
        // dispatch({type:''})
      });
    }
  },
  effects: {
    * fetchSpuDetail({ payload }: any, { update, call, put, select }: any): any {
        const { id } = yield select((_: any) => _[namespace]);
        // const data = yield call(services.fetchSpuDetail, { spuId:id });
        const data = {}
        if (data) {
            yield update({
            userData: data,
            })
        }
        },
  },

    reducers: {
  }
})
