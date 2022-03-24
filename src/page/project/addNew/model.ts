import _ from 'lodash';
import { STEPSENUM } from './config/config';
import { Model } from 'utils'
import pageConfig from './config/pageConfig';
// 项目配置表单
import {
  formConditions, formNames,
  initShowConfig,allShowConfig
  
} from './config/formFields';
const {namespace,listenRouter,} = pageConfig
const initState = {
  stepsEnum: STEPSENUM,
  formConditions,formNames,
  initShowConfig,allShowConfig
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
