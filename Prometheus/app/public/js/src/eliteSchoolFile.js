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
            eliteSchoolData:[
                {id:1,name:"dasdfasdf"},
                {id:2,name:"dasdfasdf"},
                {id:3,name:"dasdfasdf"},
                {id:4,name:"dasdfasdf"}
            ]
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
                console.log(res);
                that.schoolData = res.rows
            }
        })
    },
    methods:{
        clickGrade(index){
            console.log(index);
            this.grade = index;
        },
        clickSubject(index){
            console.log(index);
            this.currentIndex = index;
            this.subject = this.subjectData[index].id;
        }
    }
})
