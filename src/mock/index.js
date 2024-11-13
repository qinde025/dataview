// 引入 mock.js
const Mock = require('mockjs')
//Mock.mock  接口，请求方式，返回数据（数据就是json文件夹中的文件自行添加）
Mock.mock('/cockpit/getByProduct?limit=10', 'get', require('./json/getByProduct'))
Mock.mock('/cockpit/collect', 'get', require('./json/collect'))
Mock.mock('/cockpit/getLoanStatic', 'get', require('./json/getLoanStatic'))
Mock.mock('/cockpit/getCreditStatic', 'get', require('./json/getCreditStatic'))
Mock.mock('/cockpit/getByIndustry', 'get', require('./json/getByIndustry'))
Mock.mock(/\/cockpit\/getLoanByArea\.*/, 'get', require('./json/getLoanByArea'))
