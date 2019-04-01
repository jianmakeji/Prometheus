<template lang="html">
    <div class="eliteSchool">
        <Breadcrumb>
            <BreadcrumbItem>
                <Icon type="ios-build" size="24"/>名校试题管理
            </BreadcrumbItem>
        </Breadcrumb><br />
        <Button icon="md-add" type="primary" @click="newEliteSchool">新建</Button><br /><br />
        <Form label-position="right" :label-width="80" inline style="width:100%;">
			<FormItem label="年级">
				<Select v-model="grade" @on-change="gradeChange" label-in-value style="width:200px">
					<Option v-for="(item,index) in gradeData" :value="item.id" :key="index">{{item.title}}</Option>
				</Select>
			</FormItem>
			<FormItem label="科目">
	            <Select v-model="subject" @on-change="subjectChange" label-in-value style="width:200px">
					<Option v-for="(item,index) in subjectData" :value="item.id" :key="index">{{item.title}}</Option>
	            </Select>
	        </FormItem>
            <FormItem label="学校">
	            <Select v-model="schoolId" @on-change="schoolChange" label-in-value style="width:200px">
					<Option v-for="(item,index) in schoolData" :value="item.Id" :key="index">{{item.name}}</Option>
	            </Select>
	        </FormItem>
	    </Form>
        <Table :columns="columns" :data="dataList"></Table><br />
        <Page :total="total" show-total @on-change="pageChange"/>
        <Modal v-model="deleteModel" width="360" @on-ok="okTap">
	        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>确定要删除试题？</span>
	        </p>
	        <div style="text-align:center">
	            {{eliteSchoolTitle}}
	        </div>
	    </Modal>
    </div>
</template>

