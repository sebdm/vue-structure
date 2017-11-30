export const xrayData = (state) => state.xrayData

export const xraySecurity = (state) => state.xrayData.xraySecurity
export const holdings = (state) => state.xrayData.xraySecurity.portfolio.holdings
export const stockSectors = (state) => state.xrayData.xraySecurity.portfolio.stockSectors

// export const benchmarkSecurity = (state) => state.xrayData.benchmarkSecurity
// export const benchmarkHoldings = (state) => state.xrayData.benchmarkSecurity.portfolio.holdings
// export const benchmarkStockSectors = (state) => state.xrayData.benchmarkSecurity.portfolio.stockSectors
