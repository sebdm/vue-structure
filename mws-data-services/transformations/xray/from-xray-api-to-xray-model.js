import { dictionaryLookup } from './helper/dictionary-helper.js';

export function fromXrayApiToXrayModel(sourceData) {
    var returnData = {};

    if (sourceData) {
        returnData.xraySecurity = getSecurityModel(dictionaryLookup(sourceData, dictionary.xraySecurity.path));
        returnData.benchmarkSecurity = getSecurityModel(dictionaryLookup(sourceData, dictionary.benchmarkSecurity.path));
    }

    return returnData;
}

function getSecurityModel(securitySourceData) {
    var securityModel = {};

    if (securitySourceData) {
        securityModel.monthEndTrailingPerformance = getFlatModel(dictionaryLookup(securitySourceData, securityDictionary.monthEndTrailingPerformance.path), trailingPerformanceDictionary);
        securityModel.monthlyTotalReturns = getHistoricalPerformance(dictionaryLookup(securitySourceData, securityDictionary.monthlyTotalReturns.path));
        securityModel.quarterlyTotalReturns = getHistoricalPerformance(dictionaryLookup(securitySourceData, securityDictionary.quarterlyTotalReturns.path));
        securityModel.portfolio = getPortfolioModel(securitySourceData);
    }

    return securityModel;
}

function getTrailingPerformance(trailingPerformanceSource) {
    var trailingPerformanceModel = {};

    _.each(trailingPerformanceDictionary, (dictionaryItem, dictionaryItemKey)  => {
        trailingPerformanceModel[dictionaryItemKey] = dictionaryLookup(trailingPerformanceSource, trailingPerformanceDictionary[dictionaryItemKey].path);
    });

    return trailingPerformanceModel;
}

function getFlatModel(sourceData, dictionary) {
    var flatModel = {};

    _.each(dictionary, (dictionaryItem, dictionaryItemKey)  => {
        flatModel[dictionaryItemKey] = dictionaryLookup(sourceData, dictionary[dictionaryItemKey].path);
    });

    return flatModel;
}

function getHistoricalPerformance(historicalPerformanceSource) {
    var historicalPerformanceModel = getFlatModel(historicalPerformanceSource, totalReturnsDictionary);

    var returns = [];
    _.each(historicalPerformanceModel.returns, function (returnArray) {
        returns.push({ endDate: returnArray[0], value: returnArray[1] });
    });
    historicalPerformanceModel.returns = returns;

    return historicalPerformanceModel;
}

function getPortfolioModel(securitySourceData) {
    var portfolioModel = {};

    portfolioModel.assetAllocation = getFlatModel(dictionaryLookup(securitySourceData, securityToPortfolioDictionary.assetAllocation.path), assetAllocationDictionary);
    portfolioModel.equityStyleBox = getFlatModel(dictionaryLookup(securitySourceData, securityToPortfolioDictionary.equityStyleBox.path), equityStyleBoxDictionary);
    //portfolioModel.regionalExposure = dictionaryLookup(securitySourceData, securityToPortfolioDictionary.regionalExposure.path)
    portfolioModel.stockSectors = getFlatModel(dictionaryLookup(securitySourceData, securityToPortfolioDictionary.stockSectors.path), stockSectorsDictionary);
    //portfolioModel.creditQuality = dictionaryLookup(securitySourceData, securityToPortfolioDictionary.creditQuality.path)
    portfolioModel.holdings = getHoldingsModel(dictionaryLookup(securitySourceData, securityToPortfolioDictionary.holdings.path));

    return portfolioModel;
}

function getHoldingsModel(holdingsSourceData) {
    var holdings = [];

    _.each(holdingsSourceData, holding => {
        holdings.push(getFlatModel(holding, holdingDictionary));
    });

    return holdings;
}

const dictionary = {
    xraySecurity: {
        path: ''
    },
    benchmarkSecurity: {
        path: 'benchmark:first'
    }
}

const securityDictionary = {
    monthEndTrailingPerformance: {
        path: 'trailingPerformance[type=MonthEnd]:first'
     },
    monthlyTotalReturns: {
        path: 'historicalPerformanceSeries[returnType=TotalReturn][frequency=Monthly]:first'
    },
    quarterlyTotalReturns: {
        path: 'historicalPerformanceSeries[returnType=TotalReturn][frequency=Quarterly]:first'
    }
}

