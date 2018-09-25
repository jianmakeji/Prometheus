<template lang="html">
	<div class="videoType">
		<Breadcrumb>
	        <BreadcrumbItem>
	            <Icon type="ios-build" size="24"/>视频类别管理
	        </BreadcrumbItem>
	    </Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newType">新建</Button><br /><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total/>
    </div>
</template>

<script>
export default {
    name:"videoType",
    data () {
        return {
			total:100,
			columns:[
				{
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '类型名称',
                    key: 'title'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
			],
			dataList: [
                { id:1, title: '1', age: 1, address: '1', date: '1' },
	            { id:2, title: '2', age: 2, address: '2', date: '2' },
	            { id:3, title: '3', age: 3, address: '3', date: '3' },
	            { id:4, title: '4', age: 4, address: '4', date: '4' },
	            { id:5, title: '5', age: 5, address: '5', date: '5' }
            ]
        }
    },
    methods: {
		newType(){
			this.$router.push({name:"videoTypeAlter"});
		}
    },
	created(){

	}
}
</script>

<style lang="css">
.videoType{
	padding: 20px;
}
</style>
