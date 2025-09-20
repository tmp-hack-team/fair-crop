import { useInterval } from "@dnd-kit/utilities";
import { useEffect, useMemo, useRef } from "react";
import { MersenneTwister } from "~/lib/mersenne-twister";
import { cn } from "~/lib/utils";
import { FarmMapLegend } from "./farm-map-legend";
import { InfoCard } from "../ui/info";

type Config = {
  mapSize: {
    w: number;
    h: number;
  };

  layers: Array<{
    tile: string;
    x: number;
    y: number;
    w: number;
    h: number;
    maxCount?: number;
    highlight?: number;
  }>;
};

type Tiles = {
  [k: string]:
    | {
        type: "bounds";
        sprite: string;
        pos: {
          [k in "tl" | "tm" | "tr" | "ml" | "mm" | "mr" | "bl" | "bm" | "br"]:
            | [number, number]
            | { type: "random"; pos: Array<[number, number]> }
            | null;
        };
      }
    | {
        type: "object";
        sprite: string;
        pos: Array<[number, number]>;
        w?: number;
        h?: number;
      };
};

const TILE_SIZE = 16;

const TILES: Tiles = {
  grassHill: {
    type: "bounds",
    sprite:
      "/sprites/sprout_lands_premium/Tilesets/ground tiles/New tiles/Grass_Hill_Tiles_v2.png",
    pos: {
      tl: [0, 0],
      tm: [1, 0],
      tr: [2, 0],
      ml: [0, 1],
      mm: {
        type: "random",
        pos: [
          [1, 1],
          [1, 1],
          [0, 5],
          [1, 5],
          [2, 5],
          [3, 5],
          [4, 5],
          [5, 5],
          [1, 6],
          [2, 6],
          [3, 6],
          [4, 6],
          [5, 6],
        ],
      },
      mr: [2, 1],
      bl: [0, 2],
      bm: [1, 2],
      br: [2, 2],
    },
  },
  grass: {
    type: "bounds",
    sprite:
      "/sprites/sprout_lands_premium/Tilesets/ground tiles/New tiles/Grass_tiles_v2.png",
    pos: {
      tl: [0, 0],
      tm: [1, 0],
      tr: [2, 0],
      ml: [0, 1],
      mm: {
        type: "random",
        pos: [
          [1, 1],
          [1, 1],
          [0, 5],
          [1, 5],
          [2, 5],
          [3, 5],
          [4, 5],
          [5, 5],
          [1, 6],
          [2, 6],
          [3, 6],
          [4, 6],
          [5, 6],
        ],
      },
      mr: [2, 1],
      bl: [0, 2],
      bm: [1, 2],
      br: [2, 2],
    },
  },
  grassHole: {
    type: "bounds",
    sprite:
      "/sprites/sprout_lands_premium/Tilesets/ground tiles/New tiles/Grass_Tile_Layers.png",
    pos: {
      tl: [5, 1],
      tm: [1, 2],
      tr: [6, 1],
      ml: [2, 1],
      mm: null,
      mr: [0, 1],
      bl: [5, 2],
      bm: [1, 0],
      br: [6, 2],
    },
  },
  darkerGrass: {
    type: "bounds",
    sprite:
      "/sprites/sprout_lands_premium/Tilesets/ground tiles/New tiles/Darker_Grass_Tile_Layers2.png",
    pos: {
      tl: [0, 0],
      tm: [1, 0],
      tr: [2, 0],
      ml: [0, 1],
      mm: {
        type: "random",
        pos: [
          [1, 1],
          [1, 1],
          [0, 5],
          [1, 5],
          [2, 5],
          [3, 5],
          [4, 5],
          [5, 5],
          [1, 6],
          [2, 6],
          [3, 6],
          [4, 6],
          [5, 6],
        ],
      },
      mr: [2, 1],
      bl: [0, 2],
      bm: [1, 2],
      br: [2, 2],
    },
  },
  darkerGrassHole: {
    type: "bounds",
    sprite:
      "/sprites/sprout_lands_premium/Tilesets/ground tiles/New tiles/Darker_Grass_Tile_Layers2.png",
    pos: {
      tl: [5, 1],
      tm: [1, 2],
      tr: [6, 1],
      ml: [2, 1],
      mm: null,
      mr: [0, 1],
      bl: [5, 2],
      bm: [1, 0],
      br: [6, 2],
    },
  },
  dirt: {
    type: "bounds",
    sprite: "/sprites/sprout_lands/Tilesets/Tilled_Dirt_Wide_v2.png",
    pos: {
      tl: [0, 0],
      tm: [1, 0],
      tr: [2, 0],
      ml: [0, 1],
      mm: [1, 1],
      mr: [2, 1],
      bl: [0, 2],
      bm: [1, 2],
      br: [2, 2],
    },
  },
  fence: {
    type: "bounds",
    sprite: "/sprites/sprout_lands/Tilesets/Fences.png",
    pos: {
      tl: [1, 0],
      tm: [2, 3],
      tr: [3, 0],
      ml: [0, 1],
      mm: null,
      mr: [0, 1],
      bl: [5, 2],
      bm: [2, 3],
      br: [3, 2],
    },
  },
  water: {
    type: "bounds",
    sprite: "/sprites/sprout_lands/Tilesets/Water.png",
    pos: {
      tl: [0, 0],
      tm: [0, 0],
      tr: [0, 0],
      ml: [0, 0],
      mm: [0, 0],
      mr: [0, 0],
      bl: [0, 0],
      bm: [0, 0],
      br: [0, 0],
    },
  },
  greens: {
    type: "object",
    sprite: "/sprites/sprout_lands_premium/Objects/Farming Plants.png",
    pos: [
      [1, 2], // green thing
      [2, 2], // green thing
      // [3, 2], // carrot
      // [3, 3], // cauliflower
      // [3, 4], // tomato
      // [3, 5], // eggplant
      // [3, 6], // flower
      [3, 7], // lettuce
      // [3, 8], // corn
      // [3, 9], // pumpkin
      // [3, 10], // beet
      // [3, 11], // flower2
      // [3, 12], // beet?
      // [3, 13], // starthing
      [3, 14], // green thing
    ],
  },
  veggies: {
    type: "object",
    sprite: "/sprites/sprout_lands_premium/Objects/Farming Plants.png",
    pos: [
      //[1, 2], // green thing
      //[2, 2], // green thing
      [3, 2], // carrot
      //[3, 3], // cauliflower
      [3, 4], // tomato
      [3, 5], // eggplant
      [3, 6], // flower
      //[3, 7], // lettuce
      //[3, 8], // corn
      [3, 9], // pumpkin
      //[3, 10], // beet
      [3, 11], // flower2
      //[3, 12], // beet?
      [3, 13], // starthing
      //[3, 14], // green thing
    ],
  },
  cow: {
    type: "object",
    sprite: "/sprites/sprout_lands_premium/Animals/Cow/Free Cow Sprites.png",
    pos: [
      [0, 0],
      [2, 0],
      [4, 0],
      [0, 2],
      [2, 2],
    ],
    w: 2,
    h: 2,
  },
  fruit: {
    type: "object",
    sprite:
      "/sprites/sprout_lands_premium/Objects/Trees, stumps and bushes.png",
    pos: [
      [3, 0],
      [5, 0],
      [7, 0],
      [9, 0],
    ],
    w: 2,
    h: 2,
  },
  chicken: {
    type: "object",
    sprite: "/sprites/sprout_lands_premium/Animals/Chicken/chicken default.png",
    pos: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
    ],
    w: 1,
    h: 1,
  },
  highlight: {
    type: "object",
    sprite: "/sprites/sprout_lands_premium/Animals/Chicken/chicken default.png",
    pos: [[0, 0]],
    w: 1,
    h: 1,
  },
};

