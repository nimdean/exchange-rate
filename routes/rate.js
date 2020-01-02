const router = require('koa-router')()
const axios = require('axios')
const superagent = require("superagent")
const cheerio = require("cheerio")

router.prefix('/rate')

router.get('/', async (ctx,next) => {
  let rateInfo = async params => {
    try{
      let response = await axios({
        url: 'https://srh.bankofchina.com/search/whpj/search_cn.jsp',
        method: 'post',
        params
      })
      const $ = cheerio.load(response.data)
      let obj = {}
      let thArr = $('.BOC_main table tr').eq(0)
      let tdArr = $('.BOC_main table tr').eq(1)
      for(let i = 0;i < thArr.find('th').length;i ++){
        let temp1 = thArr.find('th')[i].children[0].data
        let temp2 = tdArr.find('td')[i].children[0].data
        if(temp1 === '货币名称'){
          obj.currency = {'美元':'USD','港币':'HKD'}[temp2]
        }
        if(['现汇买入价','现汇卖出价','中行折算价'].includes(temp1)){
          obj[{'现汇买入价':'buyingRate','现汇卖出价':'sellingRate','中行折算价':'exchangeRate'}[temp1]] = temp2*1
        }
        if(temp1 === '发布时间'){
          obj.updateTime = temp2
        }
        obj.centralParity = ((obj.buyingRate + obj.sellingRate)/2).toFixed(2)*1
      }
      return obj
    }catch(err){
      return
    }
  }
  ctx.body = {
    code: 200,
    status: 'success',
    data: [await rateInfo({
      pjname: '美元'
    }), await rateInfo({
      pjname: '港币'
    })]
  }
})

module.exports = router