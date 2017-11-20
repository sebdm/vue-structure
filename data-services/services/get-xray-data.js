export const getXrayData = ({ holdings, dataConfig }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        holdings: holdings,
        stockSectors: {
          something: 'something'
        }
      })
    }, 1000)
  })
}