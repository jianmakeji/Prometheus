<template lang="html">
  	<div class="addTeacher">
		<Breadcrumb>
  			<BreadcrumbItem to="/teacher">
  				<Icon type="ios-build" size="24"/>老师管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>{{BreadcrumbTitle}}
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">
            <FormItem label="头像:">
				<img v-if="imgUrl.length" :src="imgUrl" style="width:80px;height:80px;" class="schoolImg"><br>
                <input type="file" @change="doUpload" ref="inputFile" accept="image/*"/>
				<Progress :percent="progressPercent" />
	        </FormItem>
		   	<FormItem label="姓名:">
			   	<Input v-model="formItem.name" placeholder="请输入老师姓名..." clearable></Input>
		   	</FormItem>
			<FormItem label="介绍:">
			   	<Input v-model="formItem.brief" type="textarea" placeholder="请输入介绍内容..."></Input>
		   	</FormItem>
			<FormItem label="学科:">
				<Select v-model="formItem.subject" placeholder="选择学科...">
					<Option v-for="(item,index) in subjectData" :value="item.title" :key="index">{{item.title}}</Option>
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
import OSS from 'ali-oss'

var g_object_name = "";
var key = '';
var hostPrefix = "http://jm-prometheus.oss-cn-hangzhou.aliyuncs.com";

function random_string(len) {
  	var len = len || 32;
  	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  	var maxPos = chars.length;
  	var pwd = '';
  	for (var i = 0; i < len; i++) {
    	pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  	}
  	return pwd;
}

function get_suffix(filename) {
  	var pos = filename.lastIndexOf('.')
  	var suffix = ''
  	if (pos != -1) {
    	suffix = filename.substring(pos)
  	}
  	return suffix;
}

function calculate_object_name(filename) {
  	var suffix = get_suffix(filename)
  	g_object_name = key + random_string(10) + suffix
}

function get_uploaded_object_name(filename) {
  	return g_object_name;
}
export default {
	name:"addTeacher",
	data(){
		return{
			id:"",
            BreadcrumbTitle:"",
			submitUrl:"",
			subjectData:globel_.subjectData,

            progressPercent: 0,
            imgUrl:"",
            thumbImage:"",

			formItem:{
                avatar:"",
				name:"",
				brief:"",
				subject:""
			}
		}
	},
	methods:{
        //图片上传
	    doUpload(files) {
	      	let that = this;
	      	var file = files.target.files[0]; //获取要上传的文件对象
	      	this.$http({
	        	method: 'get',
	        	url: globel_.serverHost + '/api/getSTSSignature/3'
	      	}).then((res) => {
		        var client = new OSS({
		          	region: 'oss-cn-hangzhou',
		          	accessKeyId: res.data.credentials.AccessKeyId,
		          	accessKeySecret: res.data.credentials.AccessKeySecret,
		          	stsToken: res.data.credentials.SecurityToken,
		          	bucket: 'jm-prometheus'
		        });

				calculate_object_name(file.name);
		        var newFilename =  g_object_name;
		        client.multipartUpload('articleImages/' + newFilename, file, {
			        progress(p) {
			            that.progressPercent = p * 100;
			        }
		        }).then(function(result) {
					that.$http.get(globel_.serverHost + globel_.configAPI.getUrlSignature + result.name).then(function(result){
						that.thumbImage = newFilename;
		              	that.$Loading.finish();
			            that.$Message.success({
			              duration: 2,
			              content: globel_.configMessage.uploadImgSuccess
			            });
						that.imgUrl = result.data;
					}).catch(function(err){
						that.$Loading.error();
						that.$Message.error({
						  duration: 2,
						  content:err
						});
					})

		        }).catch(function(err) {
					that.$Loading.error();
					that.$Message.error({
					  	duration: 2,
					  	content: err
					});
		        });
		    }).catch((err) => {
				that.$Loading.error();
				that.$Message.error({
					duration: 2,
					content: err
				});
		    });
	    },
		submitClick(){
            this.formItem.avatar = this.thumbImage;
			let that = this;
            console.log(this.formItem);
			this.$Loading.start();
			if(this.id == 0){		//新建	post
				this.$http.post( this.submitUrl ,{
					name:this.formItem.name,
					brief:this.formItem.brief,
					subject:this.formItem.subject,
                    avatar:this.formItem.avatar
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
					subject:this.formItem.subject,
                    avatar:this.formItem.avatar
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
            this.BreadcrumbTitle = "修改老师";
			this.submitUrl = globel_.serverHost + globel_.configAPI.updataTeacherById.replace(":id",this.id);
			let that = this,
				getDataUrl = globel_.serverHost + globel_.configAPI.getTeacherDataById.replace(":id",this.id);
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
				// 数据赋值
				that.$Loading.finish();
				that.formItem = result.data;
                that.imgUrl = result.data.avatar;
                that.thumbImage = result.data.avatar.split("articleImages/")[1].split("?")[0];
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error({duration:3,content:err});
			})
		}else{					//新建
            this.BreadcrumbTitle  = "新建老师";
			this.submitUrl = globel_.serverHost + globel_.configAPI.createTeacher;
		}
	}
}
</script>

<style lang="css" scoped>
.addTeacher{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
