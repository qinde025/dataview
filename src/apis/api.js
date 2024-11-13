import { http } from "./http.js"
const apis = {
    sysInfo: "/sys/info",
    collect: "/cockpit/collect",
    currentLoanList: "/cockpit/getCurrentOrder",
    loanListByIndustry: "/cockpit/getByIndustry",
    creditData: "/cockpit/getCreditStatic",
    rankProducts: "/cockpit/getByProduct", 
    rankAreas: "/cockpit/getByArea",
    loanView: "/cockpit/getLoanStatic",
    getLoanByArea: "/cockpit/getLoanByArea",
}
export async function getSysInfo (params) {
    return http.get(apis.sysInfo, { params })
// 顶部栅格数据
}export async function getCollect (params) {
    return http.get(apis.collect, { params })
}
// 贷款申请量
export async function getLoanView (params) { 
    return http.get(apis.loanView, { params })
}
// 实时贷款申请记录
export async function currentLoanList (params) { 
    return http.get(apis.currentLoanList, { params })
}
// 行业贷款情况 top5
export async function loanListByIndus (params) { 
    return http.get(apis.loanListByIndustry, { params })
}
// 授信金额top5
export async function creditDataList (params) { 
    return http.get(apis.creditData, { params })
}
// 产品top5 
export async function rankProds (params) { 
    return http.get(apis.rankProducts, { params })
}
// 贷款区域分布
export async function rankAreas (params) { 
    return http.get(apis.rankAreas, { params })
}

export async function  getLoanByArea(params) {
    return http.get(apis.getLoanByArea, { params })
}