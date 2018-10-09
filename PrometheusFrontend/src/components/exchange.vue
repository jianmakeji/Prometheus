<template lang="html">
  	<div class="exchange">
		<Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>视频管理
			</BreadcrumbItem>
		</Breadcrumb><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
  	</div>
</template>

<script>
export default {
	name:"exchange",
	data(){
		return{
			total:100,
			columns:[
				{
					title: 'id',
					key: 'Id',
					align: 'center'
				},
				{
					title: '名称',
					key: 'title',
					align: 'center'
				},
				{
					title: '类型',
					key: 'type',
					align: 'center'
				},
				{
					title: '专题',
					key: 'specialColumn',
					align: 'center'
				},
				{
					title: '年级',
					key: 'grade',
					align: 'center'
				}
			],
			dataList: [
				{Id:1,title:"111111",type:"111",specialColumn:"1111",grade:"1"}
			]
		}
	},
	methods:{
		pageChange(index){

		}
	}
}
</script>

<style lang="css" scoped>
.exchange{
	padding: 20px;
}
</style>
