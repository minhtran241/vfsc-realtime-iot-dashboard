export const getLegend = (stats) => {
  const legend = [];
  stats.map((obj) => {
    legend.push(
      (({ UpT, BatV, SolV, STemp, WTs, WT, WPs, WP, WDs, WD, WNs, WN }) => ({
        UpT,
        BatV,
        SolV,
        STemp,
        WTs,
        WT,
        WPs,
        WP,
        WDs,
        WD,
        WNs,
        WN,
      }))(obj)
    );
  });
  return legend;
};

export const getLineChartLegend = (stats) => {
  const legend = [];
  stats.map((obj) => {
    legend.push(
      (({ BatV, SolV, STemp, WTs, WT }) => ({
        BatV,
        SolV,
        STemp,
        WTs,
        WT,
      }))(obj)
    );
  });
  return legend;
};
