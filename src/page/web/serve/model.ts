import _ from 'lodash';
import { getProjectData } from 'utils';
import {Model} from 'xl-study-com'
import pageConfig from './config/pageConfig';
const {namespace,listenRouter,} = pageConfig
const initState = {
projetData: {},
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
        dispatch({type:'fetchProjectDetail'})
      });
    }
  },
  effects: {
    * fetchProjectDetail({ payload }: any, { update, call, put, select }: any): any {
      const data:any = getProjectData() || [];
      
        if (data) {
            yield update({
            projetData: data.filter((item:any) =>(item.projectData&&item.projectData.type === '3')),
            })
        }
        },
  },

    reducers: {
  }
})
