<template lang="html">
  <div class="videoSpecialColumn">
	<Breadcrumb>
		<BreadcrumbItem>
			<Icon type="ios-build" size="24"/>视频专题管理
		</BreadcrumbItem>
	</Breadcrumb><br />
	<Button icon="md-add" type="primary" @click="newClass">新建</Button><br /><br />
	<Table :columns="columns" :data="data"></Table><br />
	<Page :total="total" show-total/>
  </div>
</template>

<script>
export default {
	name:"videoSpecialColumn",
	data(){
		return{
			total:100,
			columns:[
				{ title: 'id', key: 'id', align: 'center' },
                { title: '专题名称', key: 'title', align: 'center' },
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
			data: [
                {id:1,title:"精品课程"}, {id:2,title:"专题突破"}
            ]
		}
	},
	methods:{
		newClass(){
			this.$router.push({name:"videoSpecialColumnAlter"});
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
.videoSpecialColumn{
	padding: 20px;
}
</style>
