<template lang="html">
  	<div class="userManage">
		<Breadcrumb>
	        <BreadcrumbItem>
	            <Icon type="ios-build" size="24"/>用户管理
	        </BreadcrumbItem>
	    </Breadcrumb><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
  	</div>
</template>

<script>
export default {
	name:"userManage",
	data(){
		return{
			total:100,
			columns:[
				{ 	title: 'id',	key: 'id',	align: 'center'	},
				{	title: '用户名',	key: 'name',	align: 'center'}
			],
			dataList:[
				{id:1,name:"张三"},
				{id:2,name:"李四"},
				{id:3,name:"王五"},
				{id:4,name:"赵六"},
			]
		}
	},
	methods:{
		pageChange(index){
			console.log(index);
		},
	}
}
</script>

<style lang="css">
.userManage{
	padding: 20px;
}
</style>
