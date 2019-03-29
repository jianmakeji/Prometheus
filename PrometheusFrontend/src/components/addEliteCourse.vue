<template lang="html">
  	<div class="addEliteCourse">
		<Breadcrumb>
  			<BreadcrumbItem to="/eliteCourse">
  				<Icon type="ios-build" size="24"/>名校试题视频管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>{{BreadcrumbTitle}}
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">

			<!-- 视频上传 -->
			<FormItem label="视频文件:">
                <input type="file" @change="doVideoUpload" ref="inputFile" accept="audio/mp4,video/mp4"/>
				<Progress :percent="videoProgressPercent" />
		   	</FormItem>

		   	<FormItem label="视频名:">
			   	<Input v-model="formItem.name" :maxlength="24" placeholder="请输入视频名称(不超过24个字符)" clearable></Input>
		   	</FormItem>
			<FormItem label="视频介绍:">
			   	<Input v-model="formItem.describe" type="textarea" placeholder="请输入视频介绍..."></Input>
		   	</FormItem>
			<FormItem label="试题:">
	            <Select v-model="formItem.eliteSchoolId" placeholder="选择试题...">
	                <Option v-for="(item,index) in eliteSchoolData" :value="item.Id" :key="index">{{item.name}}</Option>
	            </Select>
	        </FormItem>
            <FormItem label="老师:">
	            <Select v-model="formItem.teacherId" placeholder="选择老师...">
	                <Option v-for="(item,index) in teacherData" :value="item.Id" :key="index">{{item.name}}</Option>
	            </Select>
	        </FormItem>
            <FormItem label="时长:">
	            <InputNumber v-model="formItem.duration"></InputNumber> s
	        </FormItem>
			<FormItem>
				<Button type="primary" long @click="submitClick">提交</Button>
			</FormItem>
		</Form>
  	</div>
</template>

<script>
import globel_ from './../config/global.vue'
import $ from 'jquery'
import OSS from 'ali-oss'

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
	name:"addEliteCourse",
	data(){
		return{
			id:"",
            BreadcrumbTitle:"",
			submitUrl:"",
			gradeData:globel_.gradeData,

            videoProgressPercent:0,
            fileVideo:"",

            teacherData:[],
			eliteSchoolData:[],
			formItem:{
				name: "",
		        describe: "",
		        eliteSchoolId: "",
                teacherId:"",
		        videoAddress: "",
                duration:0
			}
		}
	},
	methods:{
		submitClick(){
            this.formItem.videoAddress = this.fileVideo;
			let that = this;
			this.$Loading.start();
			if(this.id == 0){		//新建	post
				this.$http.post( this.submitUrl ,{
					name:this.formItem.name,
					describe:this.formItem.describe,
					eliteSchoolId:this.formItem.eliteSchoolId,
                    teacherId:this.formItem.teacherId,
					videoAddress:this.formItem.videoAddress,
                    duration:this.formItem.duration
				}).then(function(result){
					if(result.status == 200){
						that.$Loading.finish();
						that.$Message.success({duration:2,content:globel_.configMessage.operateSuccess});
						setTimeout(function(){
							that.$router.push({name:"eliteCourse"});
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
					eliteSchoolId:this.formItem.eliteSchoolId,
                    teacherId:this.formItem.teacherId,
					videoAddress:this.formItem.videoAddress,
                    duration:this.formItem.duration
				}).then(function(result){
					if(result.status == 200){
						that.$Loading.finish();
						that.$Message.success({duration:2,content:globel_.configMessage.operateSuccess});
						setTimeout(function(){
							that.$router.push({name:"eliteCourse"});
						},3000)
					}
				}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:2,content:err});
				})
			}
		},
        priceChange(num) {
          this.formItem.price = num;
        },
      //视频上传
      doVideoUpload(files) {
          let that = this;
          var file = files.target.files[0]; //获取要上传的文件对象
          this.$http({
              method: 'get',
            url: globel_.serverHost + '/api/getSTSSignature/2'
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
            client.multipartUpload('courseVideos/' + newFilename, file, {
                progress(p) {
                    that.videoProgressPercent = p * 100;
                }
            }).then(function(result) {
                that.$http.get(globel_.serverHost + globel_.configAPI.getUrlSignature + result.name).then(function(result){
                    that.fileVideo = newFilename;
                    that.$Loading.finish();
                    that.$Message.success({
                        duration: 2,
                        content: globel_.configMessage.uploadVideoSuccess
                    });
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
	},
	created(){
		let that = this,
            getTeacherDataUrl = globel_.serverHost + globel_.configAPI.getTeacherData,
			getEliteSchoolDataUrl = globel_.serverHost + globel_.configAPI.getEliteSchoolData;
		this.$Loading.start();

        //获取老师数据作为选择项
		this.$http.get( getTeacherDataUrl,{params:{
            limit:1000,
            offset:0
        }} ).then(function(result){
			that.teacherData = result.data.rows;
		}).catch(function(err){
			that.$Loading.error();
		})
		//获取专题数据作为选择项
		this.$http.get( getEliteSchoolDataUrl,{params:{
            limit:1000,
            offset:0,
            grade:0,
            subject:0,
            schoolId:0
        }} ).then(function(result){
			that.eliteSchoolData = result.data.rows;
		}).catch(function(err){
			that.$Loading.error();
		})

		this.id = this.$route.query.id;
		if(this.id != 0){		//修改
            this.BreadcrumbTitle  = "修改试题视频";
            this.videoProgressPercent = 100;
			this.submitUrl = globel_.serverHost + globel_.configAPI.updateEliteCourseById.replace(":id",this.id);
			let that = this,
				getDataUrl = globel_.serverHost + globel_.configAPI.updateEliteCourseById.replace(":id",this.id);
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
                that.fileVideo = result.data.videoAddress.replace(globel_.aliHttp + "courseVideos/",'').split('?')[0];
				// 数据赋值
				that.$Loading.finish();
				that.formItem = result.data;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error({duration:3,content:err});
			})
		}else{					//新建
            this.BreadcrumbTitle  = "新建试题视频";
			this.submitUrl = globel_.serverHost + globel_.configAPI.createEliteCourse;
		}
	}
}
</script>

<style lang="css" scoped>
.addEliteCourse{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
.specialColumnImg{
    width:120px;
    height: auto;
}
</style>