<script>
import globel_ from './../config/global.vue'
import $ from 'jquery'
export default {
	name:"eliteSchool",
	data(){
		return{
            id:"",
            offset:0,
            grade:0,
            subject:0,
            schoolId:0,
            gradeData: [{id:0,title:"全部"}],
			subjectData:[{id:0,title:"全部"}],
            schoolData:[],
			total:0,
            deleteModel:false,
            eliteSchoolTitle:"",
            columns:[
                { title: 'id', key: 'Id', align: 'center' ,width:90},
                { title: '名称', key: 'name', align: 'center' },
                { title: '年级', key: 'grade', align: 'center' ,
                    render:(h, params) => {
                        if(params.row.grade == "7"){
                            return h("p", this.gradeData[1].title)
                        }else if(params.row.grade == "8"){
                            return h("p", this.gradeData[2].title)
                        }else if(params.row.grade == "9"){
                            return h("p", this.gradeData[3].title)
                        }
                    }
                },
                { title: '科目', key: 'subject', align: 'center' ,
                    render:(h, params) => {
                        if(params.row.subject == "1"){
                            return h("p", this.subjectData[1].title)
                        }else if(params.row.subject == "2"){
                            return h("p", this.subjectData[2].title)
                        }else if(params.row.subject == "3"){
                            return h("p", this.subjectData[3].title)
                        }else if(params.row.subject == "4"){
                            return h("p", this.subjectData[4].title)
                        }
                    }
                },
                { title: '学校', key: 'school', align: 'center' ,
                    render:(h, params) => {
                        return h("p", this.dataList[params.index].school.name)
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
        		}
            ],
			dataList: []
		}
	},
	methods:{
        newEliteSchool(){
            this.$router.push({name:"addEliteSchool",query:{id:0}});
        },
        pageChange(index){
            this.offset = (index - 1) * 10;
            let that = this,
                getDataUrl = globel_.serverHost + globel_.configAPI.getEliteSchoolData;
            this.$Loading.start();
    		this.$http.get( getDataUrl ,{ params:{
                limit:10,
                offset:that.offset,
                grade:that.grade,
                subject:that.subject,
                schoolId:that.schoolId
            }}).then(function(result){
    			that.$Loading.finish();
    			that.dataList = result.data.rows;
    		}).catch(function(err){
    			that.$Loading.error();
    			that.$Message.error({duration:3,content:err});
    		})
        },
        gradeChange(option){
            let value = option.value;
			this.grade = value;
			let that = this,
				getDataUrl = globel_.serverHost+ globel_.configAPI.getEliteSchoolData;
			this.$Loading.start();

            this.$http.get( getDataUrl , { params:{
                limit:10,
                offset:that.offset,
                grade:that.grade,
                subject:that.subject,
                schoolId:that.schoolId
            }}).then(function(result){
                that.$Loading.finish();
                that.dataList = result.data.rows;
                that.total = result.data.count;
            }).catch(function(err){
                that.$Loading.error();
                that.$Message.error({duration:3,content:err});
            })
        },
        subjectChange(option){
            let value = option.value;
            this.subject = value;
            let that = this,
                getDataUrl = globel_.serverHost+ globel_.configAPI.getEliteSchoolData;
            this.$Loading.start();
            that.$http.get( getDataUrl ,{ params:{
                limit:10,
                offset:that.offset,
                grade:that.grade,
                subject:that.subject,
                schoolId:that.schoolId
            }}).then(function(result){
                that.$Loading.finish();
                that.dataList = result.data.rows;
                that.total = result.data.count;
            }).catch(function(err){
                that.$Loading.error();
                that.$Message.error({duration:3,content:err});
            })
        },
        schoolChange(option){
            let value = option.value;
            this.schoolId = value;
            let that = this,
                getDataUrl = globel_.serverHost+ globel_.configAPI.getEliteSchoolData;
            this.$Loading.start();
            that.$http.get( getDataUrl ,{ params:{
                limit:10,
                offset:that.offset,
                grade:that.grade,
                subject:that.subject,
                schoolId:that.schoolId
            }}).then(function(result){
                that.$Loading.finish();
                that.dataList = result.data.rows;
                that.total = result.data.count;
            }).catch(function(err){
                that.$Loading.error();
                that.$Message.error({duration:3,content:err});
            })
        },
        changeTap(index){
            let eliteSchoolId = this.dataList[index].Id;
			this.$router.push({name:"addEliteSchool",query:{id:eliteSchoolId}});
        },
        removeTap(index){
            this.index = index;
			this.deleteModel = true;
			this.eliteSchoolTitle = this.dataList[index].name;
        },
        okTap(){
            let that = this,
                deleteUrl = globel_.serverHost + globel_.configAPI.deleteEliteCourseById.replace(":id",this.dataList[this.index].Id);
            this.$Loading.start();
            this.$http.delete(deleteUrl).then(function(result){
                if(result.status == 200){
                    that.$Message.success({duration:3,content:globel_.configMessage.deleteSuccess});
                    let getDataUrl = globel_.serverHost + globel_.configAPI.getEliteCourseData;
            		that.$http.get( getDataUrl ,{params:{
                        limit:10,
                        offset:that.offset,
                        grade:that.grade,
                        subject:that.subject,
                        schoolId:that.schoolId
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
        }
	},
	created(){
        let that = this;
		this.$Loading.start();
        let getSchoolDataUrl = globel_.serverHost + globel_.configAPI.getSchoolData;
		this.$http.get( getSchoolDataUrl ,{params:{
            limit:1000,
            offset:0
        }}).then(function(result){
            that.gradeData = that.gradeData.concat(globel_.gradeData);
            that.subjectData = that.subjectData.concat(globel_.subjectData);
            that.schoolData = result.data.rows;
		}).catch(function(err){
			that.$Loading.error();
			that.$Message.error({duration:3,content:err});
		})

		let getDataUrl = globel_.serverHost + globel_.configAPI.getEliteSchoolData;
		this.$http.get( getDataUrl ,{ params:{
            limit:10,
            offset:that.offset,
            grade:that.grade,
            subject:that.subject,
            schoolId:that.schoolId
        }}).then(function(result){
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
.eliteSchool{
	padding: 20px;
}
</style>
