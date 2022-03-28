import _ from 'lodash';
import { STEPSENUM } from './config/config';
import {Model} from 'xl-study-com'
import pageConfig from './config/pageConfig';
// 项目配置表单
import {
  formConditions, formNames,
  initShowConfig,allShowConfig
} from './config/formFields';
// 定制化指令表单
import {
  threeFormNames,
  threeFormConditions,
  extraEnum
} from './config/threeFormFields';
// 定制化额外配置表单
import customFormFields from './config/CustomConfig'
// 第三步表格表头
import { tableList } from './config/threetablefields';
const {namespace,listenRouter,} = pageConfig
const initState = {
  stepsEnum: STEPSENUM,
  formConditions,formNames,
  initShowConfig, allShowConfig,
  threeFormNames,
  threeFormConditions,
  customFormFields,
  tableList,
  extraEnum
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
