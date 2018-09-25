<template lang="html">
  	<div class="articleManage">
		<Breadcrumb>
	        <BreadcrumbItem>
	            <Icon type="ios-build" size="24"/>好文管理
	        </BreadcrumbItem>
	    </Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newArticle">新建</Button><br /><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total/>
  	</div>
</template>

<script>
export default {
	name:"articleManage",
	data(){
		return{
			total:100,
			columns:[
				{
					title: 'Name',
					key: 'name'
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Address',
					key: 'address'
				}
			],
			dataList: [
				{
					name: 'John Brown',
					age: 18,
					address: 'New York No. 1 Lake Park',
					date: '2016-10-03'
				},
				{
					name: 'Jim Green',
					age: 24,
					address: 'London No. 1 Lake Park',
					date: '2016-10-01'
				},
				{
					name: 'Joe Black',
					age: 30,
					address: 'Sydney No. 1 Lake Park',
					date: '2016-10-02'
				},
				{
					name: 'Jon Snow',
					age: 26,
					address: 'Ottawa No. 2 Lake Park',
					date: '2016-10-04'
				}
			]
		}
	},
	methods:{
		newArticle(){
			this.$router.push({name:"articleAlter"});
		}
	}
}
</script>

<style lang="css">
.articleManage{
	padding: 20px;
}
</style>
