import getApiData from '../generic/get-api-data'

export const getXrayData = ({ holdings, dataConfig }) => {
  return getApiData({ parameterData: holdings, dataConfig })
};
