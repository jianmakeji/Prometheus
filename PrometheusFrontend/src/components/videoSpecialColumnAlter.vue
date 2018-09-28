<template lang="html">
 	<div class="videoSpecialColumnAlter">
	  	<Breadcrumb>
  			<BreadcrumbItem to="/videoSpecialColumn">
  				<Icon type="ios-build" size="24"/>视频专题管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>新建专题
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">
		   	<FormItem label="专题名:">
			   	<Input v-model="formItem.title" placeholder="请输入专题名称..." clearable></Input>
		   	</FormItem>
			<FormItem label="专题介绍:">
			   	<Input v-model="formItem.introduce" type="textarea" placeholder="请输入介绍内容..."></Input>
		   	</FormItem>
			<FormItem>
				<Button type="primary" long @click="submitClick">提交</Button>
			</FormItem>
		</Form>
  	</div>
</template>

<script>
export default {
	name:"videoSpecialColumnAlter",
	data(){
		return{
			id:"",
			submitUrl:"",
			formItem:{
				title:"",	//年级item
				introduce:""	//年级item
			}
		}
	},
	methods:{
		submitClick(){
			console.log("submit");
			this.$router.push({name:"videoSpecialColumn"});
		}
	},
	created(){
		// console.log(this.$route.query.id);
		this.id = this.$route.query.id;
		if(this.id != 0){		//修改
			console.log("修改",this.id,typeof this.id);
			// this.submitUrl = "" 		//新建专栏的链接
		}else{					//新建
			// this.submitUrl = "" 		//修改专栏的链接
			console.log("新建",this.id);
		}
	}
}
</script>

<style lang="css">
.videoSpecialColumnAlter{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
