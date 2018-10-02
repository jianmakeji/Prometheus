<template lang="html">
  	<div class="course">
		<Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>视频管理
			</BreadcrumbItem>
		</Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newVideo">新建</Button><br /><br />
		<Form :model="formItem" label-position="right" :label-width="80" inline style="width:100%;">
			<FormItem label="类别">
				<Select v-model="formItem.courseType" @on-change="courseTypeChange">
					<Option v-for="item in courseTypeData" :value="item.Id">{{item.name}}</Option>
				</Select>
			</FormItem>
			<FormItem label="专栏">
	            <Select v-model="formItem.specialColumn" @on-change="specialColumnChange">
					<Option v-for="item in specialColumnData" :value="item.Id">{{item.name}}</Option>
	            </Select>
	        </FormItem>
	    </Form>
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
		<Modal v-model="codeModal"  @on-ok="downloadCode" ok-text="下载图片至本地">
			<p slot="header" style="color:#19be6b;text-align:center;font-size:18px;">
	            <Icon type="ios-brush-outline" />
	            <span>{{codeTitle}}</span>
	        </p>
			<div style="text-align:center" v-show="qrcodeUrl" class="response">
				<qrcode id="codeImage" :value="qrcodeUrl" v-if="qrcodeUrl"	:options="{ size: 120 }"></qrcode>
			</div>
	    </Modal>
		<Modal v-model="deleteModel" width="360" @on-ok="okTap">
	        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>确定要删除视频</span>
	        </p>
	        <div style="text-align:center">
	            {{videoTitle}}
	        </div>
	    </Modal>
  	</div>
</template>

<script>
import globel_ from './../config/global.vue'
import Qrcode from '@xkeshi/vue-qrcode';


var courseTypeObj = {
	title: '类别',
	key: 'courseType',
	align: 'center',
	render:(h, params) =>{
		return h('div',[
			h('p', params.row.course_type.name)
		])
	}
},
specialColumnObj = {
	title: '专栏',
	key: 'specialColumn',
	align: 'center',
	render:(h, params) =>{
		return h('div',[
			h('p', params.row.special_column.name)
		])
	}
},
	tableHeadeBefore = [
	{
		title: 'id',
		key: 'Id',
		align: 'center'
	},
	{
		title: '名称',
		key: 'name',
		align: 'center'
	}
],
	tableHeadeBetween = [
		courseTypeObj,specialColumnObj
	],
	tableHeadBehind = [
		{ title: '操作', key: 'opt', align: 'center',
			render: (h, params) => {
				return h("div",[
					h('Button', {
						props: {
							type: 'primary',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {
								this.changeTap(params.index)
							}
						}
					}, '修改'),
					h('Button', {
						props: {
							type: 'error',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {
								this.removeTap(params.index)
							}
						}
					},'删除'),
					h('Button', {
						props: {
							type: 'info',
							size: 'small'
						},
						style: {
							marginRight: '5px'
						},
						on: {
							click: () => {
								this.generateCode(params.index)
							}
						}
					},'生成二维码')
				])
			}
		}
	];
