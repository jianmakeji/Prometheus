let specialColumnFile = new Vue({
    el:".specialColumnFile",
    delimiters: ['${', '}'],
    data(){
        return{
            grade:7,
            offset:0,
            subject:1,
        	gradeData:[
        		{id:7,title:"七年级"},
        		{id:8,title:"八年级"},
        		{id:9,title:"九年级"}
        	],
            subjectData:[
        		{id:1,title:"数学"},
        		{id:2,title:"英语"},
        		{id:3,title:"物理"},
        		{id:4,title:"化学"}
        	],
            currentIndex:"",
            specialColumnData:[],

            showNomore:false,
            scrollModel:false              //滚动锁
        }
    },
    created(){
        let that = this;
        $.ajax({
            url: config.ajaxUrls.downloadSpecialColumnFile,
            type: 'GET',
            data: {
                limit:10,
                offset: this.offset,
                grade:this.grade,
                subject:this.subject
            },
            success(res){
                that.specialColumnData = res.rows;
                if (that.specialColumnData.length == res.count) {
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
                url: config.ajaxUrls.downloadSpecialColumnFile,
                type: 'GET',
                data: {
                    limit:10,
                    offset:  this.offset,
                    grade:this.grade,
                    subject:this.subject
                },
                success(res){
                    that.specialColumnData = res.rows;
                    if (that.specialColumnData.length == res.count) {
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
                url: config.ajaxUrls.downloadSpecialColumnFile,
                type: 'GET',
                data: {
                    limit:10,
                    offset: this.offset,
                    grade:this.grade,
                    subject:this.subject
                },
                success(res){
                    that.specialColumnData = res.rows;
                    if (that.specialColumnData.length == res.count) {
                        that.scrollModel = false;
                    }else{
                        that.scrollModel = true;
                    }
                }
            })
        },
        clickDownload(value){
            if(value == null){
                this.$Message.error('该专题暂未上传文档！');
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
        if ($(document).scrollTop() >= $(document).height() - $(window).height() && specialColumnFile.scrollModel) {
            specialColumnFile.showNomore = false;
                specialColumnFile.offset += 10;
                $.ajax({
                    url: config.ajaxUrls.downloadSpecialColumnFile,
                    type: 'GET',
                    data: {
                        limit:10,
                        offset: specialColumnFile.offset,
                        grade:specialColumnFile.grade,
                        subject:specialColumnFile.subject
                    },
                    success(res){
                        specialColumnFile.specialColumnData = [...specialColumnFile.specialColumnData,...res.rows];
                        if (specialColumnFile.specialColumnData.length == res.count) {
                            specialColumnFile.scrollModel = false;
                        }else{
                            specialColumnFile.scrollModel = true;
                        }
                    }
                })
        }else{
            specialColumnFile.showNomore = true;
        }
    })
});
