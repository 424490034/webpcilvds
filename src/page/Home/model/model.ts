import _ from 'lodash';
import moment from 'moment'
import { getTypeProjectNum } from 'utils'
import getSysInfo from 'utils/System';
import pageConfig from '../config/pageConfig';
import {Model} from 'xl-study-com'
const {namespace,listenRouter,} = pageConfig
const initState = {
  sysInfo: {},
  projectNums:{}
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
          }
        })
        dispatch({type:'init'})
      });
    }
  },
  effects: {
      *init({ payload }: any, { update, call, put, select }: any): any { 
        yield update({
          sysInfo:getSysInfo(),
          projectNums: getTypeProjectNum()
        })
      },
      *reloadSystem({ payload }: any, { update, call, put, select }: any): any { 
        yield update({
          sysInfo:getSysInfo()
        })
      },
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
