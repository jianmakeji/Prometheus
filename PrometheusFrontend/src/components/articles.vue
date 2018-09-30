<template lang="html">
  	<div class="articles">
		<Breadcrumb>
	        <BreadcrumbItem>
	            <Icon type="ios-build" size="24"/>好文管理
	        </BreadcrumbItem>
	    </Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newArticle">新建</Button><br /><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
		<Modal v-model="deleteModel" width="360" @on-ok="okTap">
	        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>确定要删除好文</span>
	        </p>
	        <div style="text-align:center">
	            {{articleTitle}}
	        </div>
	    </Modal>
  	</div>
</template>

<script>
export default {
	name:"articles",
	data(){
		return{
			index:"",
			deleteModel:false,
			articleTitle:"",
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
		pageChange(index){
			console.log(index);
		},
		newArticle(){
			this.$router.push({name:"addArticle",query:{id:0}});
		},
		changeTap(index){
			let articleId = this.dataList[index].id;
			console.log(articleId);
			this.$router.push({name:"addArticle",query:{id:articleId}});
		},
		removeTap(index){
			this.index = index;
			this.articleTitle = this.dataList[index].title;
			this.deleteModel = true;
		},
		okTap(){
			console.log(index);
		}
	}
}
</script>

<style lang="css">
.articles{
	padding: 20px;
}
</style>
