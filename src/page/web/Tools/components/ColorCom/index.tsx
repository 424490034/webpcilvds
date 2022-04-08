/**
 * @file 颜色转换组件
 */
import React, { useState } from 'react';
import styles from './index.module.scss';
import { FormBasics } from 'xl-study-com';
import { Button, Form } from 'antd';
import { copyText } from 'utils';
interface IProps {
  models: any;
  actions: any;
  show?: any;
}
export default function index(props: IProps) {
  const {
    models: { ToolFormFields = {} },
    actions,
    show,
  } = props;
  if (show !== 'true') {
    return <></>;
  }
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const { colorForm: { code = [], rgb = [] } = {} } = ToolFormFields;
  const [rgbResult, setResult] = useState<any>();
  const [codeResult, setCodeResult] = useState<any>();
  let rgbFromProps = {
    form: form,
  };
  let rgbItemProps = {
    form: form,
    queryCondition: rgb,
  };
  let codeFromProps = {
    form: form2,
  };
  let codeItemProps = {
    form: form2,
    queryCondition: code,
  };
  function formatRgb() {
    form2
      .validateFields()
      .then((values: any) => {
        console.log(values);
        let data = hexToRgb(values.r);
        console.log(data);
        setResult(`rgb(${data.r},${data.g},${data.b})`);
      })
      .catch(() => {});
  }
  function formatCode() {
    form
      .validateFields()
      .then((values: any) => {
        try {
          let data = rgbaToHex(`rgba(${values.r}, ${values.g}, ${values.b})`);
          setCodeResult(data.color);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(() => {});
  }
  function hexToRgb(hex: string) {
    /*
      hex: {String}, "#333", "#AF0382"
    */
    hex = hex.slice(1);
    if (hex.length == 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
    };
  }
  // rgba转十六进制 rgba(100, 200, 80, 0.7)
  function rgbaToHex(rgba: string) {
    rgba = rgba.replace(/\s+/g, ''); // 先剪除字符中的空格，避免写正则时加入过多的\s*; 但是r  g  b(10, 2  0, 30) 也会判定为正确的表示颜色字符串。实际使用中也不会出现这种。
    let pattern = /^rgba?\((\d+),(\d+),(\d+),?(\d*\.\d+)?\)$/,
      result = pattern.exec(rgba);
    if (!result) {
      throw new Error(`传入的${rgba}格式不正确`);
    }
    /* r:result[1], g:result[2], b:result[3], a: result[4] */
    let colors = [];
    for (var i = 1, len = 3; i <= len; ++i) {
      let str = Number(result[i]).toString(16);
      if (str.length == 1) {
        str = 0 + str;
      }
      colors.push(str);
    }
    return {
      color: '#' + colors.join(''),
      opacity: result[4] ? result[4] : '1',
    };
  }

  return (
    <div className={styles.color_board_div}>
      <div className={styles.left_color_div}>
        <div className={styles.title_left_div}>rgb转十六进制</div>
        <div className={styles.color_input_div}>
          <FormBasics fromProps={rgbFromProps} itemProps={rgbItemProps} />
        </div>
        <div className={styles.result_div}>
          <div>
            <Button type="primary" onClick={formatCode}>
              转换
            </Button>
          </div>
          {codeResult && (
            <div
              className={styles.result_color_div}
              onClick={() => {
                copyText(codeResult);
              }}
            >
              <a>{codeResult}</a>
              <span
                className={styles.bgc_span}
                style={{
                  background: codeResult,
                }}
              ></span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.right_color_div}>
        <div className={styles.title_right_div}>十六进制转rgb</div>
        <div className={styles.color_input_div}>
          <FormBasics fromProps={codeFromProps} itemProps={codeItemProps} />
        </div>
        <div className={styles.result_div}>
          <Button type="primary" onClick={formatRgb}>
            转换
          </Button>
        </div>
        {rgbResult && (
          <div
            className={styles.result_color_div}
            onClick={() => {
              copyText(rgbResult);
            }}
          >
            <a>{rgbResult}</a>
            <span
              className={styles.bgc_span}
              style={{
                background: rgbResult,
              }}
            ></span>
          </div>
        )}
      </div>
    </div>
  );
}
