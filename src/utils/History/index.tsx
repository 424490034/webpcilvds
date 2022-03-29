function bindError(str: any) {
  console.log(str);
  console.warn('主应用路由绑定错误,请排查!');
}

class Actions {
  push = bindError;
  block = bindError;
  createHref = bindError;
  go = bindError;
  goBack = bindError;
  history: any = bindError;
  setHistory(data: any) {
    this.goBack = data.back;
    this.go = data.go;
    this.block = data.block;
    this.createHref = data.createHref;
    this.push = data.push;
  }
}

const actions = new Actions();
export default actions;
