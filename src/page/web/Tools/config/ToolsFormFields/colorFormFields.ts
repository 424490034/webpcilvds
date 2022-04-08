
import { reg } from 'xl-study-com'
export const ColConfig = {
span: 8,
};

export const formItemLayout = {
labelCol: { span: 4 }, // 左侧 label 宽度
wrapperCol: { span: 20 }, // 右侧 控件 宽度
style: {
	marginBottom:24,
},
};

export const colorFormNames = {
	r:'r',
	g:'g',
	b:'b',
};

export const colorFormConditions = [
		{
			inputType:'input',
			title:colorFormNames.r,
			label:'r',
			itemConfig:{
				rules:[
					
					{
						required:true,
						message:'请输入',
					},
					{
						validator: (rule: any, value: any) => {
							if (value > 255) {
							return Promise.reject('最大值不得大于255');
							}
						  if (value && !reg.zeroPositiveInt.test(value)) {
							return Promise.reject('请输入非0正整数');
						  }
						  return Promise.resolve();
						},
					  },
				],
			},
			componentsConfig:{
				placeholder:'请输入',
				autoComplete:'off',
				allowClear:true,
				maxLength:100,
			},
			formItemLayout,
			ColConfig,
		},
		{
			inputType:'input',
			title:colorFormNames.g,
			label:'g',
			itemConfig:{
				rules:[
					
					{
						required:true,
						message:'请输入',
					},
					{
						validator: (rule: any, value: any) => {
							if (value > 255) {
							return Promise.reject('最大值不得大于255');
							}
						  if (value && !reg.zeroPositiveInt.test(value)) {
							return Promise.reject('请输入非0正整数');
						  }
						  return Promise.resolve();
						},
					  },
				],
			},
			componentsConfig:{
				placeholder:'请输入',
				autoComplete:'off',
				allowClear:true,
				maxLength:100,
			},
			formItemLayout,
			ColConfig,
		},
		{
			inputType:'input',
			title:colorFormNames.b,
			label:'b',
			itemConfig:{
				rules:[
					
					{
						required:true,
						message:'请输入',
					},
					{
						validator: (rule: any, value: any) => {
							if (value > 255) {
							return Promise.reject('最大值不得大于255');
							}
						  if (value && !reg.zeroPositiveInt.test(value)) {
							return Promise.reject('请输入非0正整数');
						  }
						  return Promise.resolve();
						},
					  },
				],
			},
			componentsConfig:{
				placeholder:'请输入',
				autoComplete:'off',
				allowClear:true,
				maxLength:100,
			},
			formItemLayout,
			ColConfig,
		},
];
export const colorCodeFormConditions = [
	{
		inputType:'input',
		title:colorFormNames.r,
		label:'颜色码',
		itemConfig:{
			rules:[
				
				{
					required:true,
					message:'请输入颜色码',
				},
			],
		},
		componentsConfig:{
			placeholder:'请输入颜色码',
			autoComplete:'off',
			allowClear:true,
			maxLength:100,
		},
		formItemLayout:{
			labelCol: { span: 4 }, // 左侧 label 宽度
			wrapperCol: { span: 20 }, // 右侧 控件 宽度
			style: {
				marginBottom:24,
			},
			},
		ColConfig: {
			span:24
		},
	},
	]