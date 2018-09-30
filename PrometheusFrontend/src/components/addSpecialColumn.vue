<template lang="html">
	<div class="addSpecialColumn">
		<Breadcrumb>
	        <BreadcrumbItem  to="/videoType">
	            <Icon type="ios-build" size="24"/>视频类别管理
	        </BreadcrumbItem>
			<BreadcrumbItem>
	            <Icon type="md-add" size="24"/>新建视频类别
	        </BreadcrumbItem>
	    </Breadcrumb><br>
		<Form :model="formItem" :label-width="80">
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
		   	<FormItem label="类别名称:">
			   	<Input v-model="formItem.title" placeholder="请输入视频类别名称..." clearable></Input>
		   	</FormItem>
		   	<FormItem label="所属专栏:">
				<Select v-model="formItem.specialColumn" placeholder="选择类型...">
	                <Option value="beijing">精品课程</Option>
	                <Option value="shanghai">专题突破</Option>
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
	name:"addSpecialColumn",
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
			formItem:{
				title:"",
				specialColumn:"",
				thumb:uploadImage
			}
		}
	},
	methods:{
		submitClick(){
			console.log("submit");
		},
		//图片上传事件没实现
		handleSuccess(res, file) {
			this.formItem.thumb = hostPrefix + g_object_name + "?x-oss-process=style/thumb-300";
			this.formItem.imageUrl = hostPrefix + g_object_name;
		},
		handleFormatError(file) {
			this.$Message.error("文件格式错误！");
		},
		handleMaxSize(file) {
			this.$Message.error("文件不能超过2M！");
		},
		handleBeforeUpload(file) {
			let message = this.$Message;
			var self = this;

			this.$http.get('/api/uploadKey/1').then(function(result){
				self.$refs.upload.data.host = result.host;
 			   	self.$refs.upload.data.policy = result.policy;
 			   	self.$refs.upload.data.OSSAccessKeyId = result.accessid;
 			   	self.$refs.upload.data.signature = result.signature;
 			   	self.$refs.upload.data.callback = '';
 			   	key = result.dir;
 			   	g_object_name = result.dir;
 			   	calculate_object_name(file.name)
 			   	self.$refs.upload.data.key = g_object_name;
			}).catch(function(err){
			    alert(err);
			})

		}
	},
	created(){
		// console.log(this.$route.query.id);
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
.addSpecialColumn{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
