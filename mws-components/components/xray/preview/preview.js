import Vue from 'vue'
import Vuex from 'vuex'
import { init, registerXrayModule } from 'mws-vuex-data-manager'
import Xray from '../src/index'

init(Vue, Vuex, store => {
  registerXrayModule(store, {
    namespaces: {
      xray1: {
        dataConfig: {
          url: 'https://eultrc.morningstar.com/api/rest.svc/3y3wd9echv/xray/json',
          urlParameters: 'languageId=en-GB&portfolioDataPoints=RunInThread%2CBenchmarkId%2CBenchmarkName%2CAssetAllocationMorningstarEUR3%2CRegionalExposure%2CGlobalStockSector%2CHistoricalPerformanceSeries%7CTotalReturn%2CStyleBox%2CBondStyleBox%2CEffectiveDuration%2CEffectiveMaturity%2CAverageCreditQuality%2CCreditQuality%2CMarketCapital%2CProspectiveEarningsYield%2CProspectiveBookValueYield%2CProspectiveCashFlowYield%2CProspectiveRevenueYield%2CManagementFee%2CActualManagementFee%2COngoingCharge%2CPerformanceReturn%7CM0%7CM1%7CM2%7CM3%7CM6%7CM12%7CM36%7CM60%7CM120%7CM255%7CM255UA%2CUnderlyingHolding%7C200%7CHoldingId%7CSecurityId%7CSecurityType%7CName%7CMarketValue%7CWeight%7CSector%7CSectorId%7CGlobalSectorId%7CISIN%7CCountryId%7CCountry%7CCurrencyId%7CCurrencyName%7CSymbol%2CHoldingOverlap&holdingDataPoints=RunInThread%2CHoldingId%2CSecurityId%2CSymbol%2CSectorName%2CExchangeCode%2CSecurityType%2CHoldingType%2CUniverseId%2CSecurityToken%2CName%2CISIN%2CClientFund%2CPortfolioDate%2CInitialAmount%2CInitialWeight%2CUnits%2CMarketValue%2CWeight%2CEquityWeighting%2CBondWeighting%2CEquityWeightingLong%2CBondWeightingLong%2CCurrencyId%2CCategoryName%2CSectorName%2CStarRatingM255%2CMorningstarRiskM255%2CSustainabilityRank%2CAnalystRatingScale%2Cshowbreakdown%2CShowPerformanceReturn%2CShowRiskMeasure%2COngoingCharge%2CPerformanceFee%2CActualManagementFee%2CActualPerformanceFee%2CFundShareClassId%2CReturnM12%2CReturnM36%2CReturnM60%2CReturnM120%2CContributionReturn&benchmarkDataPoints=RunInThread%2CShowBreakdown%2CHistoricalPerformanceSeries%2CPerformanceReturn%7CM0%7CM1%7CM2%7CM3%7CM6%7CM12%7CM36%7CM60%7CM120%7CM255%7CM255UA',
          transformationPipeline: ['fromXrayApiToXrayModel'],
          apiTransformationPipeline: ['toIwtXray'],
          method: 'post'
        }
      }
    }
  })
})

Xray.install()


const holdings = [{
  "identifier": "AU000000SFY4",
  "identifierType": "ISIN",
  "weight": 50
},
{
  "identifier": "F00000V3IM",
  "identifierType": "MSID",
  "weight": 20
},
{
  "identifier": "F00000QET2",
  "identifierType": "MSID",
  "weight": 30
}
]
const config = {
  doStuff: true
}

Vue.config.productionTip = false

document.querySelector('[instance-id=xrayInstance1]').setAttribute('holdings', JSON.stringify(holdings))
document.querySelector('[instance-id=xrayInstance1]').setAttribute('config', JSON.stringify(config))

/* eslint-disable no-new */
// new Vue({
//   el: '#preview',
//   template: `<mws-v-xray-sa instance-id="xrayInstance1" state-namespace="xray1" />`
// })
