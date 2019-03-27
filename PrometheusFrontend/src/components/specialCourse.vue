<template lang="html">
  	<div class="specialCourse">
		<Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>视频管理
			</BreadcrumbItem>
		</Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newSpecialCourse">新建</Button><br /><br />
		<Form :model="formItem" label-position="right" :label-width="80" inline style="width:100%;">
			<FormItem label="专栏">
	            <Select v-model="formItem.specialColumnId" @on-change="specialColumnChange" label-in-value style="width:200px">
					<Option v-for="(item,index) in specialColumnData" :value="item.Id" :key="index">{{item.name}}</Option>
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
		<!-- <Modal v-model="codeModal"  @on-ok="downloadCode" ok-text="下载图片至本地">
			<p slot="header" style="color:#19be6b;text-align:center;font-size:18px;">
	            <Icon type="ios-brush-outline" />
	            <span>{{codeTitle}}</span>
	        </p>
			<div style="text-align:center" v-show="qrcodeUrl" class="response">
				<qrcode id="codeImage" :value="qrcodeUrl" v-if="qrcodeUrl"	:options="{ size: 120 }"></qrcode>
			</div>
	    </Modal> -->
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
	name:"specialCourse",
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

			specialColumnData:[{Id:0,name:"全部"}],
			specialColumnId:0,
            specialColumnLabel:"",

			formItem:{
				specialColumn:0,	//专题
			},
            columns:[
                // { title: 'id', key: 'Id', align: 'center' ,width:90},
                { title: '名称', key: 'name', align: 'center' },
                { title: '专栏', key: 'special_column', align: 'center',
                	render:(h, params) =>{
                		return h('div',[
                            h('p', params.row.special_column.name ? params.row.special_column.name : this.specialColumnLabel)
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
				getDataUrl = globel_.serverHost + globel_.configAPI.getSpecialCourseData;
			this.$Loading.start();
			this.$http.get( getDataUrl ,{params:{
                limit:10,
                offset:that.offset,
                specialColumnId:that.specialColumnId
            }}).then(function(result){
				that.$Loading.finish();
				that.dataList = result.data.rows;
				that.total = result.data.count;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error({duration:3,content:err});
			})
		},
		newSpecialCourse(){
			this.$router.push({name:"addSpecialCourse",query:{id:0}});
		},
        previewVideo(index){
            this.previewModal = true;
			this.videoTitle = this.dataList[index].name;
            this.videoUrl = this.dataList[index].videoAddress;

        },
        visibleChange(boolean){
            var Media = document.getElementById("media");
            if(!boolean){
                Media.pause();
            }
        },
		//修改
		changeTap(index){
			let specialCourseId = this.dataList[index].Id;
			this.$router.push({name:"addSpecialCourse",query:{id:specialCourseId}});
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
				getDataUrl = globel_.serverHost + globel_.configAPI.getSpecialCourseQRCode;
			this.$Loading.start();
			this.$http.get(getDataUrl,{params:{
                id:this.dataList[index].Id
            }}).then(function(result){
				if(result.data.status == 200){
					that.$Message.success({
                        duration:2,content:globel_.configMessage.createCodeSuccess,
                        onClose(){
                            let getNexDataUrl = globel_.serverHost+ globel_.configAPI.getSpecialCourseData;
                    		that.$http.get( getNexDataUrl ,{params:{
                                limit:10,
                                offset:that.offset,
                                specialColumnId:that.specialColumnId
                            }}).then(function(result){
                    			that.$Loading.finish();
                                that.dataList = [];
                    			that.dataList = result.data.rows;
                    		}).catch(function(err){
                    			that.$Loading.error();
                    			that.$Message.error({duration:2,content:err});
                    		})
                        }
                    });

				}else{
                    that.$Message.error({
                        duration:2,content:globel_.configMessage.createCodeError,
                    });
                }
			}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:3,content:err});
			})
		},
		okTap(){
			let that = this,
				deleteUrl = globel_.serverHost + globel_.configAPI.deleteSpecialCourseById.replace(":id",this.dataList[this.index].Id);
			this.$Loading.start();
			this.$http.delete(deleteUrl).then(function(result){
                console.log(result);
				if(result.status == 200){
					that.$Message.success({duration:3,content:globel_.configMessage.deleteSuccess});
					let getDataUrl = globel_.serverHost + globel_.configAPI.getSpecialCourseData;
					that.$http.get( getDataUrl,{params:{
                        limit:10,
                        offset:that.offset,
                        specialColumnId:that.specialColumnId
                    }}).then(function(result){
						that.$Loading.finish();
						that.dataList = result.data.rows;
						that.total = result.data.count;
					}).catch(function(err){
						that.$Loading.error();
						that.$Message.error({duration:3,content:err});
					})
				}else{
                    that.$Message.error({duration:3,content:globel_.configMessage.optError});
                }
			}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:3,content:err});
			})
		},
		specialColumnChange(option){
            let value = option.value;
			this.specialColumnId = value;
			let that = this,
				getDataUrl = globel_.serverHost+ globel_.configAPI.getSpecialCourseData;
			this.$Loading.start();
			this.$http.get( getDataUrl ,{params:{
                limit:10,
                offset:that.offset,
                specialColumnId:that.specialColumnId
            }}).then(function(result){
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
		let that = this,
			getSpecialColumnDataUrl = globel_.serverHost + globel_.configAPI.getSpecialColumnData;
		this.$Loading.start();
		//获取专栏数据作为选择项
		this.$http.get( getSpecialColumnDataUrl ,{params:{
            limit:1000,
            offset:0
        }}).then(function(result){
			that.specialColumnData = that.specialColumnData.concat(result.data.rows);
		}).catch(function(err){
            that.$Message.error({duration:3,content:err});
		});

		let getDataUrl = globel_.serverHost+ globel_.configAPI.getSpecialCourseData;
		this.$http.get( getDataUrl ,{params:{
            limit:10,
            offset:this.offset,
            specialColumnId:this.specialColumnId
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
.specialCourse{
	padding: 20px;
}
</style>
