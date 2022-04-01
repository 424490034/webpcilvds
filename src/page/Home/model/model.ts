import _ from 'lodash';
import moment from 'moment'
import { getProjectData,getTypeProjectNum,getBatchRunsOrders } from 'utils'
import getSysInfo from 'utils/System';
import pageConfig from '../config/pageConfig';
import { batchFormConditions } from '../config/batchFormFields'
import {Model} from 'xl-study-com'
const {namespace,listenRouter,} = pageConfig
const initState = {
  sysInfo: {},
  projectNums: {},
  historyProjectOrders: [], // 历史
  projectData: [], // 所有已配置的项目数据
  batchFormConditions, // 批量执行表单数据
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
          projectNums: getTypeProjectNum(),
          historyProjectOrders: getBatchRunsOrders(),
          projectData: getProjectData(),
        })
    },
    *reloadProject({ payload }: any, { update, call, put, select }: any): any { 
      yield update({
        historyProjectOrders: getBatchRunsOrders(),
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
