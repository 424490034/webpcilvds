/**
 * @file 键盘key获取组件
 */
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { EmptyCard } from 'components';
import { copyText } from 'utils';
interface IProps {
  models: any;
  actions: any;
  show?: any;
}
let isRegister = false;
export default function index(props: IProps) {
  const { models, actions, show } = props;
  if (show !== 'true') {
    isRegister = false;
    document.onkeydown = null;
    window.historyList = null;
    return <></>;
  }
  const [keyBoard, setKeyBoard] = useState<number>();
  const [historyList, setHistory] = useState<any[]>([]);
  useEffect(() => {
    if (show === 'true' && !isRegister) {
      isRegister = true;
      window.historyList = historyList;
      document.onkeydown = keyDownChange;
    } else {
      if (isRegister) {
        isRegister = false;
        document.onkeydown = null;
        window.historyList = null;
      }
    }
  }, [show]);
  function keyDownChange(event: any) {
    let key = event || window.event || arguments.callee.caller.arguments[0];
    let value = key.keyCode;
    setKeyBoard(key.keyCode);
    addHistory(key.key, value);
  }
  function addHistory(label: string, value: number) {
    if (window.historyList.length > 0) {
      let isEmptyHave =
        window.historyList.filter((item: any) => item.label === label)
          .length === 0;
      if (isEmptyHave) {
        let data = [
          ...window.historyList,
          {
            label,
            value,
          },
        ];
        setHistory(data);
        window.historyList = data;
      }
    } else {
      let data = [
        {
          label,
          value,
        },
      ];
      setHistory(data);
      window.historyList = data;
    }
  }
  return (
    <div className={styles.key_board_div}>
      <div className={styles.left_key_div}>{keyBoard || '-'}</div>
      <div className={styles.right_key_div}>
        <div className={styles.title_right_div}>历史按键</div>
        <div
          className={styles.card_body_div}
          style={{
            height: 'calc(100% - 40px)',
          }}
        >
          {historyList.length > 0 ? (
            historyList.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    copyText(item.value);
                  }}
                  className={styles.card_key_div}
                >
                  <div className={styles.card_key_title_div}>{item.value}</div>
                  <div className={styles.card_key_name_div}>{item.label}</div>
                </div>
              );
            })
          ) : (
            <EmptyCard title="暂无键盘历史数据" />
          )}
        </div>
      </div>
    </div>
  );
}
