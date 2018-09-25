<template lang="html">
  <div class="videoClass">
	<Breadcrumb>
		<BreadcrumbItem>
			<Icon type="ios-build" size="24"/>视频年级管理
		</BreadcrumbItem>
	</Breadcrumb><br />
	<Button icon="md-add" type="primary" @click="newClass">新建</Button><br /><br />
	<Table :columns="columns" :data="data"></Table><br />
	<Page :total="total" show-total/>
  </div>
</template>

<script>
export default {
	name:"videoClass",
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
			],data: [
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
		newClass(){
			this.$router.push({name:"videoClassAlter"});
		}
	}
}
</script>

<style lang="css">
.videoClass{
	padding: 20px;
}
</style>
