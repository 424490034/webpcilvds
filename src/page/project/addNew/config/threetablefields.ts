
import { extraEnum } from './threeFormFields';
export const tableList = [
    {
      title: '指定指令',
      key: 'seleteOrder',
      width: 150,
    },
    {
      title: '触发时机',
      key: 'timing',
        width: 150,
        render: (text: string)=>{
          switch (text) {
              case '1':
                  return '执行指令之前'
              default:
                  return '执行指令之后'
          }
      }
    },
    {
      title: '定制操作',
      key: 'extra',
        width: 150,
        render: (text: string) => {
            let data = '';
            extraEnum.map((item:any) => {
                if (item.value === text) {
                    data = item.label
                }
            })
            return data
        }
      
    },
];