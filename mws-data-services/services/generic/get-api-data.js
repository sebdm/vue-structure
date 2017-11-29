import axios from "axios";
import { getUrlParameterString } from '../../util/get-url-parameter-string'
import transforms from '../../transformations'

export default ({ parameterData, dataConfig }) => {
  if (dataConfig.apiTransformationPipeline) {
    _.each(dataConfig.apiTransformationPipeline, function(transformDefinition) {
        parameterData = transforms.transform(transformDefinition, parameterData);
    });
  }

  axios({
    method: dataConfig.method,
    url: dataConfig.url + getUrlParameterString(dataConfig.urlParameters),
    data: parameterData,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response) {
    var data = response.data;

    if (dataConfig.transformationPipeline) {
      _.each(dataConfig.transformationPipeline, function(transformDefinition) {
        data = transforms.transform(transformDefinition, data);
      });
    }

    return data;
  });
};
