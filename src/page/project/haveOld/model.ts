import _ from 'lodash';
import {Model} from 'xl-study-com'
import pageConfig from './config/pageConfig';
import { STEPSENUM, INITENUM } from './config/config';
// 自定义指令配置表单
import {
  customFormNames,
  customFormConditions
} from './config/customFormFields';
// 项目配置表单
import {
  formConditions, formNames,
} from './config/formFields';
//  第三步表单 复用新增项目
import {
  threeFormNames,
  threeFormConditions,
  extraEnum
} from 'page/project/addNew/config/threeFormFields';
import customFormFields from 'page/project/addNew/config/CustomConfig';
// 第三步表格表头
import { tableList } from 'page/project/addNew/config/threetablefields';
const {namespace,listenRouter,} = pageConfig
const initState = {
  stepsEnum: STEPSENUM,
  customFormNames, // 自定义表单集合key
  customFormConditions, // 自定义表单
  formConditions, // 配置表单
  formNames, // 表单key结合
  threeFormNames, // 第三步表单名集合
  threeFormConditions, // 第三步表单集合
  extraEnum, // 枚举
  customFormFields, // 自定义表单
  tableList, // 第三步表头
  INITENUM, // 自定义执行
  isProject:undefined,// 1自定义指令 2是前端项目
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
    *setProject({ payload }: any, { update, call, put, select }: any): any { 
      yield update({
        isProject:payload.isProject
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
