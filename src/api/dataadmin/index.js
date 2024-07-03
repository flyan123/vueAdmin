// import http from "@http"
// import env from "@api"

export function getDataAdminTabDataFun(data){
    console.log(data);
    return Promise.resolve([
        {
            address:"威海市",
            dataCount:20
        },
        {
            address:"青岛市",
            dataCount:60
        },
        {
            address:"济南市",
            dataCount:10
        },
        {
            address:"日照市",
            dataCount:30
        },
        
    ])
}