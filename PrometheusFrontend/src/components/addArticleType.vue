<template lang="html">
  	<div class="addArticleType">
		<Breadcrumb>
	        <BreadcrumbItem  to="/articleType">
	            <Icon type="ios-build" size="24"/>好文类别管理
	        </BreadcrumbItem>
			<BreadcrumbItem>
	            <Icon type="md-add" size="24"/>{{BreadcrumbTitle}}
	        </BreadcrumbItem>
	    </Breadcrumb><br>
		<Form :model="formItem" :label-width="80">
		   <FormItem label="类别名:">
			   <Input v-model="formItem.articleType" placeholder="请输入好文类别名称..." clearable></Input>
		   </FormItem>
		   <FormItem label="类别名:">
			   <Input v-model="formItem.introduce" placeholder="请输入好文类别名称..." type="textarea"></Input>
		   </FormItem>
		   	<FormItem>
	            <Button type="primary" long @click="submitClick">提交</Button>
	        </FormItem>
		</Form>
  	</div>
</template>

<script>
export default {
	name:"addArticleType",
	data(){
		return{
			id:"",
            BreadcrumbTitle:"",
			submitUrl:"",
			formItem:{
				articleType:"",
				introduce:""
			}
		}
	},
	methods:{
		submitClick(){
			console.log("submit");
		}
	},
	created(){
		this.id = this.$route.query.id;
		if(this.id != 0){		//修改
            this.BreadcrumbTitle = "修改好文类型";
			console.log("修改",this.id,typeof this.id);
			// this.submitUrl = "" 		//新建专栏的链接
		}else{					//新建
            this.BreadcrumbTitle = "新建好文类型";
			// this.submitUrl = "" 		//修改专栏的链接
			console.log("新建",this.id);
		}
	}
}
</script>

<style lang="css" scoped>
.addArticleType{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
