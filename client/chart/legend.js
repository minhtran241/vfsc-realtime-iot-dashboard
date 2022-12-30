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
