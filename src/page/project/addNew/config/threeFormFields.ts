
export const  extraEnum = [
	{
		label:'拉取最新代码',
		value:'1',
	},
	{
		label:'定向打包',
		value:'2',
	},
	{
		label:'自定义指令执行',
		value:'3',
	},
]
export const ColConfig = {
	xs: 24, // <576
	sm: 24, // >= 576
	md: 24, // >= 768
	lg: 24, // >= 992
	xl: 24, // >= 1200
	xxl: 24, // >= 1600
};

export const formItemLayout = {
	labelCol: {
		span:8
	}, // 左侧 label 宽度
	wrapperCol: {
		span: 16
	}, // 右侧 控件 宽度
	style: {
		marginBottom:24,
	},
};
export const threeFormNames = {
	seleteOrder:'seleteOrder',
	timing:'timing',
	extra:'extra',
};
export const threeFormConditions = [
		{
			inputType:'select',
			title:threeFormNames.seleteOrder,
			label:'指定指令',
			isAll:false,
			selectCondition:[
			],
			itemConfig:{
				rules:[
					
					{
						required:true,
						message:'请选择',
					},
				],
			},
			componentsConfig:{
				placeholder:'请选择',
				allowClear:false,
			},
			formItemLayout,
			ColConfig,
		},
		{
			inputType:'select',
			title:threeFormNames.timing,
			label:'触发时机',
			isAll:false,
			selectCondition:[
				{
					label:'执行指令之前',
					value:'1',
				},
				{
					label:'执行指令之后',
					value:'2',
				},
			],
			itemConfig:{
				rules:[
					
					{
						required:true,
						message:'请选择',
					},
				],
			},
			componentsConfig:{
				placeholder:'请选择',
				allowClear:false,
			},
			formItemLayout,
			ColConfig,
		},
		{
			inputType:'select',
			title:threeFormNames.extra,
			label:'定制操作',
			isAll:false,
			selectCondition:extraEnum,
			itemConfig:{
				rules:[
					{
						required:true,
						message:'请选择',
					},
				],
			},
			componentsConfig:{
				placeholder:'请选择',
				allowClear:false,
			},
			formItemLayout,
			ColConfig,
		},
];