type Counts = {
  [k: string]: number;
};

export function mergeMapData(totals: Counts, user: Counts) {
  const merged: {
    [k: string]: {
      total: number;
      user: number;
    };
  } = {};

  for (const [k, v] of Object.entries(totals)) {
    (merged[k] = merged[k] || {
      total: 0,
      user: 0,
    }).total = v;
  }

  for (const [k, v] of Object.entries(user)) {
    (merged[k] = merged[k] || {
      total: 0,
      user: 0,
    }).user = v;
  }

  return merged;
}
