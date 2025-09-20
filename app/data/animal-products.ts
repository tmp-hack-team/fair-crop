const animalProducts: {
  [id: string]: {
    type: "cow" | "pig" | "chicken";
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
      sodiumMilligrams: number;
      fiberGrams: number;
    };
  };
} = {
  Egg: {
    type: "chicken",
    nutrition: {
      energyKcal: 155,
      fat: { totalGrams: 11.0, saturatesGrams: 3.3 },
      carbohydrate: { totalGrams: 1.1, sugarsGrams: 1.1 },
      proteinGrams: 13.0,
      fiberGrams: 0.0,
      sodiumMilligrams: 124,
    },
  },
  Belly: {
    type: "pig",
    nutrition: {
      energyKcal: 518,
      fat: { totalGrams: 53.0, saturatesGrams: 19.0 },
      carbohydrate: { totalGrams: 0.0, sugarsGrams: 0.0 },
      proteinGrams: 9.3,
      fiberGrams: 0.0,
      sodiumMilligrams: 73,
    },
  },
  Rib: {
    type: "cow",
    nutrition: {
      energyKcal: 291,
      fat: { totalGrams: 24.0, saturatesGrams: 10.0 },
      carbohydrate: { totalGrams: 0.0, sugarsGrams: 0.0 },
      proteinGrams: 17.0,
      fiberGrams: 0.0,
      sodiumMilligrams: 73,
    },
  },
  Chop: {
    type: "pig",
    nutrition: {
      energyKcal: 231,
      fat: { totalGrams: 13.0, saturatesGrams: 4.5 },
      carbohydrate: { totalGrams: 0.0, sugarsGrams: 0.0 },
      proteinGrams: 26.0,
      fiberGrams: 0.0,
      sodiumMilligrams: 60,
    },
  },
  Steak: {
    type: "cow",
    nutrition: {
      energyKcal: 250,
      fat: { totalGrams: 15.0, saturatesGrams: 6.0 },
      carbohydrate: { totalGrams: 0.0, sugarsGrams: 0.0 },
      proteinGrams: 26.0,
      fiberGrams: 0.0,
      sodiumMilligrams: 72,
    },
  },
  Gizzard: {
    type: "chicken",
    nutrition: {
      energyKcal: 94,
      fat: { totalGrams: 2.1, saturatesGrams: 0.6 },
      carbohydrate: { totalGrams: 0.0, sugarsGrams: 0.0 },
      proteinGrams: 18.0,
      fiberGrams: 0.0,
      sodiumMilligrams: 69,
    },
  },
  Tripe: {
    type: "pig",
    nutrition: {
      energyKcal: 85,
      fat: { totalGrams: 3.7, saturatesGrams: 1.3 },
      carbohydrate: { totalGrams: 0.0, sugarsGrams: 0.0 },
      proteinGrams: 12.0,
      fiberGrams: 0.0,
      sodiumMilligrams: 40,
    },
  },
  Picanha: {
    type: "cow",
    nutrition: {
      energyKcal: 286,
      fat: { totalGrams: 22.0, saturatesGrams: 8.0 },
      carbohydrate: { totalGrams: 0.0, sugarsGrams: 0.0 },
      proteinGrams: 22.0,
      fiberGrams: 0.0,
      sodiumMilligrams: 65,
    },
  },
  Lard: {
    type: "pig",
    nutrition: {
      energyKcal: 902,
      fat: { totalGrams: 100.0, saturatesGrams: 39.2 },
      carbohydrate: { totalGrams: 0.0, sugarsGrams: 0.0 },
      proteinGrams: 0.0,
      fiberGrams: 0.0,
      sodiumMilligrams: 0,
    },
  },
  Milk: {
    type: "cow",
    nutrition: {
      energyKcal: 61,
      fat: { totalGrams: 3.3, saturatesGrams: 1.9 },
      carbohydrate: { totalGrams: 4.8, sugarsGrams: 5.1 },
      proteinGrams: 3.2,
      fiberGrams: 0.0,
      sodiumMilligrams: 44,
    },
  },
};

export default animalProducts;
