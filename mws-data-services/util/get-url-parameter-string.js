export const getUrlParameterString = urlParameters => {
  if (urlParameters) {
    urlParameters = "?" + urlParameters;
  }
  return urlParameters || "";
};
