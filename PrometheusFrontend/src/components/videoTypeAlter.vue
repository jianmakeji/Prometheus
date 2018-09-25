<template lang="html">
	<div class="videoTypeAlter">
		<Breadcrumb>
	        <BreadcrumbItem  to="/videoType">
	            <Icon type="ios-build" size="24"/>视频类别管理
	        </BreadcrumbItem>
			<BreadcrumbItem>
	            <Icon type="md-add" size="24"/>新建视频类别
	        </BreadcrumbItem>
	    </Breadcrumb><br>
		<Form :model="formItem" :label-width="80">
		   <FormItem label="视频类别:">
			   <Input v-model="formItem.videoType" placeholder="请输入视频类别名称..." clearable></Input>
		   </FormItem>
		   	<FormItem>
	            <Button type="primary" long @click="submitClick">提交</Button>
	        </FormItem>
		</Form>
	</div>
</template>

<script>
export default {
	name:"videoTypeAlter",
	data(){
		return{
			formItem:{
				videoType:""
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
.videoTypeAlter{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
