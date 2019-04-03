let eliteSchoolFile = new Vue({
    el:".eliteSchoolFile",
    delimiters: ['${', '}'],
    data(){
        return{
            schoolModel:"",
            schoolData:[],
            subjectModel:"",
            subjectData:[
        		{id:1,title:"数学"},
        		{id:2,title:"英语"},
        		{id:3,title:"物理"},
        		{id:4,title:"化学"}
        	],
            gradeModel:"",
        	gradeData:[
        		{id:7,title:"七年级"},
        		{id:8,title:"八年级"},
        		{id:9,title:"九年级"}
        	]
        }
    },
    created(){

    },
    methods:{

    }
})
