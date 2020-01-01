const router = require('koa-router')()
const axios = require('axios')
const superagent = require("superagent")
const cheerio = require("cheerio")

router.prefix('/rate')

router.get('/', async (ctx,next) => {
  let response1 = await axios({
    url:'https://srh.bankofchina.com/search/whpj/search_cn.jsp',
    method: 'post',
    params: {
      pjname: '美元'
    }
  })
  const $1 = cheerio.load(response1.data)
  let obj1 = {}
  let thArr1 = $1('.BOC_main table tr').eq(0)
  let tdArr1 = $1('.BOC_main table tr').eq(1)
  for(let i = 0;i < thArr1.find('th').length;i ++){
    let temp = thArr1.find('th')[i].children[0].data
    obj1[temp] = isNaN(tdArr1.find('td')[i].children[0].data) ? tdArr1.find('td')[i].children[0].data : tdArr1.find('td')[i].children[0].data*1
  }
  let response2 = await axios({
    url:'https://srh.bankofchina.com/search/whpj/search_cn.jsp',
    method: 'post',
    params: {
      pjname: '港币'
    }
  })
  const $2 = cheerio.load(response2.data)
  let obj2 = {}
  let thArr2 = $2('.BOC_main table tr').eq(0)
  let tdArr2 = $2('.BOC_main table tr').eq(1)
  for(let i = 0;i < thArr2.find('th').length;i ++){
    let temp = thArr2.find('th')[i].children[0].data
    obj2[temp] = isNaN(tdArr2.find('td')[i].children[0].data) ? tdArr2.find('td')[i].children[0].data : tdArr2.find('td')[i].children[0].data*1
  }
  ctx.body = [obj1,obj2]
})

module.exports = router