<template lang="html">
  	<div class="teacherManage">
		<Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>老师管理
			</BreadcrumbItem>
		</Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newTeacher">新建</Button><br /><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total/>
  	</div>
</template>

<script>
export default {
	name:"teacherManage",
	data(){
		return{
			total:100,
			columns:[
				{ 	title: 'id',	key: 'id',	align: 'center'	},
				{	title: '姓名',	key: 'name',	align: 'center'},
				{	title: "学科",	key: 'subject',	align: 'center'},
				{	title: "专题",	key: 'specialColumn',	align: 'center'},
				{ title: '操作', key: 'opt', align: 'center',
					render: (h, params) => {
						return h("div",[
							h('Button', {
	                               	props: {
	                                   	type: 'primary',
	                                   	size: 'small'
	                               	},
	                               	style: {
	                                   	marginRight: '5px'
	                               	},
	                               	on: {
	                                   	click: () => {
	                                       	this.changeTap(params.index)
	                                   	}
	                               	}
	                           	}, '修改'),
						   	h('Button', {
                           	props: {
                               	type: 'error',
                               	size: 'small'
                           	},
                           	style: {
                               	marginRight: '5px'
                           	},
                           	on: {
                               	click: () => {
                                   	this.removeTap(params.index)
                               	}
                           	}
                       	},'删除')
						])
					}
			 	}

			],
			dataList:[
				{id:1,name:"张三",subject:"数学",specialColumn:"精品课程"},
				{id:2,name:"李四",subject:"英语",specialColumn:"精品课程"},
				{id:3,name:"王五",subject:"物理",specialColumn:"精品课程"},
				{id:4,name:"赵六",subject:"化学",specialColumn:"专题图片"},
			]
		}
	},
	methods:{
		newTeacher(){
			this.$router.push({name:"teacherAlter"});
		},
		changeTap(index){
			console.log(index);
		},
		removeTap(index){
			console.log(index);
		}
	}
}
</script>

<style lang="css">
.teacherManage{
	padding: 20px;
}
</style>