const securityToPortfolioDictionary = {
    assetAllocation: {
        path: 'breakdowns.assetAllocation[salePosition=N]:first'
    },
    equityStyleBox: {
        path: 'breakdowns.styleBox[salePosition=N]:first'
    },
    regionalExposure: {
        path: 'breakdowns.regionalExposure[salePosition=N]:first'
    },
    stockSectors: {
        path: 'breakdowns.globalStockSector[salePosition=N]:first'
    },
    bondStyleBox: {
        path: 'breakdowns.bondStyleBox[salePosition=N]:first'
    },
    creditQuality: {
        path: 'breakdowns.creditQuality[salePosition=N]:first'
    },
    holdings: {
        path: 'holdings'
    }
}

const trailingPerformanceDictionary = {
    type: {
        path: 'type'
    },
    returnType: {
        path: 'returnType'
    },
    currencyId: {
        path: 'currencyId'
    },
    endDate: {
        path: 'endDate'
    },
    M0: {
        path: 'returns[timePeriod=M0]:first.value'
    },
    M1: {
        path: 'returns[timePeriod=M1]:first.value'
    },
    M2: {
        path: 'returns[timePeriod=M2]:first.value'
    },
    M3: {
        path: 'returns[timePeriod=M3]:first.value'
    },
    M6: {
        path: 'returns[timePeriod=M6]:first.value'
    },
    M12: {
        path: 'returns[timePeriod=M12]:first.value'
    },
    M36: {
        path: 'returns[timePeriod=M36]:first.value'
    },
    M60: {
        path: 'returns[timePeriod=M60]:first.value'
    },
    M120: {
        path: 'returns[timePeriod=M120]:first.value'
    },
    M255: {
        path: 'returns[timePeriod=M255]:first.value'
    }
}

const totalReturnsDictionary = {
    returnType: {
        path: 'returnType'
    },
    timePeriod: {
        path: 'timePeriod'
    },
    frequency: {
        path: 'frequency'
    },
    startDate: {
        path: 'startDate'
    },
    returns: {
        path: 'returns'
    }
}

const assetAllocationDictionary = {
    salePosition: {
        path: 'salePosition'
    },
    type: {
        path: 'type'
    },
    stocks: {
        path: 'values.1'
    },
    bonds: {
        path: 'values.2'
    },
    cash: {
        path: 'values.3'
    },
    other: {
        path: 'values.4'
    },
    unclassified: {
        path: 'values.99'
    }
}

const equityStyleBoxDictionary = {
    salePosition: {
        path: 'salePosition'
    },
    largeValue: {
        path: 'values.1'
    },
    largeCore: {
        path: 'values.2'
    },
    largeGrowth: {
        path: 'values.3'
    },
    medValue: {
        path: 'values.4'
    },
    medCore: {
        path: 'values.5'
    },
    medGrowth: {
        path: 'values.6'
    },
    smallValue: {
        path: 'values.7'
    },
    smallCore: {
        path: 'values.8'
    },
    smallGrowth: {
        path: 'values.9'
    },
    other: {
        path: 'values.99'
    }
}

const stockSectorsDictionary = {
    salePosition: {
        path: 'salePosition'
    },
    cyclical_basicMaterials: {
        path: 'values.101'
    },
    cyclical_conCyclical: {
        path: 'values.102'
    },
    cyclical_financialSvs: {
        path: 'values.103'
    },
    cyclical_realEstate: {
        path: 'values.104'
    },
    defensive_conDefensive: {
        path: 'values.205'
    },
    defensive_healthcare: {
        path: 'values.206'
    },
    defensive_utilities: {
        path: 'values.207'
    },
    sensitive_commServices: {
        path: 'values.308'
    },
    sensitive_energy: {
        path: 'values.309'
    },
    sensitive_industrials: {
        path: 'values.310'
    },
    sensitive_technology: {
        path: 'values.311'
    },
    other: {
        path: 'values.99'
    }
}

const holdingDictionary = {
    name: {
        path: 'name'
    },
    securityId: {
        path: 'securityId'
    },
    symbol: {
        path: 'symbol'
    },
    exchangeCode: {
        path: 'exchangeCode'
    },
    weight: {
        path: 'weight'
    },
    contribution: {
        path: 'contributionReturn'
    },
    morningstarRating: {
        path: 'morningstarRiskM255'
    }
}
