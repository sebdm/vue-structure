export const toIwtXray = (parameterData) => {
    var holdings = parameterData || [],
    holdingType = 'weight',
    holdingTypeValue = 2;

	return JSON.stringify(JSON.stringify({
        type: holdingTypeValue,
        benchmarkId: 'EUCA000620',
        currencyId: 'GBP',
        holdings: holdings,
    }));
}
