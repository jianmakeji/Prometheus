<template lang="html">
	<div class="specialCode">
		<Breadcrumb>
	        <BreadcrumbItem>
	            <Icon type="ios-build" size="24"/>专题码管理
	        </BreadcrumbItem>
	    </Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newSpecialCode">新建</Button><br /><br />
        <div class="code">
            <p>专题码：</p>
            <Input v-model="code" placeholder="输入专题码" clearable @on-enter="searchByCode"/>
        </div>
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
        <Modal v-model="previewModal" width="720" footer-hide>
	        <p slot="header" style="color:#19be6b;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>该码对应专题</span>
	        </p>
	        <div style="text-align:center">
	            <p class="specialColumnName" v-for="item in codeSpecialColumnData">{{item}}</p>
	        </div>
	    </Modal>
    </div>
</template>

<script>
import globel_ from './../config/global.vue'
export default {
    name:"specialCode",
    data () {
        return {
			offset:0,
            code:"",
			specialColumnTitle:"",
			index:"",
			total:0,
            previewModal:false,
            codeSpecialColumnData:[],
            specialColumnData:[],
			columns:[
				{ 	title: 'id',	key: 'Id',	align: 'center'	},
                { title: '专题码', key: 'code', align: 'center' },
                { title: '对应专题',key: 'opt', align: 'center',
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
        								this.previewCode(params.index)
        							}
        						}
        					}, '查看')
                		])
                	}
                },
			],
			dataList: []
        }
    },
    methods: {
        searchByCode(){
            let that = this,
				getDataUrl = globel_.serverHost + globel_.configAPI.getDataBySdCode;
			this.$Loading.start();
			this.$http.get( getDataUrl,{params:{
                limit:10,
    			offset:this.offset,
                code:this.code
			}}).then(function(result){
				that.$Loading.finish();
    			that.total = result.data.count;
				that.dataList = result.data.rows;
			}).catch(function(err){
				that.$Loading.error();
			})
        },
        previewCode(index){
            this.previewModal = true;
            this.codeSpecialColumnData = [];
            let codeSpecialArr = this.dataList[index].specialColumnIds.split(",");
            for (let i = 0; i < codeSpecialArr.length; i++) {
                for (let j = 0; j < this.specialColumnData.length; j++) {
                    if(codeSpecialArr[i] === String(this.specialColumnData[j].Id)){
                        this.codeSpecialColumnData.push(this.specialColumnData[j].name);
                    }
                }
            }
        },
		pageChange(index){
			this.offset = (index - 1) * 10;
			let that = this,
				getDataUrl = globel_.serverHost + globel_.configAPI.getDataBySdCode;
			this.$Loading.start();
			this.$http.get( getDataUrl,{params:{
                limit:10,
    			offset:this.offset,
                code:this.code
			}}).then(function(result){
				that.$Loading.finish();
				that.dataList = result.data.rows;
			}).catch(function(err){
				that.$Loading.error();
			})
		},
		newSpecialCode(){
			this.$router.push({name:"addSpecialCode",query:{id:0}});
		}
    },
	created(){
		let that = this,
			getDataUrl = globel_.serverHost + globel_.configAPI.getDataBySdCode;
		this.$Loading.start();

        // 获取专题
		let	getSpecialColumnDataUrl = globel_.serverHost + globel_.configAPI.getSpecialColumnData;
		this.$http.get( getSpecialColumnDataUrl,{params:{
			limit:10000,
			offset:0
		}}).then(function(result){
			that.specialColumnData    = result.data.rows;
		})

		this.$http.get( getDataUrl,{params:{
			limit:10,
			offset:this.offset,
            code:this.code
		}}).then(function(result){
			that.$Loading.finish();
			that.dataList = result.data.rows;
			that.total = result.data.count;
		}).catch(function(err){
			that.$Loading.error();
		})
	}
}
</script>

<style lang="css" scoped>
.specialCode{
	padding: 20px;
}
.specialColumnName{
    font-size: 14px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
}
.code{
    width: 400px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin:0 0 20px 0;
}
.code p{
    width: 60px;
}
</style>