export function MapLegendIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const meta = TILES[icon];

  const phases = meta.type === "object" ? meta.pos.length : 1;

  useEffect(() => {
    if (meta.type !== "object") return;

    let phase = 0;
    const interval = setInterval(() => {
      phase = (phase + 1) % phases;
      divRef.current!.style.backgroundPosition = `-${
        meta.pos[phase][0] * TILE_SIZE
      }px -${meta.pos[phase][1] * TILE_SIZE}px`;
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (meta.type === "object") {
    return (
      <div
        ref={divRef}
        style={{
          width: `${TILE_SIZE * (meta.h || 1)}px`,
          height: `${TILE_SIZE * (meta.w || 1)}px`,
          background: `url('${meta.sprite}')`,
          backgroundPosition: `-${meta.pos[0][0] * TILE_SIZE}px -${
            meta.pos[0][1] * TILE_SIZE
          }px`,
        }}
        className={className}
      ></div>
    );
  } else {
    return null;
  }
}

function pond({
  w,
  h,
  x,
  y,
  type,
}: {
  w: number;
  h: number;
  x: number;
  y: number;
  type: "grass" | "darkerGrass";
}) {
  return [
    {
      tile: "water",
      w,
      h,
      x,
      y,
    },
    {
      tile: `${type}Hole`,
      w,
      h,
      x,
      y,
    },
  ];
}

function animalPen({
  w,
  h,
  x,
  y,
}: {
  w: number;
  h: number;
  x: number;
  y: number;
}) {
  return [{ w, h, x, y, tile: "fence" }];
}

function crops({
  w,
  h,
  x,
  y,
  type,
  total,
  user,
}: {
  w: number;
  h: number;
  x: number;
  y: number;
  total?: number;
  user?: number;
  type: "greens" | "veggies";
}) {
  return [
    { w, h, x, y, tile: "dirt" },
    { w, h, x, y, tile: "grassHole" },
    { w: w - 2, h: h - 2, x: x + 1, y: y + 1, tile: type, total, user },
  ];
}

function getTilePosKey({
  w,
  h,
  x,
  y,
}: {
  w: number;
  h: number;
  x: number;
  y: number;
}) {
  if (y == 0 && x == 0) {
    return "tl";
  } else if (y == 0 && x == w - 1) {
    return "tr";
  } else if (y == 0) {
    return "tm";
  } else if (x == 0 && y == h - 1) {
    return "bl";
  } else if (x == w - 1 && y == h - 1) {
    return "br";
  } else if (y == h - 1) {
    return "bm";
  } else if (x == 0) {
    return "ml";
  } else if (x == w - 1) {
    return "mr";
  } else {
    return "mm";
  }
}

export function FarmMap({
  allocation,
  withLegend,
  withInfo,
}: {
  allocation: {
    [k: string]: {
      total: number;
      user?: number;
    };
  };
  withLegend?: boolean;
  withInfo?: boolean;
}) {
  console.log({ allocation });
  const config = {
    mapSize: { w: 41, h: 36 },
    layers: [
      {
        tile: "grassHill",
        w: 41,
        h: 36,
        x: 0,
        y: 0,
      },
      ...animalPen({
        w: 16,
        h: 17,
        x: 1,
        y: 1,
      }),
      ...pond({
        type: "grass",
        w: 6,
        h: 15,
        x: 10,
        y: 2,
      }),
      {
        tile: "cow",
        w: 6,
        h: 14,
        x: 3,
        y: 2,
        total: allocation.cow.total,
        user: allocation.cow.user,
      },
      ...animalPen({
        w: 16,
        h: 16,
        x: 1,
        y: 19,
      }),
      {
        tile: "chicken",
        w: 12,
        h: 8,
        x: 3,
        y: 23,
        total: allocation.chicken.total,
        user: allocation.chicken.user,
      },
      ...pond({
        type: "grass",
        w: 14,
        h: 3,
        x: 2,
        y: 20,
      }),
      ...crops({
        type: "greens",
        w: 11,
        h: 20,
        x: 18,
        y: 15,
        total: allocation.greens.total,
        user: allocation.greens.user,
      }),
      ...crops({
        type: "veggies",
        w: 11,
        h: 20,
        x: 29,
        y: 15,
        total: allocation.veggies.total,
        user: allocation.veggies.user,
      }),
      /*{
        tile: "darkerGrass",
        w: 20,
        h: 12,
        x: 19,
        y: 22,
      },*/
      {
        tile: "fruit",
        w: 19,
        h: 12,
        x: 19,
        y: 2,
        total: allocation.fruit.total,
        user: allocation.fruit.user,
      },
    ],
  };

  const layout = useMemo(() => {
    const twister = new MersenneTwister(130445424);

    const map: Array<
      Array<{
        layers: Array<{ sprite: string; x: number; y: number }>;
      }>
    > = [];

    for (let y = 0; y < config.mapSize.h; y++) {
      map.push([]);
      for (let x = 0; x < config.mapSize.w; x++) {
        map[y].push({
          layers: [],
        });
      }
    }

    layerLoop: for (const l of config.layers) {
      const meta = TILES[l.tile];

      if (meta.type == "bounds") {
        for (let y = l.y; y < l.y + l.h; y++) {
          for (let x = l.x; x < l.x + l.w; x++) {
            let lx = -1;
            let ly = -1;

            const positions =
              meta.pos[
                getTilePosKey({
                  x: x - l.x,
                  y: y - l.y,
                  w: l.w,
                  h: l.h,
                })
              ];

            if (positions !== null) {
              if (Array.isArray(positions)) {
                lx = positions[0];
                ly = positions[1];
              } else if (positions.type === "random") {
                let posIdx = twister.randBetween(0, positions.pos.length - 1);

                lx = positions.pos[posIdx][0];
                ly = positions.pos[posIdx][1];
              }
            }

            if (lx >= 0 && ly >= 0) {
              map[y][x].layers.unshift({
                sprite: meta.sprite,
                x: lx,
                y: ly,
              });
            }
          }
        }
      } else if (meta.type == "object") {
        let count = 0;

        objLoop: for (let y = l.y; y < l.y + l.h; y += meta.h || 1) {
          for (let x = l.x; x < l.x + l.w; x += meta.w || 1) {
            let posIdx = twister.randBetween(0, meta.pos.length - 1);

            // @ts-ignore
            if (count == l.maxCount) {
              //continue objLoop;
            }

            for (let yy = 0; yy < (meta.h || 1); yy++) {
              for (let xx = 0; xx < (meta.w || 1); xx++) {
                map[y + yy][x + xx].layers.unshift({
                  sprite: meta.sprite,
                  x: meta.pos[posIdx][0] + xx,
                  y: meta.pos[posIdx][1] + yy,
                });

                // @ts-ignore
                if (l.total && l.user && count >= l.user && count < l.total) {
                  map[y + yy][x + xx].layers.unshift({
                    sprite: "/sprites/highlight-total.svg",
                    x: meta.pos[0][0] + xx,
                    y: meta.pos[0][1] + yy,
                  });
                }

                // @ts-ignore
                if (l.user && l.total && count < l.user) {
                  map[y + yy][x + xx].layers.unshift({
                    sprite: "/sprites/highlight-user.svg",
                    x: meta.pos[0][0] + xx,
                    y: meta.pos[0][1] + yy,
                  });
                }
              }
            }
            count++;

            /*let posIdx = twister.randBetween(0, meta.pos.length - 1);
            let lx = meta.pos[posIdx][0] + ((x - l.x) % (meta.w || 1));
            let ly = meta.pos[posIdx][1] + ((y - l.y) % (meta.h || 1));

            map[y][x].layers.unshift({
              sprite: meta.sprite,
              x: lx,
              y: ly,
            })*/
          }
        }
      }

      /* for (let y = l.y; y < l.y + l.h; y++) {
        for (let x = l.x; x < l.x + l.w; x++) {
          let lx = -1;
          let ly = -1;

          if (meta.type == "bounds") {
            const positions =
              meta.pos[
                getTilePosKey({
                  x: x - l.x,
                  y: y - l.y,
                  w: l.w,
                  h: l.h,
                })
              ];

            if (positions !== null) {
              if (Array.isArray(positions)) {
                lx = positions[0];
                ly = positions[1];
              } else if (positions.type === "random") {
                let posIdx = twister.randBetween(0, positions.pos.length - 1);

                lx = positions.pos[posIdx][0];
                ly = positions.pos[posIdx][1];
              }
            }
          } else if (meta.type === "object") {
            //let posIdx = ((x + 1) * (y + 1) + 3) % meta.pos.length;
            let posIdx = twister.randBetween(0, meta.pos.length - 1);

            lx = meta.pos[posIdx][0] + ((x - l.x) % (meta.w || 1));
            ly = meta.pos[posIdx][1] + ((y - l.y) % (meta.h || 1));
          }

          if (lx >= 0 && ly >= 0) {
            map[y][x].layers.unshift({
              sprite: meta.sprite,
              x: lx,
              y: ly,
            });
            count++;

            if (l.highlight && l.maxCount && count > l.maxCount - l.highlight) {
              map[y][x].layers.unshift({
                sprite: "/sprites/highlight.png",
                x: lx,
                y: ly,
              });
            }
          }
        }
      } */
    }

    return map;
  }, [config]);

  return (
    <table className={cn("w-max overflow-auto")}>
      <tbody>
        {layout.map((row, y) => (
          <tr key={y}>
            {row.map((tile, x) => (
              <td
                style={{
                  height: `${TILE_SIZE}px`,
                  width: `${TILE_SIZE}px`,
                  imageRendering: "pixelated",
                  backgroundImage: `${tile.layers
                    .map((l) => `url('${l.sprite}')`)
                    .join(",")}`,
                  backgroundPosition: `${tile.layers
                    .map((l) => `-${l.x * TILE_SIZE}px -${l.y * TILE_SIZE}px`)
                    .join(",")}`,
                  fontSize: "5px",
                }}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
