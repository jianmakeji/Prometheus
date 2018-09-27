<template lang="html">
  	<div class="articleType">
		<Breadcrumb>
	        <BreadcrumbItem>
	            <Icon type="ios-build" size="24"/>好文类别管理
	        </BreadcrumbItem>
	    </Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newType">新建</Button><br /><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total/>
  	</div>
</template>

<script>
export default {
	name:"articleType",
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
					title: '类名',
					key: 'title',
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
				{id:1,title:"父子篇"},{id:2,title:"成长篇"},{id:3,title:"亲自篇"}
			]
		}
	},
	methods:{
		newType(){
			this.$router.push({name:"articleTypeAlter"});
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
.articleType{
	padding: 20px;
}
</style>
