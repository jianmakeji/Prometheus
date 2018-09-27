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
					title: 'id',
					key: 'id',
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
			dataList: [
				{id:1, title:"父子好文1",type:"父子篇" },
				{id:1, title:"成长好文1",type:"成长篇" },
				{id:1, title:"亲子好文1",type:"亲子篇" },

			]
		}
	},
	methods:{
		newArticle(){
			this.$router.push({name:"articleAlter"});
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
.articleManage{
	padding: 20px;
}
</style>
