let eliteSchoolFile = new Vue({
    el:".eliteSchoolFile",
    delimiters: ['${', '}'],
    data(){
        return{
            schoolId:"",
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
            eliteSchoolData:[]
        }
    },
    created(){
        let that = this;
        this.schoolId = window.location.href.split("?id=")[1];
        $.ajax({
            url: config.ajaxUrls.downloadEliteSchoolFile,
            type: 'GET',
            data: {
                limit:100,
                offset: 0,
                schoolId:this.schoolId,
                grade:this.grade,
                subject:this.subject
            },
            success(res){
                that.eliteSchoolData = res.rows
            }
        })
    },
    methods:{
        clickGrade(index){
            let that = this;
            this.grade = index;
            $.ajax({
                url: config.ajaxUrls.downloadEliteSchoolFile,
                type: 'GET',
                data: {
                    limit:100,
                    offset: 0,
                    schoolId:this.schoolId,
                    grade:this.grade,
                    subject:this.subject
                },
                success(res){
                    that.eliteSchoolData = res.rows
                }
            })
        },
        clickSubject(index){
            let that = this;
            this.currentIndex = index;
            this.subject = this.subjectData[index].id;
            $.ajax({
                url: config.ajaxUrls.downloadEliteSchoolFile,
                type: 'GET',
                data: {
                    limit:100,
                    offset: 0,
                    schoolId:this.schoolId,
                    grade:this.grade,
                    subject:this.subject
                },
                success(res){
                    that.eliteSchoolData = res.rows
                }
            })
        }
    }
})
