// import http from "@http"
// import env from "@api"

/**
 * 查询日志数据
 * @param {Object} data 
 * @returns 
 */
export function getTableListFun(data) {
    console.log(data);
    return Promise.resolve([
        {
            number: 'admin',
            time: '2016-05-02',
            ip: '192.197.198',
        },
        {
            number: 'admin',
            time: '2016-05-02',
            ip: '192.197.198',
        },
        {
            number: 'admin',
            time: '2016-05-02',
            ip: '192.197.198',
        },
    ])
}