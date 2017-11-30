import axios from "axios";
import { getUrlParameterString } from '../../util/get-url-parameter-string'
import transforms from '../../transformations'
import { each } from 'lodash';

export default ({ parameterData, dataConfig }) => {
  var _
  if (dataConfig.apiTransformationPipeline) {
    each(dataConfig.apiTransformationPipeline, function(transformDefinition) {
        parameterData = transforms.transform(transformDefinition, parameterData);
    });
  }

  return axios({
    method: dataConfig.method,
    url: dataConfig.url + getUrlParameterString(dataConfig.urlParameters),
    data: parameterData,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response) {
    var data = response.data;

    if (dataConfig.transformationPipeline) {
      each(dataConfig.transformationPipeline, function(transformDefinition) {
        data = transforms.transform(transformDefinition, data);
      });
    }

    return data;
  });
};
