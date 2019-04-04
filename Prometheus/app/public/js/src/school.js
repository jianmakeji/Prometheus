let school = new Vue({
    el:".school",
    delimiters: ['${', '}'],
    data(){
        return{
            schoolData:[]
        }
    },
    created(){
        let that = this;
        $.ajax({
            url: config.ajaxUrls.getSchoolList,
            type: 'GET',
            data: {
                limit:1000,
                offset: 0
            },
            success(res){
                that.schoolData = res.rows
            }
        })
    },
    methods:{
        catchSchool(index){
            let schoolId = this.schoolData[index].Id
            window.location.href = "/eliteSchoolFile?id=" + schoolId;
        }
    }
})
