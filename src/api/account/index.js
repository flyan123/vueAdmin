// import http from "@http"
// import env from "@api"

// 获取账号数据
export function getAccountDtatFun(data) {
    console.log(data);
    return Promise.resolve([
        {
            number: "admin",
            time: "2021-11-30",
            address: "威海市"
        },
        {
            number: "admin",
            time: "2021-11-30",
            address: "青岛市"
        },
        {
            number: "admin",
            time: "2021-11-30",
            address: "济南市"
        },
    ])
}
