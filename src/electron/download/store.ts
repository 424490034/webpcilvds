// store存储
import Store from 'electron-store'
// store的字段数据以及store的默认值

const schema = {
  foo: {
    type: 'string',
    default: 'This is a test default string'
  }
} as const

const store = new Store({
  schema,
  // 每当升级版本时，都可以使用migrations对store执行回调操作
  migrations: {
    '0.0.2': store => {
      store.set('foo', 'package change string change too')
    }
  },
})


export default store
