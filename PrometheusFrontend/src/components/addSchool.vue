<template lang="html">
  	<div class="addSchool">
		<Breadcrumb>
  			<BreadcrumbItem to="/school">
  				<Icon type="ios-build" size="24"/>学校管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>{{BreadcrumbTitle}}
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">
            <FormItem label="封面图:">
				<img v-if="imgUrl.length" :src="imgUrl" style="width:80px;height:80px;" class="schoolImg"><br>
                <input type="file" @change="doUpload" ref="inputFile" accept="image/*"/>
				<Progress :percent="progressPercent" />
	        </FormItem>
		   	<FormItem label="学校名:">
			   	<Input v-model="formItem.name" placeholder="请输入视频名称..." clearable></Input>
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
	name:"addSchool",
	data(){
		return{
			id:"",
            BreadcrumbTitle:"",
			submitUrl:"",
			gradeData:globel_.gradeData,
            imgUrl:"",
            progressPercent:0,
			formItem:{
				name: "",
		        thumb: "",
			}
		}
	},
	methods:{
        doUpload(files){
            let that = this;
            var file = files.target.files[0]; //获取要上传的文件对象
            this.$http({
                method: 'get',
                url: globel_.serverHost + '/api/getSTSSignature/1'
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
            client.multipartUpload('courseImages/' + newFilename, file, {
    	        progress(p) {
    	            that.progressPercent = p * 100;
    	        }
            }).then(function(result) {
    			that.$http.get(globel_.serverHost + globel_.configAPI.getUrlSignature + result.name).then(function(result){
                    that.fileImage = newFilename;
                  	that.$Loading.finish();
    	            that.$Message.success({
    	              duration: 2,
    	              content: globel_.configMessage.uploadImgSuccess
    	            });
    				that.imgUrl = result.data;
    			}).catch(function(err){
    				that.$Loading.error();
    				that.$Message.success({
    				  duration: 2,
    				  content:err
    				});
    			})

            }).catch(function(err) {
    			that.$Loading.error();
    			that.$Message.success({
    			  duration: 2,
    			  content: err
    			});
            });
          }).catch((err) => {
    		  that.$Loading.error();
    		  that.$Message.success({
    			duration: 2,
    			content: err
    		  });
          });
        },
		submitClick(){

		},
	},
	created(){
		this.id = this.$route.query.id;
		if(this.id != 0){		//修改
            this.BreadcrumbTitle  = "修改学校";
			// this.submitUrl = globel_.serverHost + globel_.configAPI.updataCourseById.replace(":id",this.id);
		}else{					//新建
            this.BreadcrumbTitle  = "新建学校";
			// this.submitUrl = globel_.serverHost + globel_.configAPI.createCourse;
		}
	}
}
</script>

<style lang="css" scoped>
.addSchool{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
.schoolImg{
    width:120px;
    height: auto;
}
</style>
