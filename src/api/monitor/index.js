// import http from "@http"
// import env from "@api"

export function getMonitorTabDataFun(data) {
    console.log(data);
    return Promise.resolve([
        {
            number: "admin",
            list: "20",
            detail: "20"
        },
        {
            number: "admin",
            list: "20",
            detail: "20"
        },
        {
            number: "admin",
            list: "20",
            detail: "20"
        },
    ])
}