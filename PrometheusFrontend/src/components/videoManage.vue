<template lang="html">
  	<div class="videoManage">
		<Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>视频管理
			</BreadcrumbItem>
		</Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newVideo">新建</Button><br /><br />
		<Form :model="formItem" label-position="right" :label-width="80" inline>
			<FormItem label="类型">
	            <Select v-model="formItem.type">
	                <Option value="beijing">New York</Option>
	                <Option value="shanghai">London</Option>
	                <Option value="shenzhen">Sydney</Option>
	            </Select>
	        </FormItem>
			<FormItem label="年级">
	            <Select v-model="formItem.class">
	                <Option value="beijing">New York</Option>
	                <Option value="shanghai">London</Option>
	                <Option value="shenzhen">Sydney</Option>
	            </Select>
	        </FormItem>
	    </Form>
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total/>
  	</div>
</template>

<script>
export default {
	name:"videoManage",
	data(){
		return{
			total:100,
			formItem:{
				type:"",
				class:""
			},
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
		newVideo(){
			this.$router.push({name:"videoAlter"});
		}
	}
}
</script>

<style lang="css">
.videoManage{
	padding: 20px;
}
.ivu-select-selection{
	width: 200px;
}
</style>
