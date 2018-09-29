<template lang="html">
  	<div class="videoAlter">
		<Breadcrumb>
  			<BreadcrumbItem to="/videoManage">
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
			        <Button icon="ios-cloud-upload-outline">上传视频文件</Button>
			    </Upload>
		   	</FormItem>


		   	<FormItem label="视频名:">
			   	<Input v-model="formItem.title" placeholder="请输入视频名称..." clearable></Input>
		   	</FormItem>
			<FormItem label="视频介绍:">
			   	<Input v-model="formItem.introduce" type="textarea" placeholder="请输入视频介绍..."></Input>
		   	</FormItem>
			<FormItem label="专题:">
	            <Select v-model="formItem.specialColumn" placeholder="选择专题...">
	                <Option value="beijing">精品课程</Option>
	                <Option value="shanghai">专题突破</Option>
	            </Select>
	        </FormItem>
			<FormItem label="课程类别:">
	            <Select v-model="formItem.type" placeholder="选择类别...">
	                <Option value="beijing">领先课堂</Option>
	                <Option value="shanghai">培优课堂</Option>
					<Option value="shenzhen">汇智课堂</Option>
					<Option value="shenzhen">计算专题</Option>
					<Option value="shenzhen">几何专题</Option>
	                <Option value="shenzhen">压轴题专题</Option>
	            </Select>
	        </FormItem>
			<FormItem label="年级:">
	            <Select v-model="formItem.grade" placeholder="选择年级...">
	                <Option value="beijing">七年级</Option>
	                <Option value="shanghai">八年级</Option>
	                <Option value="shenzhen">九年级</Option>
	            </Select>
	        </FormItem>
			<FormItem>
				<Button type="primary" long @click="submitClick">提交</Button>
			</FormItem>
		</Form>
  	</div>
</template>

<script>

var g_object_name = "";
var key = '';
var hostPrefix = "http://dc-yl.oss-cn-hangzhou.aliyuncs.com/";

var uploadImage = "https://www.baidu.com/img/bd_logo1.png?where=super";
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
	name:"videoAlter",
	data(){
		return{
			id:"",
			submitUrl:"",
			//图片上传参数
			g_object_name: '',
			policyBase64: '',
			accessid: '',
			callbackbody: '',
			signature: '',
			host: hostPrefix,
			//视频上传参数
			videoHost:"",

			formItem:{
				thumb:uploadImage,
				videoName:"",
				introduce:"",
				specialColumn:"",
				type:"",
				grade:""
			}
		}
	},
	methods:{
		submitClick(){
			console.log("submit");
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
.videoAlter{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
