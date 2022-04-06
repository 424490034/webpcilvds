import React, { useState, useMemo } from 'react';
import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color';
import scssStyles from './index.module.scss';

const CustomColors = (props: any) => {
  const { color, setColor, disableAlpha } = props;
  const styles: any = useMemo(() => {
    return reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          // background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          background: color,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          top: -50,
          right: 40,
          paddingBottom: 60,
        },
      },
    });
  }, [color]);
  const [display, setDisplay] = useState(false);
  const handleClick = () => {
    setDisplay(!display);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  const handleChange = (color: any) => {
    setColor(color);
  };
  return (
    <div className={scssStyles.colors}>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {display ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <ChromePicker
            disableAlpha={disableAlpha}
            color={color}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  );
};
export default CustomColors;
