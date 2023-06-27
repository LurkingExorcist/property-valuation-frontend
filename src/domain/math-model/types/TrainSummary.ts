type TrainDataFrameSummary = {
  'r.squared': [number];
  'adj.r.squared': [number];
  sigma: [number];
  statistic: [number];
  'p.value': [number];
  df: [number];
  logLik: [number];
  AIC: [number];
  BIC: [number];
  deviance: [number];
  'df.residual': [number];
  nobs: [number];
};

export type TrainSummary = {
  [Key in keyof TrainDataFrameSummary]: TrainDataFrameSummary[Key][0];
};
