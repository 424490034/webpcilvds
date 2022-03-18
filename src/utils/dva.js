// 缓存dva app对象
export function store(dvaApp) {
  return (window.$$dvaApp = dvaApp);
}

// 获取对应的effect函数
export function getEffect(effectName, curNamespace) {
  const targetNamespace = effectName.includes('/') ? effectName.split('/')[0] : curNamespace;
  const targetEffectName = effectName.includes('/') ? effectName : `${curNamespace}/${effectName}`;
  const targetModel = window.$$dvaApp._models.find(({ namespace }) => namespace === targetNamespace);
  return targetModel.effects[targetEffectName];
}

export function pick(_fieldKeys) {
  _fieldKeys = [].concat(_fieldKeys);
  let columns = _fieldKeys.map((_fieldKey) => {
    let column = columns.find((item) => _fieldKey === item.title);
    return column;
  });
  return {};
}
