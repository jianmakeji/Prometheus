<template lang="html">
  	<div class="articleTypeAlter">
		<Breadcrumb>
	        <BreadcrumbItem  to="/articleType">
	            <Icon type="ios-build" size="24"/>好文类别管理
	        </BreadcrumbItem>
			<BreadcrumbItem>
	            <Icon type="md-add" size="24"/>新建视频类别
	        </BreadcrumbItem>
	    </Breadcrumb><br>
		<Form :model="formItem" :label-width="80">
		   <FormItem label="好文类别:">
			   <Input v-model="formItem.articleType" placeholder="请输入好文类别名称..." clearable></Input>
		   </FormItem>
		   	<FormItem>
	            <Button type="primary" long @click="submitClick">提交</Button>
	        </FormItem>
		</Form>
  	</div>
</template>

<script>
export default {
	name:"articleTypeAlter",
	data(){
		return{
			formItem:{
				articleType:""
			}
		}
	},
	methods:{
		submitClick(){
			console.log("submit");
		}
	}
}
</script>

<style lang="css">
.articleTypeAlter{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
