import React from 'react';
import { ItalicOutlined, ExpandAltOutlined } from '@ant-design/icons';
export const cursorList = [
  {
    label: 'url()',
    value:
      "url('data:image/png;base64,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'),default",
    copy:
      "cursor:url('data:image/png;base64,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'),default",
    icon: (
      <img src="data:image/png;base64,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" />
    ),
  },
  {
    label: 'default',
    value: 'default',
    copy: 'cursor:default;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP//gP8AACH5BAAAAAAALAAAAAAaABoAAAI5hI+py+0PWYgwTNrmxepufmwf+I3YaEZm+qRsJnGoZZ2GB96AppP4niv1cr0X5UcEKpM7I/MJjUYKADs=" />
    ),
  },
  {
    label: 'none',
    value: 'none',
    copy: 'cursor:none;',
  },
  {
    label: 'context-menu',
    value: 'context-menu',
    copy: 'cursor:context-menu;',
    icon: (
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaBAMAAABbZFH9AAAAMFBMVEX/AADs7oz/gID//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+vuKgAAAACXBIWXMAAArrAAAK6wGCiw1aAAAAX0lEQVR42n2Qyw3AMAhDkTxBR6BZwBL779ZCvu6hvj09iFEszpgSlSBEnYQQ9RUIURsgxLgrrbfDr8wgnmTmOeit+hDbWdJ0r+J2KFp7uThddBquynm4DxHzzr8fFHoANiw3MVFRwtgAAAAASUVORK5CYII=" />
    ),
  },
  {
    label: 'help',
    value: 'help',
    copy: 'cursor:help;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP//gP8AACH5BAAAAAAALAAAAAAaABoAAAJOhI+py+0PTYgwTNrmXbZbLnEf4CnbJo2pGh5oh5RxcrKya64x29IiigPtgEHXDca4KH8ZkvM5zCyhmFdPF5mueE0qMnvF7MTksvmMZhQAADs=" />
    ),
  },
  {
    label: 'pointer',
    value: 'pointer',
    copy: 'cursor:pointer;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP//gP8AACH5BAAAAAAALAAAAAAaABoAAAJEhI+py+0awpsS1MnqxdBsjmjgokVj6HnmKFoq2IpfEklx6mYvifO93mgFHzaikYI8OmY0DvPw7AydQKrPWcuuTtzuoQAAOw==" />
    ),
  },
  {
    label: 'progress',
    value: 'progress',
    copy: 'cursor:progress;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAJfjI+py+0NopzymQjBdbTj8DGaeGjjcirnmCIsCMdyu21r6ar3teNJyMv9dDCgTOgy0Wi1klL1mzinwle0BjTFUsag19o89ra+Ynk4s5FJZK0bYvNQMl4UUyevWPb8fQEAOw==" />
    ),
  },
  {
    label: 'wait',
    value: 'wait',
    copy: 'cursor:wait;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP//gP8AACH5BAAAAAAALAAAAAAaABoAAAJJhI+py+0YopzymdiwpVzvbB0BGAKjiZ5nuI5tab7XytIxLLo3nu/87ON5PDCNyvYg9kq0ZlGEujxTUSRIh2V2KLWMVbHl/sbkAgA7" />
    ),
  },
  {
    label: 'cell',
    value: 'cell',
    copy: 'cursor:cell;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAI5jI+py+0Po5y0QoCzNQDh3R2fFXLllZ3pybDL2LgK3KKPnNBv6q0ovcK9eiAiKbgJIJPMpvMJRRQAADs=" />
    ),
  },
  {
    label: 'crosshair',
    value: 'crosshair',
    copy: 'cursor:crosshair;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP//gP8AACH5BAAAAAAALAAAAAAaABoAAAIthI+py+0Po3xhumoZzmpz5H1GKJKfeQXqyrZo81rxNEt1dEM5JSZ7DwwKh5ECADs=" />
    ),
  },
  {
    label: 'text',
    value: 'text',
    copy: 'cursor:text;',
    icon: <ItalicOutlined />,
  },
  {
    label: 'vertical-text',
    value: 'vertical-text',
    copy: 'cursor:vertical-text;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAIrjI+py+0Po5y02osNqFv1+SFhNGocA6Tqyqbo6cFJ+dC0c2f6zvf+DwwiCgA7" />
    ),
  },
  {
    label: 'alias',
    value: 'alias',
    copy: 'cursor:alias;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaALMAAP8AAP+AQP//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAaABoAAwRdUMhJq704Z6A7BZzXcaGIhaVZlakqpa3axmJMj9e9na6uWzYQIEAsGgOfCWqC5ClfS0lTIIy+qFesYEoFZaFP7bT61YY5TaH2t0zPcNQ0ED4M2zfonanK97r+gBIRADs=" />
    ),
  },
  {
    label: 'copy',
    value: 'copy',
    copy: 'cursor:copy;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaALMAAP8AAP+AgP//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAaABoAAwRaUMhJq704Z6A7BZzXcaGIhaVZlakqpa3axmJMj9e9na6uWzYQIEAsGgOfCWqC5ClfS0kzl4yGpgLYh/WSJp9gMKcpBHV3WQFWq0Gtv+ghuj2ee8p4s2vPl0QAADs=" />
    ),
  },
  {
    label: 'move',
    value: 'move',
    copy: 'cursor:move;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAI+jI+py+0PIYgPWMqsxkl7rkzgIoKlcQYpmbYrssHdxXr2TYc5Or/HrppJOsSRzzSC3ZKqD7N5xESf1KoVVAAAOw==" />
    ),
  },
  {
    label: 'no-drop',
    value: 'no-drop',
    copy: 'cursor:no-drop;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaALMAAP8AAP+MVf//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAaABoAAwRmUMhJq7046xu63xcgjiQokSi6qRUbjkFWvrAs0kGNjRafizFa5Tf5AYK9I4VY1LWUTcDQOQEub1MrRSthZqEnsMD7RXLDUk6N90yrgex2xohN1i10W7w606dcK393JmMeHYSIiYoRADs=" />
    ),
  },
  {
    label: 'not-allowed',
    value: 'not-allowed',
    copy: 'cursor:not-allowed;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaALMAAP8AAP+MVf//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAaABoAAwRmUMhJq7046xu63xcgjiQokSi6qRUbjkFWvrAs0kGNjRafizFa5Tf5AYK9I4VY1LWUTcDQOQEub1MrRSthZqEnsMD7RXLDUk6N90yrgex2xohN1i10W7w606dcK393JmMeHYSIiYoRADs=" />
    ),
  },
  {
    label: 'all-scroll',
    value: 'all-scroll',
    copy: 'cursor:all-scroll;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAI5jI+py+0PIYgPWMqsxkl7Dobg5JClGWzH1ajpZ7id65mwQt8yjspsWREJh5kailMj7kRHovMJDRUAADs=" />
    ),
  },
  {
    label: 'col-resize',
    value: 'col-resize',
    copy: 'cursor:col-resize;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAJBjI+py+0Po3Qg1LnqxUlz5X1IiG3WeZgMYJKW2rEjarBwbdunlsuZX6O9bqmWENgwGjkuUfPzZAqdU5H1is1qGQUAOw==" />
    ),
  },
  {
    label: 'row-resize',
    value: 'row-resize',
    copy: 'cursor:row-resize;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAIvjI+py+0Po3xgNoCtwlwfDnpIJSZk+aEqyLaZCrnyC3vnWge33ZbsSkPtcsQiowAAOw==" />
    ),
  },
  {
    label: 'n-resize',
    value: 'n-resize',
    copy: 'cursor:n-resize;',
    icon: (
      <ExpandAltOutlined
        style={{
          transform: 'rotate(-45deg)',
        }}
      />
    ),
  },
  {
    label: 'e-resize',
    value: 'e-resize',
    copy: 'cursor:e-resize;',
    icon: (
      <ExpandAltOutlined
        style={{
          transform: 'rotate(45deg)',
        }}
      />
    ),
  },
  {
    label: 's-resize',
    value: 's-resize',
    copy: 'cursor:s-resize;',
    icon: (
      <ExpandAltOutlined
        style={{
          transform: 'rotate(-45deg)',
        }}
      />
    ),
  },
  {
    label: 'w-resize',
    value: 'w-resize',
    copy: 'cursor:w-resize;',
    icon: (
      <ExpandAltOutlined
        style={{
          transform: 'rotate(45deg)',
        }}
      />
    ),
  },
  {
    label: 'ne-resize',
    value: 'ne-resize',
    copy: 'cursor:ne-resize;',
    icon: <ExpandAltOutlined />,
  },
  {
    label: 'nw-resize',
    value: 'nw-resize',
    copy: 'cursor:nw-resize;',
    icon: (
      <ExpandAltOutlined
        style={{
          transform: 'rotate(90deg)',
        }}
      />
    ),
  },
  {
    label: 'se-resize',
    value: 'se-resize',
    copy: 'cursor:se-resize;',
    icon: (
      <ExpandAltOutlined
        style={{
          transform: 'rotate(90deg)',
        }}
      />
    ),
  },
  {
    label: 'sw-resize',
    value: 'sw-resize',
    copy: 'cursor:sw-resize;',
    icon: <ExpandAltOutlined />,
  },
  {
    label: 'ew-resize',
    value: 'ew-resize',
    copy: 'cursor:ew-resize;',
    icon: (
      <ExpandAltOutlined
        style={{
          transform: 'rotate(45deg)',
        }}
      />
    ),
  },
  {
    label: 'ns-resize',
    value: 'ns-resize',
    copy: 'cursor:ns-resize;',
    icon: (
      <ExpandAltOutlined
        style={{
          transform: 'rotate(-45deg)',
        }}
      />
    ),
  },
  {
    label: 'nesw-resize',
    value: 'nesw-resize',
    copy: 'cursor:nesw-resize;',
    icon: <ExpandAltOutlined />,
  },
  {
    label: 'nwse-resize',
    value: 'nwse-resize',
    copy: 'cursor:nwse-resize;',
    icon: (
      <ExpandAltOutlined
        style={{
          transform: 'rotate(90deg)',
        }}
      />
    ),
  },
  {
    label: 'zoom-in',
    value: 'zoom-in',
    copy: 'cursor:zoom-in;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAI5jI+py+0Po5z0gAuqzbty9UXfZU0hWYoGhq0Sx6Khc55m597LDKFr6wECNYgh8cfTGI/Jo/MJjRILADs=" />
    ),
  },
  {
    label: 'zoom-out',
    value: 'zoom-out',
    copy: 'cursor:zoom-out;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAI3jI+py+0Po5z0gAuqzbty9UUhMjolKXEYZpyLuqqpObkuY3vhqvEBq0kAg5tb7UJEJZfMppNYAAA7" />
    ),
  },
  {
    label: 'grab',
    value: 'grab',
    copy: 'cursor:grab;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAI+jI+py+0Po3QAzFSD1Xnu/nkGOGpSaHLpg7astWFl88WLrcQ4sudQ76NEgLMh7dIjHmWX1UHZjEqn1Kp1UgAAOw==" />
    ),
  },
  {
    label: 'grabbing',
    value: 'grabbing',
    copy: 'cursor:grabbing;',
    icon: (
      <img src="data:image/gif;base64,R0lGODlhGgAaAIAAAP8AAP//gCH5BAAAAAAALAAAAAAaABoAAAIyjI+py+0Po5y02gtAyFtTDxqc5ClaCaGJ2owL+z6w6cwxY9+rxeY4fQkKh8Si8YhsFAAAOw==" />
    ),
  },
];
