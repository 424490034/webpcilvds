import { globalMessage } from 'utils';
import iconImg from 'assets/kl.ico';

class OutPutOrder {
  domDiv: any = null;
  callback: any = null;
  constructor(props: any) {
    const { selete, callback } = props;
    this.domDiv = selete;
    this.callback = callback;
  }
  toMessage = (code: string) => {
    if (code) {
      if (code.indexOf('子进程退出') !== -1) {
        if (code.indexOf('运行成功')) {
          globalMessage('仓库拉取执行成功', code, iconImg, () => {});
          if (this.callback) {
            this.callback(false);
          }
        } else {
          globalMessage('仓库拉取执行失败', code, iconImg, () => {});
          if (this.callback) {
            this.callback(true);
          }
        }
      }
    }
  };
  outputStr = (data: any, child: any, isClose: boolean = false) => {
    if (isClose) {
      this.addStr(data);
      this.toMessage(data);
    } else {
      // 默认更新
      this.addStr('\n' + data);
    }
  };
  addStr = (dataStr: string) => {
    if (dataStr.toLocaleUpperCase().indexOf('WARNING') !== -1) {
      this.updateOut({
        isWarning: true,
        isError: false,
        str: dataStr,
      });
    } else if (dataStr.toLocaleUpperCase().indexOf('ERROR') !== -1) {
      this.updateOut({
        isWarning: false,
        isError: true,
        str: dataStr,
      });
    } else {
      this.updateOut({
        isWarning: false,
        isError: false,
        str: dataStr,
      });
    }
  };
  clearOut = () => {
    let divDom: any = document.querySelector(this.domDiv);
    if (!divDom) {
      return;
    }
    divDom.innerHTML = undefined;
  };
  updateOut = (data: any) => {
    let divDom: any = document.querySelector(this.domDiv);
    if (!divDom) {
      return;
    }
    const { isWarning, isError, str } = data;
    let bodyClass = 'terminal_right_body';
    if (isWarning) {
      bodyClass = 'terminal_right_body_warring';
    } else if (isError) {
      bodyClass = 'terminal_right_body_error';
    }
    let spanDom = `
              <div class="${bodyClass}"><pre>${str}</pre></div>
              </div>
            `;
    // 基础div拼装
    var div = document.createElement('div');
    div.innerHTML = spanDom;
    div.className = 'terminal_basics_div';
    divDom?.appendChild(div);
    divDom.scrollTop = divDom?.scrollHeight;
  };
}

export default OutPutOrder;
