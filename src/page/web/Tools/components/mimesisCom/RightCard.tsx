/**
 * @file 右侧编辑层
 */
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { CustomColors } from 'components';
import { Input, Slider } from 'antd';
import classNames from 'classnames';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  prism as Light,
  atomDark as Dark,
} from 'react-syntax-highlighter/dist/esm/styles/prism/';
import { CopyOutlined } from '@ant-design/icons';
import { copyText } from 'utils';
export default function RightCard(props: any) {
  const { select, codeObj, setCodeObj } = props;
  useEffect(() => {
    getCodeStr();
  }, []);

  const [color, setColor] = useState('#cccccc');
  // 大小控制
  const [size, setSize] = useState(300);
  // 圆角控制
  const [radius, setRadius] = useState(50);
  // 远近控制
  const [distance, setDistance] = useState(30);
  // 阴影强度
  const [intensity, setIntensity] = useState(15);
  // 模糊度
  const [blur, setBlur] = useState(60);
  // 形状
  const [shape, setShape] = useState('0');
  // 展示文字
  const [codeString, setCodeString] = useState('');

  // 是否需要进行颜色转换
  const [gradient, setGradient] = useState(false);
  // 文字颜色
  const [textColor, setTextColor] = useState('#f6f5f7');
  useEffect(() => {
    getCodeStr();
  }, [select, color, size, radius, distance, intensity, blur, shape]);
  // 颜色转换
  function getCodeStr() {
    // 开始渐变色
    const firstGradientColor =
      gradient && shape !== '1'
        ? colorLuminance(color, shape === '3' ? 0.07 : -0.1)
        : color;
    // 结束渐变色
    const secondGradientColor =
      gradient && shape !== '1'
        ? colorLuminance(color, shape === '2' ? 0.07 : -0.1)
        : color;
    // 样式拼接
    let angle, positionX, positionY;
    const darkColor = colorLuminance(color, (intensity / 100) * -1);
    const lightColor = colorLuminance(color, intensity / 100);
    switch (select) {
      case 'leftTop':
        positionX = distance;
        positionY = distance;
        angle = 145;
        break;
      case 'rightTop':
        positionX = distance * -1;
        positionY = distance;
        angle = 225;
        break;
      case 'rightBottom':
        positionX = distance * -1;
        positionY = distance * -1;
        angle = 315;
        break;
      case 'leftBottom':
        positionX = distance;
        positionY = distance * -1;
        angle = 45;
        break;
      default:
        positionX = distance;
        positionY = distance;
        angle = 145;
        break;
    }
    const borderRadius = radius === 150 ? '50%' : radius + 'px';
    const background =
      gradient && shape !== '1'
        ? `linear-gradient(${angle}deg, ${firstGradientColor}, ${secondGradientColor})`
        : `${color}`;
    const boxShadowPosition = shape === '1' ? 'inset' : '';
    const firstBoxShadow = `${boxShadowPosition} ${positionX}px ${positionY}px ${blur}px ${darkColor}`;
    const secondBoxShadow = `${boxShadowPosition} ${positionX * -1}px ${
      positionY * -1
    }px ${blur}px ${lightColor}`;
    setCodeString(
      ` border-radius: ${borderRadius};
        background: ${background};
        box-shadow: ${firstBoxShadow},
              ${secondBoxShadow};`
    );
    setCodeObj({
      width: size,
      height: size,
      borderRadius: borderRadius,
      background: background,
      boxShadow: `${firstBoxShadow},
${secondBoxShadow}`,
    });
    // 文件颜色获取
    let newTextColor = getContrast(color);
    setTextColor(newTextColor);
  }

  const onChangeColor = (color: any) => {
    setColor(color.hex);
  };
  function inputChange(e: any) {
    setColor(e.target.value);
  }
  function formatter(value: any) {
    return `${value / 100}px`;
  }
  function formatterPX(value: any) {
    return `${value}px`;
  }
  // 大小选择事件
  function sizeChange(num: number) {
    // 修改大小
    setSize(num);
    // 同步修改
    setDistance(Math.round(num / 10));
    setBlur(Math.round(num / 5));
  }
  // 圆角事件
  function radiosRange(num: number) {
    setRadius(num);
  }
  // 远近控制
  function distanceChange(num: number) {
    setDistance(num);
    setBlur(num * 2);
  }
  // 阴影强度
  function intensityChange(num: number) {
    setIntensity(num);
  }
  // 模糊度
  function blurChange(num: number) {
    setBlur(num);
  }
  // 形状
  function shapeChange(status: any) {
    setShape(status);
    if (status === '2' || status === '3') {
      setGradient(true);
    } else {
      setGradient(false);
    }
  }
  function colorLuminance(hex: any, lum: any) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    let rgb = '#',
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ('00' + c).substr(c.length);
    }

    return rgb;
  }
  /**
   * @function 相反颜色获取
   * @param hex 颜色十六进制
   * @returns
   */
  function getContrast(hex: string) {
    const r = parseInt(hex.substr(1, 2), 16),
      g = parseInt(hex.substr(3, 2), 16),
      b = parseInt(hex.substr(5, 2), 16),
      yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#001f3f' : '#F6F5F7';
  }
  // 判断主题
  function getDark(hex: string) {
    const r = parseInt(hex.substr(1, 2), 16),
      g = parseInt(hex.substr(3, 2), 16),
      b = parseInt(hex.substr(5, 2), 16),
      yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? Dark : Light;
  }
  // icon颜色
  function getIconColor(hex: string) {
    const r = parseInt(hex.substr(1, 2), 16),
      g = parseInt(hex.substr(3, 2), 16),
      b = parseInt(hex.substr(5, 2), 16),
      yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#F6F5F7' : '#001f3f';
  }
  return (
    <div className={styles.right_options_div}>
      <div
        className={styles.right_body_div}
        style={{
          background:
            codeObj && codeObj.background ? codeObj.background : '#cccccc',
          boxShadow:
            codeObj && codeObj.boxShadow ? codeObj.boxShadow : undefined,
        }}
      >
        {/* 颜色选择 */}
        <div className={styles.input_div}>
          <div
            className={styles.title_span}
            style={{
              color: textColor,
            }}
          >
            颜色选择
          </div>
          <div className={styles.body_select_div}>
            <CustomColors
              disableAlpha={true}
              setColor={onChangeColor}
              color={color}
            />
            <span className={styles.color_span}>or</span>
            <Input value={color} onChange={inputChange} style={{ width: 80 }} />
          </div>
        </div>
        {/* 大小控制 */}
        <div className={styles.input_div}>
          <div
            className={styles.title_span}
            style={{
              color: textColor,
            }}
          >
            大小控制
          </div>
          <div className={styles.body_select_div}>
            <Slider
              value={size}
              min={10}
              max={410}
              className={styles.slider_div}
              tipFormatter={formatterPX}
              onChange={sizeChange}
            />
          </div>
        </div>
        {/* 圆角控制 */}
        <div className={styles.input_div}>
          <div
            className={styles.title_span}
            style={{
              color: textColor,
            }}
          >
            圆角控制
          </div>
          <div className={styles.body_select_div}>
            <Slider
              value={radius}
              min={10}
              max={150}
              className={styles.slider_div}
              tipFormatter={formatterPX}
              onChange={radiosRange}
            />
          </div>
        </div>
        {/* 远近控制 */}
        <div className={styles.input_div}>
          <div
            className={styles.title_span}
            style={{
              color: textColor,
            }}
          >
            远近控制
          </div>
          <div className={styles.body_select_div}>
            <Slider
              value={distance}
              min={5}
              max={50}
              className={styles.slider_div}
              tipFormatter={formatterPX}
              onChange={distanceChange}
            />
          </div>
        </div>
        {/* 阴影强度 */}
        <div className={styles.input_div}>
          <div
            className={styles.title_span}
            style={{
              color: textColor,
            }}
          >
            阴影强度
          </div>
          <div className={styles.body_select_div}>
            <Slider
              value={intensity}
              min={1}
              max={60}
              defaultValue={30}
              className={styles.slider_div}
              tipFormatter={formatter}
              onChange={intensityChange}
            />
          </div>
        </div>
        {/* 模糊度 */}
        <div className={styles.input_div}>
          <div
            className={styles.title_span}
            style={{
              color: textColor,
            }}
          >
            模糊度
          </div>
          <div className={styles.body_select_div}>
            <Slider
              value={blur}
              tipFormatter={formatterPX}
              defaultValue={30}
              className={styles.slider_div}
              onChange={blurChange}
            />
          </div>
        </div>
        {/* 形状 */}
        <div className={styles.input_div}>
          <div
            className={styles.title_span}
            style={{
              color: textColor,
            }}
          >
            形状
          </div>
          <div className={styles.body_select_div}>
            <div className={styles.shape_div}>
              <div
                className={classNames(
                  styles.init_card,
                  shape === '0' && styles.selete_card
                )}
                onClick={() => {
                  shapeChange('0');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="145"
                  height="24"
                  viewBox="0 0 145 24"
                  fill="none"
                  stroke="white"
                >
                  <path
                    d="M0 22H7C15.2843 22 22 15.2843 22 7.00001V3C22 2.44772 22.4477 2 23 2H121C121.552 2 122 2.44772 122 3V7.00001C122 15.2843 128.716 22 137 22H145"
                    stroke="inherit"
                    strokeWidth="6"
                  ></path>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.init_card,
                  shape === '2' && styles.selete_card
                )}
                onClick={() => {
                  shapeChange('2');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="145"
                  height="24"
                  viewBox="0 0 145 24"
                  fill="none"
                  stroke="white"
                >
                  <path
                    d="M0 22H7C15.2843 22 22 15.2843 22 7.00001V3.39336C22 2.7091 22.6808 2.2299 23.3304 2.44485C59.2066 14.3156 85.7767 12.9047 120.7 2.39438C121.343 2.20072 122 2.67921 122 3.3512V7.00001C122 15.2843 128.716 22 137 22H145"
                    stroke="inherit"
                    strokeWidth="6"
                  ></path>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.init_card,
                  shape === '3' && styles.selete_card
                )}
                onClick={() => {
                  shapeChange('3');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="145"
                  height="33"
                  viewBox="0 0 145 33"
                  fill="none"
                  stroke="white"
                >
                  <path
                    d="M0 31H7C15.2843 31 22 24.2843 22 16V11.7329C22 11.2966 22.2898 10.9083 22.7061 10.7779C60.0722 -0.924818 84.913 -0.925978 121.302 10.7745C121.714 10.9071 122 11.2935 122 11.727V16C122 24.2843 128.716 31 137 31H145"
                    stroke="inherit"
                    strokeWidth="6"
                  ></path>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.init_card,
                  shape === '1' && styles.selete_card
                )}
                onClick={() => {
                  shapeChange('1');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="145"
                  height="24"
                  viewBox="0 0 145 24"
                  fill="none"
                  stroke="white"
                >
                  <path
                    d="M0 2H22V21C22 21.5523 22.4477 22 23 22H121C121.552 22 122 21.5523 122 21V2H145"
                    stroke="inherit"
                    strokeWidth="6"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.input_div}>
          <div
            className={styles.title_span}
            style={{
              color: textColor,
            }}
          >
            代码
          </div>
          <div
            className={styles.body_select_div}
            style={{ display: 'inline-block' }}
          >
            <SyntaxHighlighter language="css" style={getDark(color)}>
              {codeString}
            </SyntaxHighlighter>
            <div
              className={styles.copy_icon_div}
              style={{
                color: getIconColor(color),
              }}
              onClick={() => {
                copyText(codeString);
              }}
            >
              <CopyOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
