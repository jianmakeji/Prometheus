<template lang="html">
  	<div class="teacherDetail">
		<Breadcrumb>
  			<BreadcrumbItem to="/teacher">
  				<Icon type="ios-build" size="24"/>类别管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>新建类别
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
  	</div>
</template>

<script>
export default {
	name:"teacherDetail",
	data(){
		return{
			total:100,
			columns:[
				{ title: 'id', key: 'Id', align: 'center' },
                { title: '专栏名', key: 'name', align: 'center' },
				{ title: '课程详情', key: 'opt', align: 'center',
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
                                       	this.checkTap(params.index)
                                   	}
                               	}
                           	}, '查看课程')
						])
					}
			 	}
			],
			dataList: []
		}
	},
	methods:{
		pageChange(index){
			console.log(index);
		},
		checkTap(index){
			console.log(index);
		}
	},
	created(){

	}
}
</script>

<style lang="css">
.teacherDetail{
	padding: 20px;
}
</style>
