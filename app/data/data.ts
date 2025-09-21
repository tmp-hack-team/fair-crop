import type { BasketType } from "~/lib/types";

const data = {
  allocations: {
    total: {
      milk: 10,
      eggs: 52,
      greens: 20,
      vegetables: 25,
      fruit: 25,
    },
    user: {
      milk: 3,
      eggs: 5,
      greens: 1,
      vegetables: 2,
      fruit: 4,
    },
  },

  user: {
    zone: "2",
  },

  zones: {
    "2": {
      description:
        "Nesta zona, o clima é temperado, mas já com influências continentais que provocam extremos: calor seco e agressivo no verão (sobretudo a sul) e frio marcado no inverno (mais cedo e mais intenso no centro e norte). Durante o inverno, podem surgir períodos de nevoeiro persistente que atrasam o desenvolvimento de algumas culturas. As precipitações são abundantes a norte e mais irregulares a sul. O risco de geadas prolonga-se até meados de abril, pelo que é essencial ajustar o calendário das sementeiras.",
      notes:
        "O maior desafio agrícola da zona é lidar com os contrastes: por um lado, o frio que pode atrasar a produção, por outro, os verões secos que exigem rega eficiente. As estufas ou túneis plásticos são grandes aliados para antecipar sementeiras de primavera e proteger hortícolas de geadas tardias. Em zonas mais secas, a rega localizada e a escolha de variedades mais resistentes ao calor são essenciais. É também uma região propícia ao cultivo de árvores de fruto como oliveira, amendoeira e videira, que convivem bem com hortícolas em consociação.",
    },
  },

  farms: {
    pt: [
      {
        name: "Herdade da Franga",
        address: "39.748745, -8.812909",
        produce: ["milk", "eggs", "greens", "vegetables", "fruit"],
      },
      {
        name: "Quinta da Amizade",
        address: "Rua dos Amigos, km 25, Évora",
        produce: ["milk", "eggs", "greens", "vegetables", "fruit"],
      },
    ],
  } as {
    [countryCode: string]: Array<{
      name: string;
      address: string;
      produce: Array<BasketType>;
    }>;
  },
};

export default data;
