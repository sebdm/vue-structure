import { fromXrayApiToXrayModel } from "./xray/from-xray-api-to-xray-model";
import { toIwtXray } from "./xray/to-iwt-xray";

export default {
  transforms: {
    toIwtXray,
    fromXrayApiToXrayModel
  },

  register(transformId, transform) {
    this.transforms[transformId] = transform
  },

  transform(transformDefinition, data, transformConfig) {
    var transformationId = null;

    if (typeof transformDefinition === "string") {
      transformationId = transformDefinition;
    } else {
      transformationId = transformDefinition.transformationId;

      if (!transformationConfig) {
        transformationConfig = transformDefinition.transformationConfig;
      }
    }

    return this.transforms[transformationId](data, transformationConfig);
  }
};
