<template lang="html">
 	<div class="videoClassAlter">
	  	<Breadcrumb>
  			<BreadcrumbItem to="/videoClass">
  				<Icon type="ios-build" size="24"/>视频年级管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>新建年级
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">
		   	<FormItem label="年级名:">
			   	<Input v-model="formItem.videoClass" placeholder="请输入年级名称..." clearable></Input>
		   	</FormItem>
			<FormItem>
				<Button type="primary" long @click="submitClick">提交</Button>
			</FormItem>
		</Form>
  	</div>
</template>

<script>
export default {
	name:"videoClassAlter",
	data(){
		return{
			formItem:{
				videoClass:""	//年级item
			}
		}
	},
	methods:{
		submitClick(){
			console.log("submit");
			this.$router.push({name:"videoClass"});
		}
	}
}
</script>

<style lang="css">
.videoClassAlter{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
