import { pathToRegexp } from 'path-to-regexp';
import { message as Message, Modal } from 'antd';
import { getEffect, pick } from './dva';

const AWLAYS_RESET_KEYS = ['visible', 'spinning', 'loading', 'confirmLoading'];
export const REMAIN_CORE_STATE = '$$reset_part_state';

const createNestedValueReducer =
  (parentKey, originValue, withExtra) =>
  (state, { payload = {} }) => {
    const key = payload.key;
    let parentState = state[parentKey];
    let value = originValue;

    // 扩展数据
    if (withExtra) {
      value = Object.assign(Boolean(originValue), payload.extra);
    }

    if (key) {
      parentState = typeof parentState === 'boolean' ? {} : parentState;
      parentState = { ...parentState, [key]: value };
    } else {
      parentState = value;
    }

    return {
      ...state,
      [parentKey]: parentState,
    };
  };

const createNestedRecuder =
  (parentKey) =>
  (state, { payload }) => {
    let parentState = state[parentKey];
    parentState = typeof parentState === 'boolean' ? {} : parentState;

    return {
      ...state,
      [parentKey]: {
        ...parentState,
        payload,
      },
    };
  };

const getDefaultModel = () => {
  return {
    state: {
      visible: false,
      spinning: false,
      loading: false,
      confirmLoading: false,
    },
    subscriptions: {},
    effects: {},
    reducers: {
      showLoading: createNestedValueReducer('loading', true),
      hideLoading: createNestedValueReducer('loading', false),
      showConfirmLoading: createNestedValueReducer(
        'confirmLoading',
        true,
        true
      ),
      hideConfirmLoading: createNestedValueReducer(
        'confirmLoading',
        false,
        true
      ),
      showSpinning: createNestedValueReducer('spinning', true),
      hideSpinning: createNestedValueReducer('spinning', false),
      updateLoading: createNestedRecuder('loading'),
      updateSpinner: createNestedRecuder('spinning'),
      updateConfirmLoading: createNestedRecuder('confirmLoading'),
      updateState(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
    },
  };
};

/**
 * 扩展subscription函数的参数,支持listen方法，方便监听path改变
 *
 * listen函数参数如下:
 * pathReg 需要监听的pathname
 * action 匹配path后的回调函数，action即可以是redux的action,也可以是回调函数
 * listen函数同时也支持对多个path的监听，参数为{ pathReg: action, ...} 格式的对象
 *
 * 示例:
 * subscription({ dispath, history, listen }) {
 *  listen('/user/list', { type: 'fetchUsers'});
 *  listen('/user/query', ({ query, params }) => {
 *    dispatch({
 *      type: 'fetchUsers',
 *      payload: params
 *    })
 *  });
 *  listen({
 *    '/user/list': ({ query, params }) => {},
 *    '/user/query': ({ query, params }) => {},
 *  });
 * }
 */
const enhanceSubscriptions = (subscriptions = {}) => {
  return Object.keys(subscriptions).reduce((wrappedSubscriptions, key) => {
    wrappedSubscriptions[key] = createWrappedSubscriber(subscriptions[key]);
    return wrappedSubscriptions;
  }, {});

  function createWrappedSubscriber(subscriber) {
    return (props) => {
      const { dispatch, history } = props;

      const listen = (pathReg, action) => {
        let listeners = {};
        if (typeof pathReg === 'object') {
          listeners = pathReg;
        } else {
          listeners[pathReg] = action;
        }

        history.listen((location) => {
          const { hash } = window.location;
          let pathname = hash.slice(1);
          Object.keys(listeners).forEach((key) => {
            const _pathReg = key;
            const _action = listeners[key];
            const match = pathToRegexp(_pathReg).exec(pathname);
            if (match) {
              if (typeof _action === 'object') {
                dispatch(_action);
              } else if (typeof _action === 'function') {
                _action({ ...location, params: match.slice(1) });
              }
            }
          });
        });
      };

      subscriber({ ...props, listen });
    };
  }
};

/**
 * 扩展effect函数中的sagaEffects参数
 * 支持:
 *  put 扩展put方法，支持双参数模式: put(type, payload)
 *  update 扩展自put方法，方便直接更新state数据，update({ item: item});
 *  callWithLoading,
 *  callWithConfirmLoading,
 *  callWithSpinning,
 *  callWithMessage,
 *  callWithExtra
 *  以上函数都支持第三个参数,message = { successMsg, errorMsg }
 */
const enhanceEffects = (effects = {}, namespace) => {
  const wrappedEffects = {};
  Object.keys(effects).forEach((key) => {
    wrappedEffects[key] = function* (action, sagaEffects) {
      const extraSagaEffects = {
        ...sagaEffects,
        put: createPutEffect(sagaEffects),
        update: createUpdateEffect(sagaEffects),
        callWithLoading: createExtraCall(sagaEffects, { loading: true }),
        callWithConfirmLoading: createExtraCall(sagaEffects, {
          confirmLoading: true,
        }),
        callWithSpinning: createExtraCall(sagaEffects, { spinning: true }),
        callWithMessage: createExtraCall(sagaEffects),
        callWithExtra: (serviceFn, args, config) => {
          createExtraCall(sagaEffects, config)(serviceFn, args, config);
        },
      };

      yield effects[key](action, extraSagaEffects);
    };
  });

  return wrappedEffects;

  function createPutEffect(sagaEffects) {
    const { put, call } = sagaEffects;

    function* putEffect(type, payload) {
      let action = { type, payload };
      if (arguments.length === 1 && typeof type === 'object') {
        action = arguments[0];
      }
      yield put(action);
    }

    function* putSyncEffect(action) {
      const { type } = action;
      const effectFn = getEffect(type, namespace);
      yield call(effectFn, action, sagaEffects);
    }

    putEffect.sync = putSyncEffect;

    return putEffect;
  }

  function createUpdateEffect(sagaEffects) {
    const { put } = sagaEffects;
    return function* updateEffect(payload) {
      yield put({ type: 'updateState', payload });
    };
  }

  function createExtraCall(sagaEffects, config = {}) {
    const { put, call } = sagaEffects;
    return function* extraCallEffect(serviceFn, args, message = {}) {
      let result;
      const { loading, confirmLoading, spinning } = config;
      const { successMsg, errorMsg, key } = message;
      let done = true;

      if (loading) {
        yield put({ type: 'showLoading', payload: { key } });
      }
      if (confirmLoading) {
        yield put({ type: 'showConfirmLoading', payload: { key } });
      }
      if (spinning) {
        yield put({ type: 'showSpinning', payload: { key } });
      }

      try {
        result = yield call(serviceFn, args);
        successMsg && Message.success(successMsg);
      } catch (e) {
        done = false;
        e && e.message && Message.error(e.message);
        // throw e;
      } finally {
        if (loading) {
          yield put({ type: 'hideLoading', payload: { key, extra: { done } } });
        }
        if (confirmLoading) {
          yield put({
            type: 'hideConfirmLoading',
            payload: { key, extra: { done } },
          });
        }
        if (spinning) {
          yield put({
            type: 'hideSpinning',
            payload: { key, extra: { done } },
          });
        }
      }
      return result;
    };
  }
};

/**
 * 模型继承方法
 *
 * 如果参数只有一个，则继承默认model
 * @param defaults
 * @param properties
 */
function extend(defaults, properties?) {
  if (!properties) {
    properties = defaults;
    defaults = null;
  }

  const model = defaults || getDefaultModel();
  const modelAssignKeys = ['state', 'subscriptions', 'effects', 'reducers'];
  const { namespace } = properties;

  modelAssignKeys.forEach((key) => {
    if (key === 'subscriptions') {
      properties[key] = enhanceSubscriptions(properties[key]);
    }
    if (key === 'effects') {
      properties[key] = enhanceEffects(properties[key], namespace);
    }
    Object.assign(model[key], properties[key]);
  });

  const initialState = {
    ...model.state,
  };

  Object.assign(model.reducers, {
    /* 如果传入force为true，则重置所有state
     * 如果传入keys, 则重置指定keys以及状态类(confirm,spinning等)state
     * 如果既未设置force，也未设置keys, 则根据localStorage中RESET_PART_STATE的值来决定部分重置还是全量重置
     */
    resetState(state, { payload = {} }) {
      let { force, keys } = payload;
      let nextState = { ...initialState };
      let resetAllState = localStorage.getItem(REMAIN_CORE_STATE) !== 'true';

      if (force) {
        resetAllState = true;
      } else if (keys) {
        resetAllState = false;
      }

      if (!resetAllState) {
        keys = keys || [];
        const resetKeys = keys.concat(AWLAYS_RESET_KEYS);
        const needResetState = pick(initialState, resetKeys);
        nextState = { ...state, ...needResetState };
      }

      localStorage.setItem(REMAIN_CORE_STATE, false);
      return nextState;
    },
  });

  return Object.assign(model, { namespace });
}

function create(model, state) {
  return {
    ...state,
    ...model,
  };
}
export default {
  extend,
  create,
};
