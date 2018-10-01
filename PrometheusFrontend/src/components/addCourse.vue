<template lang="html">
  	<div class="addCourse">
		<Breadcrumb>
  			<BreadcrumbItem to="/course">
  				<Icon type="ios-build" size="24"/>视频管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>新建视频
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">

			<!-- 图片上传 -->
			<FormItem label="封面图:">
                <Upload ref="upload" :action="host" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
					:data="{
                  		'key': g_object_name,
                  		'policy': policyBase64,
                  		'OSSAccessKeyId': accessid,
                  		'success_action_status': '200',
                  		'callback': callbackbody,
                  		'signature': signature,
                  	}" :show-upload-list="false">
                    <div style="width:100px;height:auto">
                        <img :src="formItem.thumb" style="width: 100%">
                    </div>
                </Upload>
	        </FormItem>

			<!-- 视频上传 -->
			<FormItem label="视频文件:">
				<Upload :action="videoHost" :format="['mp4']" :on-format-error="videoUploadFormatError" :before-upload="videoUploadBeforeUpload" :on-success="videoUploadSuccess" >
					<p>{{formItem.videoAddress}}</p>
			        <Button icon="ios-cloud-upload-outline">上传视频文件</Button>
			    </Upload>
		   	</FormItem>


		   	<FormItem label="视频名:">
			   	<Input v-model="formItem.name" placeholder="请输入视频名称..." clearable></Input>
		   	</FormItem>
			<FormItem label="视频介绍:">
			   	<Input v-model="formItem.describe" type="textarea" placeholder="请输入视频介绍..."></Input>
		   	</FormItem>
			<FormItem label="课程类别:">
	            <Select v-model="formItem.courseType" placeholder="选择类别...">
	                <Option v-for="item in courseTypeData" :value="item.Id">{{item.name}}</Option>
	            </Select>
	        </FormItem>
			<FormItem label="专题:">
	            <Select v-model="formItem.specialColumn" placeholder="选择专题...">
	                <Option v-for="item in specialColumnData" :value="item.Id">{{item.name}}</Option>
	            </Select>
	        </FormItem>
			<!-- <FormItem label="年级:">
	            <Select v-model="formItem.grade" placeholder="选择年级...">
	                <Option v-for="item in gradeData" :value="item.id">{{item.title}}</Option>
	            </Select>
	        </FormItem> -->
			<FormItem>
				<Button type="primary" long @click="submitClick">提交</Button>
			</FormItem>
		</Form>
  	</div>
</template>

<script>
import globel_ from './../config/global.vue'

var g_object_name = "";
var key = '';
var hostPrefix = "http://dc-yl.oss-cn-hangzhou.aliyuncs.com/";

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
	name:"addCourse",
	data(){
		return{
			id:"",
			submitUrl:"",
			gradeData:globel_.gradeData,
			//图片上传参数
			g_object_name: '',
			policyBase64: '',
			accessid: '',
			callbackbody: '',
			signature: '',
			host: hostPrefix,
			//视频上传参数
			videoHost:"",

			courseTypeData:"",
			specialColumnData:"",
			formItem:{
				name: "",
		        describe: "",
		        courseType: "",
		        specialColumn: "",
		        thumb: "ctx.request.body.thumb",
		        videoAddress: "ctx.request.body.videoAddress"
				// grade:""
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
					describe:this.formItem.describe,
					courseType:this.formItem.courseType,
					specialColumn:this.formItem.specialColumn,
					thumb:this.formItem.thumb,
					videoAddress:this.formItem.videoAddress
				}).then(function(result){
					if(result.status == 200){
						that.$Loading.finish();
						that.$Message.success({duration:2,content:globel_.configMessage.operateSuccess});
						setTimeout(function(){
							that.$router.push({name:"course"});
						},3000)
					}
				}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:2,content:err});
				})
			}else{				//修改	put
				this.$http.put( this.submitUrl ,{
					name:this.formItem.name,
					describe:this.formItem.describe,
					courseType:this.formItem.courseType,
					specialColumn:this.formItem.specialColumn,
					thumb:this.formItem.thumb,
					videoAddress:this.formItem.videoAddress
				}).then(function(result){
					if(result.status == 200){
						that.$Loading.finish();
						that.$Message.success({duration:2,content:globel_.configMessage.operateSuccess});
						setTimeout(function(){
							that.$router.push({name:"course"});
						},3000)
					}
				}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:2,content:err});
				})
			}
		},
		//图片上传事件没实现
		handleSuccess(){

		},
		handleFormatError(){

		},
		handleMaxSize(){

		},
		handleBeforeUpload(){

		},
		// 视频上传事件
		videoUploadFormatError(){
			console.log("videoUploadFormatError");
		},
		videoUploadBeforeUpload(){
			console.log("videoUploadBeforeUpload");
		},
		videoUploadSuccess(){
			console.log("videoUploadSuccess");
		}
	},
	created(){
		let that = this,
			getCourseTypeDataUrl = globel_.serverHost + "/api/manage/courseType?courseType=1000&offset=0",
			getSpecialColumnDataUrl = globel_.serverHost + "/api/manage/specialColumn?limit=1000&offset=0";
		this.$Loading.start();

		// 获取类别数据作为选择项
		this.$http.get( getCourseTypeDataUrl ).then(function(result){
			console.log("courseTypeData",result);
			that.courseTypeData = result.data.rows;
		}).catch(function(err){
			that.$Loading.error();
		});
		//获取专题数据作为选择项
		this.$http.get( getSpecialColumnDataUrl ).then(function(result){
			console.log("specialColumnData",result);
			that.specialColumnData = result.data.rows;
		}).catch(function(err){
			that.$Loading.error();
		})

		this.id = this.$route.query.id;
		if(this.id != 0){		//修改
			this.submitUrl = globel_.serverHost + globel_.configAPI.updataCourseById.replace(":id",this.id);
			let that = this,
				getDataUrl = globel_.serverHost + globel_.configAPI.getCourseDataById.replace(":id",this.id);
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
				// 数据赋值
				that.$Loading.finish();
				that.formItem = result.data;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error({duration:3,content:err});
			})
		}else{					//新建
			this.submitUrl = globel_.serverHost + globel_.configAPI.createCourse;
		}
	}
}
</script>

<style lang="css">
.addCourse{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
