let eliteSchoolFile = new Vue({
    el:".eliteSchoolFile",
    delimiters: ['${', '}'],
    data(){
        return{
            schoolId:"",
            offset:0,
            grade:7,
            subject:1,
        	gradeData:[
        		{id:7,title:"七年级"},
        		{id:8,title:"八年级"},
        		{id:9,title:"九年级"}
        	],
            subjectModel:"数学",
            subjectData:[
        		{id:1,title:"数学"},
        		{id:2,title:"英语"},
        		{id:3,title:"物理"},
        		{id:4,title:"化学"}
        	],
            currentIndex:"",
            eliteSchoolData:[],

            showNomore:false,
            scrollModel:false              //滚动锁
        }
    },
    created(){
        let that = this;
        this.schoolId = window.location.href.split("?id=")[1];
        $.ajax({
            url: config.ajaxUrls.downloadEliteSchoolFile,
            type: 'GET',
            data: {
                limit:10,
                offset: this.offset,
                schoolId:this.schoolId,
                grade:this.grade,
                subject:this.subject
            },
            success(res){
                that.eliteSchoolData = res.rows;
                if (that.eliteSchoolData.length == res.count) {
                    that.scrollModel = false;
                }else{
                    that.scrollModel = true;
                }
            }
        })
    },
    methods:{
        clickGrade(index){
            let that = this;
            this.grade = index;
            this.offset = 0;
            $.ajax({
                url: config.ajaxUrls.downloadEliteSchoolFile,
                type: 'GET',
                data: {
                    limit:10,
                    offset: this.offset,
                    schoolId:this.schoolId,
                    grade:this.grade,
                    subject:this.subject
                },
                success(res){
                    that.eliteSchoolData = res.rows;
                    if (that.eliteSchoolData.length == res.count) {
                        that.scrollModel = false;
                    }else{
                        that.scrollModel = true;
                    }
                }
            })
        },
        clickSubject(index){
            let that = this;
            this.currentIndex = index;
            this.offset = 0;
            this.subject = this.subjectData[index].id;
            $.ajax({
                url: config.ajaxUrls.downloadEliteSchoolFile,
                type: 'GET',
                data: {
                    limit:10,
                    offset: this.offset,
                    schoolId:this.schoolId,
                    grade:this.grade,
                    subject:this.subject
                },
                success(res){
                    that.eliteSchoolData = res.rows;
                    if (that.eliteSchoolData.length == res.count) {
                        that.scrollModel = false;
                    }else{
                        that.scrollModel = true;
                    }
                }
            })
        },
        clickDownload(value){
            if(value == null){
                this.$Message.error('该试题暂未上传文档！');
            }
        }
    }
})
$(document).ready(function() {
    //每次刷新界面滚动条置顶
    $('html,body').animate({scrollTop:0});
    /**
     * 滚动条滚动监听
     */
    $(window).scroll(function() {
        if ($(document).scrollTop() >= $(document).height() - $(window).height() && eliteSchoolFile.scrollModel) {
            eliteSchoolFile.showNomore = false;
                eliteSchoolFile.offset += 10;
                $.ajax({
                    url: config.ajaxUrls.downloadEliteSchoolFile,
                    type: 'GET',
                    data: {
                        limit:10,
                        offset: eliteSchoolFile.offset,
                        schoolId:eliteSchoolFile.schoolId,
                        grade:eliteSchoolFile.grade,
                        subject:eliteSchoolFile.subject
                    },
                    success(res){
                        eliteSchoolFile.eliteSchoolData = [...eliteSchoolFile.eliteSchoolData,...res.rows];
                        if (eliteSchoolFile.eliteSchoolData.length == res.count) {
                            eliteSchoolFile.scrollModel = false;
                        }else{
                            eliteSchoolFile.scrollModel = true;
                        }
                    }
                })
        }else{
            eliteSchoolFile.showNomore = true;
        }
    })
});
