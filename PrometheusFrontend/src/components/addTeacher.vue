<template lang="html">
  	<div class="addTeacher">
		<Breadcrumb>
  			<BreadcrumbItem to="/teacher">
  				<Icon type="ios-build" size="24"/>老师管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>新建老师
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">
		   	<FormItem label="姓名:">
			   	<Input v-model="formItem.name" placeholder="请输入老师姓名..." clearable></Input>
		   	</FormItem>
			<FormItem label="介绍:">
			   	<Input v-model="formItem.brief" type="textarea" placeholder="请输入介绍内容..."></Input>
		   	</FormItem>
			<FormItem label="学科:">
				<Select v-model="formItem.subject" placeholder="选择学科...">
					<Option v-for="item in subjectData" :value="item.title">{{item.title}}</Option>
	            </Select>
		   	</FormItem>
			<FormItem>
				<Button type="primary" long @click="submitClick">提交</Button>
			</FormItem>
		</Form>
  	</div>
</template>

<script>
import globel_ from './../config/global.vue'
export default {
	name:"addTeacher",
	data(){
		return{
			id:"",
			submitUrl:"",
			subjectData:globel_.subjectData,
			formItem:{
				name:"",
				brief:"",
				subject:""
			}
		}
	},
	methods:{
		submitClick(){
			let that = this;
			this.$Loading.start();
			if(this.id == 0){		//新建	post
				this.$http.post( this.submitUrl ,{
					name:this.formItem.name,
					brief:this.formItem.brief,
					subject:this.formItem.subject
				}).then(function(result){
					if(result.status == 200){
						that.$Loading.finish();
						that.$Message.success({duration:2,content:globel_.configMessage.operateSuccess});
						setTimeout(function(){
							that.$router.push({name:"teacher"});
						},2000)
					}
				}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:2,content:err});
				})
			}else{				//修改	put
				this.$http.put( this.submitUrl ,{
					name:this.formItem.name,
					brief:this.formItem.brief,
					subject:this.formItem.subject
				}).then(function(result){
					if(result.status == 200){
						that.$Loading.finish();
						that.$Message.success({duration:2,content:globel_.configMessage.operateSuccess});
						setTimeout(function(){
							that.$router.push({name:"teacher"});
						},2000)
					}
				}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:2,content:err});
				})
			}
		}
	},
	created(){
		this.id = this.$route.query.id;
		if(this.id != 0){		//修改
			this.submitUrl = globel_.serverHost + globel_.configAPI.updataTeacherById.replace(":id",this.id);
			let that = this,
				getDataUrl = globel_.serverHost + globel_.configAPI.getTeacherDataById.replace(":id",this.id);
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
				console.log(result);
				// 数据赋值
				that.$Loading.finish();
				that.formItem = result.data;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error({duration:3,content:err});
			})
		}else{					//新建
			this.submitUrl = globel_.serverHost + globel_.configAPI.createTeacher;
		}
	}
}
</script>

<style lang="css">
.addTeacher{
	padding: 20px;
}
</style>
