<template lang="html">
  	<div class="teacherManage">
		<Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>老师管理
			</BreadcrumbItem>
		</Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newTeacher">新建</Button><br /><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
		<Modal v-model="deleteModel" width="360" @on-ok="okTap">
	        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>确定要删除老师</span>
	        </p>
	        <div style="text-align:center">
	            {{teacherName}}
	        </div>
	    </Modal>
  	</div>
</template>

<script>
export default {
	name:"teacherManage",
	data(){
		return{
			index:"",
			teacherName:"",
			deleteModel:false,
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
		pageChange(index){
			console.log(index);
		},
		newTeacher(){
			this.$router.push({name:"teacherAlter",query:{id:0}});
		},
		changeTap(index){
			let teacherId = this.dataList[index].id;
			console.log(teacherId);
			this.$router.push({name:"teacherAlter",query:{id:teacherId}});
		},
		removeTap(index){
			this.index = index;
			this.teacherName = this.dataList[index].name;
			this.deleteModel = true;
		},
		okTap(){
			console.log(this.index);
		}
	}
}
</script>

<style lang="css">
.teacherManage{
	padding: 20px;
}
</style>
