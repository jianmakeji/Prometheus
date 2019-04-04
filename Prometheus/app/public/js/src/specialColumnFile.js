let specialColumnFile = new Vue({
    el:".specialColumnFile",
    delimiters: ['${', '}'],
    data(){
        return{
            grade:7,
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
            specialColumnData:[]
        }
    },
    created(){
        $.ajax({
            url: config.ajaxUrls.downloadSpecialColumnFile,
            type: 'GET',
            data: {
                limit:100,
                offset: 0,
                grade:this.grade,
                subject:this.subject
            },
            success(res){
                that.specialColumnData = res.rows
            }
        })
    },
    methods:{
        clickGrade(index){
            let that = this;
            this.grade = index;
            $.ajax({
                url: config.ajaxUrls.downloadSpecialColumnFile,
                type: 'GET',
                data: {
                    limit:100,
                    offset: 0,
                    grade:this.grade,
                    subject:this.subject
                },
                success(res){
                    that.specialColumnData = res.rows
                }
            })
        },
        clickSubject(index){
            let that = this;
            this.currentIndex = index;
            this.subject = this.subjectData[index].id;
            $.ajax({
                url: config.ajaxUrls.downloadSpecialColumnFile,
                type: 'GET',
                data: {
                    limit:100,
                    offset: 0,
                    grade:this.grade,
                    subject:this.subject
                },
                success(res){
                    that.specialColumnData = res.rows
                }
            })
        }
    }
})