export default {
	name:"course",
	data(){
		return{
			id:"",
			offset:0,
			index:"",
			deleteModel:false,
			videoTitle:"",
			qrcodeUrl:"", 		//二维码url内容
			codeTitle:"",		//弹出层标题(视频名称)
			codeModal:false,
			total:0,

			specialColumnData:[{Id:0,name:"全部"}],courseTypeData:[{Id:0,name:"全部"}],
			specialColumnId:0,courseTypeId:0,

			formItem:{
				specialColumn:0,	//专题
				courseType:0			//类型
			},
			columns:[],
			dataList: []
		}
	},
	components:{
        qrcode : Qrcode
    },
	methods:{
		pageChange(index){
			console.log(index);
		},
		newVideo(){
			this.$router.push({name:"addCourse",query:{id:0}});
		},
		//修改
		changeTap(index){
			let videoId = this.dataList[index].Id;
			console.log(videoId);
			this.$router.push({name:"addCourse",query:{id:videoId}});
		},
		//删除
		removeTap(index){
			console.log(index);
			this.index = index;
			this.deleteModel = true;
			this.videoTitle = this.dataList[index].title;
		},
		//生成二维码
		generateCode(index){
			this.index = index;
			this.codeModal = true;
			this.codeTitle = this.dataList[this.index].title;
			this.qrcodeUrl = this.dataList[this.index].codeUrl;
		},
		//下载二维码
		downloadCode(){
			let myCanvas = document.getElementById('codeImage');
			let a = document.createElement("a");
			a.href = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
			a.download = this.dataList[this.index].title +".png";
			a.click();
		},
		okTap(){
			let that = this,
				deleteUrl = globel_.serverHost + globel_.configAPI.deleteCourseById.replace(":id",this.dataList[this.index].Id);
			this.$Loading.start();
			this.$http.delete(deleteUrl).then(function(result){
				if(result.status == 200){
					that.$Message.success({duration:3,content:globel_.configMessage.deleteSuccess});
					let getDataUrl = globel_.serverHost + globel_.configAPI.getCourseData + that.offset;
					that.$http.get( getDataUrl ).then(function(result){
						that.$Loading.finish();
						that.dataList = result.data.rows;
						that.total = result.data.count;
					}).catch(function(err){
						that.$Loading.error();
						that.$Message.error({duration:3,content:err});
					})
				}
			}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:3,content:err});
			})
		},
		courseTypeChange(value){
			if(value != 0){		//确定一个类型
				if(tableHeadeBetween.length == 2){				//删除第一个元素
					tableHeadeBetween = tableHeadeBetween.splice(1,1);
					this.columns = tableHeadeBefore.concat(tableHeadeBetween, tableHeadBehind);
				}else if(tableHeadeBetween.length == 1 && tableHeadeBetween[0].title == "类别"){
					tableHeadeBetween = tableHeadeBetween.splice(1,1);
					this.columns = tableHeadeBefore.concat(tableHeadeBetween, tableHeadBehind);
				}
			}else{												//添加为第一个元素
				tableHeadeBetween.unshift(courseTypeObj);
				this.columns = tableHeadeBefore.concat(tableHeadeBetween, tableHeadBehind);
			}
			this.courseTypeId = value;
			let that = this,
				getDataUrl = globel_.serverHost+ globel_.configAPI.getCourseByCondition + this.offset +'&courseType='+ this.courseTypeId + '&specialColumn=' + this.specialColumnId;
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
				that.$Loading.finish();
				that.dataList = result.data.rows;
				that.total = result.data.count;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error({duration:3,content:err});
			})
		},
		specialColumnChange(value){
			if(value != 0){					//删除最后一个元素
				if(tableHeadeBetween.length == 2){
					tableHeadeBetween.pop();
					this.columns = tableHeadeBefore.concat(tableHeadeBetween, tableHeadBehind);
				}else if(tableHeadeBetween.length == 1 && tableHeadeBetween[0].title == "专栏"){
					tableHeadeBetween.pop();
					this.columns = tableHeadeBefore.concat(tableHeadeBetween, tableHeadBehind);
				}
				console.log(tableHeadeBetween);
			}else{							//添加为最后一个元素
				tableHeadeBetween.push(specialColumnObj);
				this.columns = tableHeadeBefore.concat(tableHeadeBetween, tableHeadBehind);
				console.log(tableHeadeBetween);
			}
			this.specialColumnId = value;
			let that = this,
				getDataUrl = globel_.serverHost+ globel_.configAPI.getCourseByCondition + this.offset +'&courseType='+ this.courseTypeId + '&specialColumn=' + this.specialColumnId;
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
				that.$Loading.finish();
				that.dataList = result.data.rows;
				that.total = result.data.count;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error({duration:3,content:err});
			})
		},
	},
	created(){
		this.columns = tableHeadeBefore.concat(tableHeadeBetween, tableHeadBehind);
		console.log(tableHeadeBetween);
		let that = this,
			getCourseTyoeDataUrl = globel_.serverHost + "/api/manage/courseType?limit=1000&offset=0",
			getSpecialColumnDataUrl = globel_.serverHost + "/api/manage/specialColumn?limit=1000&offset=0";
		this.$Loading.start();

		// 获取类别数据作为选择项
		this.$http.get( getCourseTyoeDataUrl ).then(function(result){
			that.courseTypeData = that.courseTypeData.concat(result.data.rows);
		}).catch(function(err){
			that.$Loading.error();
		});
		//获取专栏数据作为选择项
		this.$http.get( getSpecialColumnDataUrl ).then(function(result){
			that.specialColumnData = that.specialColumnData.concat(result.data.rows);
		}).catch(function(err){
			that.$Loading.error();
		});

		let getDataUrl = globel_.serverHost+ globel_.configAPI.getCourseByCondition + this.offset +'&courseType='+ this.courseTypeId + '&specialColumn=' + this.specialColumnId;
		this.$http.get( getDataUrl ).then(function(result){
			that.$Loading.finish();
			that.dataList = result.data.rows;
			that.total = result.data.count;
		}).catch(function(err){
			that.$Loading.error();
			that.$Message.error({duration:3,content:err});
		})
	}
}
</script>

<style lang="css">
.course{
	padding: 20px;
}
.ivu-select-selection{
	width: 200px;
}
</style>
