<template lang="html">
  	<div class="course">
		<Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>名校试题视频管理
			</BreadcrumbItem>
		</Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newEliteCourse">新建</Button><br /><br />
		<Form label-position="right" :label-width="80" inline style="width:100%;">
			<FormItem label="试题">
				<Select v-model="eliteSchoolId" @on-change="eliteSchoolChange" label-in-value style="width:200px">
					<Option v-for="(item,index) in eliteSchoolData" :value="item.Id" :key="index">{{item.name}}</Option>
				</Select>
			</FormItem>
	    </Form>
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
        <Modal v-model="previewModal" width="60%" footer-hide @on-visible-change="visibleChange">
			<p slot="header" style="color:#19be6b;text-align:center;font-size:18px;">
	            <Icon type="md-eye" />
	            <span>{{videoTitle}}</span>
	        </p>
			<div style="text-align:center">
                <video id="media" :src="videoUrl" controls style="width:100%;height:auto;" autoplay>
                    <!-- <source :src="videoUrl" type="video/mp4"> -->
                </video>
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
import Qrcode from '@xkeshi/vue-qrcode'
import $ from 'jquery'
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
            previewModal:false,
            videoUrl:"",

			eliteSchoolData:[{Id:0,name:"全部"}],
			specialColumnId:0,courseTypeId:0,
            specialColumnLabel:"",courseTypeLabel:"",

			eliteSchoolId:0,
            columns:[
                // { title: 'id', key: 'Id', align: 'center' ,width:90},
                { title: '名称', key: 'name', align: 'center' },
                { title: '试题', key: 'eliteSchoolId', align: 'center',
                	render:(h, params) =>{
                		return h('div',[
                            h('p', params.row.elite_school ? params.row.elite_school.name : "无")
                		])
                	}
                },
                { title: '视频预览',key: 'opt', align: 'center', width: 100,
                    render:(h, params) =>{
                		return h('div',[
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
        								this.previewVideo(params.index)
        							}
        						}
        					}, '查看')
                		])
                	}
                },
                { title: '时长', key: 'duration', align: 'center',width:90,
                    render:(h, params) =>{
                        return h('div',[
                            h('p', parseInt(params.row.duration / 60) + ":" + (parseInt(params.row.duration % 60 / 10) ? params.row.duration % 60 : "0" + params.row.duration % 60))
                        ])
                    }
                },
                { title: '二维码预览',key: 'opt', align: 'center', width: 150,
                    render:(h, params) =>{
                        if (params.row.qrCode == null || params.row.qrCode == "") {
                            return h('p', {
                                style:{
                                    color:"#ed3f14"
                                }
                            },"该课程暂无二维码")
                        }else{
                            return h('div', [
                                h('img', {
            						domProps: {
            							src: params.row.qrCode,
            						},
            						style: {
                                        width:"60px",
            							width:"60px",
                                        margin:"10px auto"
            						}
            					})
                            ])
                        }
                	}
                },
                { title: '操作', key: 'opt', align: 'center',width:160,
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
        					},'删除')
        				])
        			}
        		},
                { title: '二维码操作', key: 'opt', align: 'center',width:160,
        			render: (h, params) => {
                        if(params.row.qrCode){
                            return h('Button', {
        						props: {
        							type: 'info',
        							size: 'small',
                                    disabled:true
        						},
        						style: {
        							marginRight: '5px'
        						},
        						on: {
        							click: () => {
        								this.generateCode(params.index)
        							}
        						}
        					},'已生成二维码')
                        }else{
                            return h('Button', {
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
                        }

        			}
        		}
            ],
			dataList: []
		}
	},
	components:{
        qrcode : Qrcode
    },
	methods:{
		pageChange(index){
            this.offset  = (index-1)*10;
            let that = this,
				getDataUrl = globel_.serverHost + globel_.configAPI.getCourseByCondition + this.offset +'&courseType='+ this.courseTypeId + '&specialColumn=' + this.specialColumnId;
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
		newEliteCourse(){
			this.$router.push({name:"addEliteCourse",query:{id:0}});
		},
        previewVideo(index){
            this.previewModal = true;
			this.videoTitle = this.dataList[index].name;
            this.videoUrl = this.dataList[index].videoAddress
        },
        visibleChange(boolean){
            var Media = document.getElementById("media");
            if(!boolean){
                Media.pause();
            }
        },
		//修改
		changeTap(index){
			let videoId = this.dataList[index].Id;
			this.$router.push({name:"addEliteCourse",query:{id:videoId}});
		},
		//删除
		removeTap(index){
			this.index = index;
			this.deleteModel = true;
			this.videoTitle = this.dataList[index].name;
		},
        // 生成二维码
        generateCode(index){
            let that = this,
				getDataUrl = globel_.serverHost + globel_.configAPI.getEliteCourseQRCode;
			this.$Loading.start();
			this.$http.get(getDataUrl,{params:{
                id:this.dataList[index].Id
            }}).then(function(result){
				if(result.data.status == 200){
					that.$Message.success({
                        duration:2,content:globel_.configMessage.createCodeSuccess,
                        onClose(){
                            let getNexDataUrl = globel_.serverHost+ globel_.configAPI.getCourseByCondition + that.offset +'&courseType='+ that.courseTypeId + '&specialColumn=' + that.specialColumnId;
                    		that.$http.get( getNexDataUrl ).then(function(result){
                    			that.$Loading.finish();
                                that.dataList = [];
                    			that.dataList = result.data.rows;
                    		}).catch(function(err){
                    			that.$Loading.error();
                    			that.$Message.error({duration:2,content:err});
                    		})
                        }
                    });

				}
			}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:3,content:err});
			})
		},
		okTap(){
			let that = this,
				deleteUrl = globel_.serverHost + globel_.configAPI.deleteEliteCourseById.replace(":id",this.dataList[this.index].Id);
			this.$Loading.start();
			this.$http.delete(deleteUrl).then(function(result){
				if(result.status == 200){
					that.$Message.success({duration:3,content:globel_.configMessage.deleteSuccess});
					let getDataUrl = globel_.serverHost + globel_.configAPI.getEliteCourseData;
					that.$http.get( getDataUrl,{params:{
                        limit:10,
                        offset:that.offset,
                        eliteSchoolId:that.eliteSchoolId
                    }}).then(function(result){
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
		eliteSchoolChange(option){
            let value = option.value;
			this.eliteSchoolId = value;
			let that = this,
                getDataUrl = globel_.serverHost+ globel_.configAPI.getEliteCourseData;
            this.$http.get( getDataUrl,{params:{
                limit:10,
                offset:this.offset,
                eliteSchoolId:this.eliteSchoolId
            }}).then(function(result){
                console.log(result);
                that.$Loading.finish();
                that.dataList = result.data.rows;
                that.total = result.data.count;
            }).catch(function(err){
                that.$Loading.error();
                that.$Message.error({duration:3,content:err});
            })
		}
	},
	created(){
		let that = this,
			getEliteSchoolData = globel_.serverHost + globel_.configAPI.getEliteSchoolData;
		this.$Loading.start();

		// 获取试题数据作为选择项
		this.$http.get( getEliteSchoolData ).then(function(result){
			that.eliteSchoolData = that.eliteSchoolData.concat(result.data.rows);
		}).catch(function(err){
            that.$Loading.error();
            that.$Message.error({duration:3,content:err});
		});

		let getDataUrl = globel_.serverHost+ globel_.configAPI.getEliteCourseData;
		this.$http.get( getDataUrl,{params:{
            limit:10,
            offset:this.offset,
            eliteSchoolId:this.eliteSchoolId
        }}).then(function(result){
            console.log(result);
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

<style lang="css" scoped>
.course{
	padding: 20px;
}
</style>
