const crops: {
  [id: string]: {
    type: "vegetable" | "fruit" | "meat";
    nutrition: {
      energyKcal: number;
      fat: {
        totalGrams: number;
        saturatesGrams: number;
      };
      carbohydrate: {
        totalGrams: number;
        sugarsGrams: number;
      };
      proteinGrams: number;
      sodiumGrams: number;
      fiberGrams: number;
    };
  } & (
    | {
        seasonal: true;

        zones: {
          [zoneId: string]: {
            start: number;
            end: number;
          };
        };
      }
    | {
        seasonal: false;
      }
  );
} = {
  garlic: {
    seasonal: true,
    zones: {
      2: { start: 1, end: 5 },
    },
    type: "vegetable",
    nutrition: {
      energyKcal: 149,
      fat: { totalGrams: 0.5, saturatesGrams: 0.1 },
      carbohydrate: { totalGrams: 33, sugarsGrams: 1 },
      proteinGrams: 6.4,
      fiberGrams: 2.1,
      sodiumGrams: 17,
    },
  },
  lettuce: {
    seasonal: false,
    type: "vegetable",
    nutrition: {
      energyKcal: 15,
      fat: { totalGrams: 0.2, saturatesGrams: 0.0 },
      carbohydrate: { totalGrams: 2.9, sugarsGrams: 0.8 },
      proteinGrams: 1.4,
      fiberGrams: 1.3,
      sodiumGrams: 28,
    },
  },
  potato: {
    seasonal: true,
    zones: {
      2: { start: 6, end: 8 },
    },
    type: "vegetable",
    nutrition: {
      energyKcal: 77,
      fat: { totalGrams: 0.1, saturatesGrams: 0.0 },
      carbohydrate: { totalGrams: 17.5, sugarsGrams: 0.8 },
      proteinGrams: 2.0,
      fiberGrams: 2.2,
      sodiumGrams: 7,
    },
  },
  beetroot: {
    seasonal: false,
    type: "vegetable",
    nutrition: {
      energyKcal: 43,
      fat: { totalGrams: 0.2, saturatesGrams: 0.0 },
      carbohydrate: { totalGrams: 9.6, sugarsGrams: 6.8 },
      proteinGrams: 1.6,
      fiberGrams: 2.8,
      sodiumGrams: 78,
    },
  },
  broccoli: {
    seasonal: true,
    zones: {
      2: { start: 12, end: 4 },
    },
    type: "vegetable",
    nutrition: {
      energyKcal: 34,
      fat: { totalGrams: 0.4, saturatesGrams: 0.1 },
      carbohydrate: { totalGrams: 7.0, sugarsGrams: 1.7 },
      proteinGrams: 2.8,
      fiberGrams: 2.6,
      sodiumGrams: 33,
    },
  },
  cabbage: {
    seasonal: false,
    type: "vegetable",
    nutrition: {
      energyKcal: 32,
      fat: { totalGrams: 0.2, saturatesGrams: 0.0 },
      carbohydrate: { totalGrams: 6.0, sugarsGrams: 1.5 },
      proteinGrams: 3.0,
      fiberGrams: 3.0,
      sodiumGrams: 25,
    },
  },
  tomato: {
    seasonal: true,
    zones: {
      2: { start: 6, end: 10 },
    },
    type: "fruit",
    nutrition: {
      energyKcal: 18,
      fat: { totalGrams: 0.2, saturatesGrams: 0.0 },
      carbohydrate: { totalGrams: 3.9, sugarsGrams: 2.6 },
      proteinGrams: 0.9,
      fiberGrams: 1.2,
      sodiumGrams: 5,
    },
  },
  strawberry: {
    seasonal: true,
    zones: {
      2: { start: 3, end: 7 },
    },
    type: "fruit",
    nutrition: {
      energyKcal: 32,
      fat: { totalGrams: 0.3, saturatesGrams: 0.0 },
      carbohydrate: { totalGrams: 7.7, sugarsGrams: 4.9 },
      proteinGrams: 0.8,
      fiberGrams: 2.0,
      sodiumGrams: 1,
    },
  },
  melon: {
    seasonal: true,
    zones: {
      2: { start: 6, end: 7 },
    },
    type: "fruit",
    nutrition: {
      energyKcal: 34,
      fat: { totalGrams: 0.2, saturatesGrams: 0.0 },
      carbohydrate: { totalGrams: 8.0, sugarsGrams: 8.0 },
      proteinGrams: 0.8,
      fiberGrams: 0.9,
      sodiumGrams: 16,
    },
  },
  basil: {
    seasonal: true,
    zones: {
      2: { start: 6, end: 10 },
    },
    type: "vegetable",
    nutrition: {
      energyKcal: 23,
      fat: { totalGrams: 0.6, saturatesGrams: 0.0 },
      carbohydrate: { totalGrams: 2.7, sugarsGrams: 0.3 },
      proteinGrams: 3.2,
      fiberGrams: 1.6,
      sodiumGrams: 4,
    },
  },
  watermelon: {
    seasonal: true,
    zones: {
      2: { start: 6, end: 10 },
    },
    type: "fruit",
    nutrition: {
      energyKcal: 30,
      fat: { totalGrams: 0.2, saturatesGrams: 0.0 },
      carbohydrate: { totalGrams: 7.6, sugarsGrams: 6.2 },
      proteinGrams: 0.6,
      fiberGrams: 0.4,
      sodiumGrams: 1,
    },
  },
  carrot: {
    seasonal: false,
    type: "vegetable",
    nutrition: {
      energyKcal: 41,
      fat: { totalGrams: 0.2, saturatesGrams: 0.0 },
      carbohydrate: { totalGrams: 10.0, sugarsGrams: 4.7 },
      proteinGrams: 0.9,
      fiberGrams: 2.8,
      sodiumGrams: 69,
    },
  },
};

export default crops;
