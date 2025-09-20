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
          [zoneId: number]: {
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
    zone: "2",
    type: "vegetable",
    start: 1,
    end: "May",
  },
  lettuce: {
    seasonal: true,
    zone: "2",
    type: "vegetable",
  },
  potato: {
    seasonal: true,
    zone: "2",
    type: "vegetable",
    start: "June",
    end: "August",
  },
  beetroot: {
    seasonal: true,
    zone: "2",
    type: "vegetable",
    start: "all",
    end: "all",
  },
  broccoli: {
    seasonal: true,
    zone: "2",
    type: "vegetable",
    start: "December",
    end: "April",
  },
  cabbage: {
    seasonal: true,
    zone: "2",
    type: "vegetable",
    start: "all",
    end: "all",
  },
  tomato: {
    seasonal: true,
    zone: "2",
    type: "fruit",
    start: "June",
    end: "October",
  },
  strawberry: {
    seasonal: true,
    zone: "2",
    type: "fruit",
    start: "March",
    end: "July",
  },
  melon: {
    seasonal: true,
    zone: "2",
    type: "fruit",
    start: "June",
    end: "July",
  },
  basil: {
    seasonal: true,
    zone: "2",
    type: "vegetable",
    start: "June",
    end: "October",
  },
  watermelon: {
    seasonal: true,
    zone: "2",
    type: "vegetable",
    start: "June",
    end: "July",
  },
  carrot: {
    seasonal: true,
    zone: "2",
    type: "vegetable",
    start: "all",
    end: "all",
  },
};

export default crops;
