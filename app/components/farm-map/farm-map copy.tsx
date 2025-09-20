import { cn } from "~/lib/utils";

const SIZE = 16;
const SCALE_FACTOR = 1;

const TILES: Tiles = {
  gn: {
    sprite: "/sprites/sprout_lands/Tilesets/Grass.png",
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
  gw: {
    sprite: "/sprites/sprout_lands/Tilesets/Grass.png",
    bg: "/sprites/sprout_lands/Tilesets/Water.png",
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
  gd: {
    sprite: "/sprites/sprout_lands/Tilesets/Grass.png",
    bg: "/sprites/sprout_lands/Tilesets/SingleDirt.png",
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
  gf: {
    sprite: "/sprites/sprout_lands/Tilesets/Fences.png",
    bg: "/sprites/sprout_lands/Tilesets/SingleGrass.png",
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
  /*water: {
    sprite: "/sprites/sprout_lands/Tilesets/Water.png",
    pos: [0, 0],
  },*/
};

const CONFIG = genMap({
  w: 40,
  h: 22,
  features: [
    {
      type: "gd",
      w: 15,
      h: 5,
      x: 1,
      y: 1,
    },
    {
      type: "gd",
      w: 15,
      h: 5,
      x: 1,
      y: 6,
    },
    {
      type: "gd",
      w: 15,
      h: 5,
      x: 1,
      y: 11,
    },
    {
      type: "gd",
      w: 15,
      h: 5,
      x: 1,
      y: 16,
    },
    {
      type: "gf",
      w: 10,
      h: 18,
      x: 17,
      y: 2,
      ignoreNull: true,
    },
    {
      type: "gf",
      w: 10,
      h: 18,
      x: 28,
      y: 2,
      ignoreNull: true,
    },
  ],
});

type Tiles = {
  [k: string]: {
    sprite: string;
    bg?: string;
    pos: {
      [k: string]: [number, number] | null;
    };
  };
};

type FarmMapConfig = {
  data: Array<Array<string>>;
};

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

function genMap({
  w,
  h,
  features,
}: {
  w: number;
  h: number;
  features: Array<{
    type: string;
    x: number;
    y: number;
    w: number;
    h: number;
    ignoreNull?: boolean;
  }>;
}) {
  let map: Array<Array<string>> = [];

  for (let y = 0; y < h; y++) {
    map.push([]);
    const row = map[y];
    for (let x = 0; x < w; x++) {
      row.push("gn-" + getTilePosKey({ x, y, w, h }));
    }
  }

  for (const f of features) {
    const key = f.type;

    for (let y = f.y; y < f.y + f.h; y++) {
      const row = map[y];
      for (let x = f.x; x < f.x + f.w; x++) {
        const posKey = getTilePosKey({
          x: x - f.x,
          y: y - f.y,
          w: f.w,
          h: f.h,
        });

        if (!TILES[key].pos[posKey] && f.ignoreNull) {
          continue;
        }

        row[x] = f.type + "-" + posKey;
        //row[x] = f.type + "-" + getTilePosKey({ x, y, w, h });
      }
    }
  }

  console.log(map);

  return map;
}

function Tile({ tile }: { tile: string }) {
  if (tile === "empty") {
    return (
      <td
        style={{
          height: `${SIZE * SCALE_FACTOR}px`,
          width: `${SIZE * SCALE_FACTOR}px`,
          background: `url(/sprites/sprout_lands/Tilesets/Water.png)`,
        }}
      ></td>
    );
  }

  const [key, pos] = tile.split("-") as [keyof typeof TILES, string];
  const m = TILES[key];

  if (m.pos[pos] === null) {
    return (
      <td
        style={{
          height: `${SIZE * SCALE_FACTOR}px`,
          width: `${SIZE * SCALE_FACTOR}px`,
          background: `url(${m.bg})`,
        }}
      ></td>
    );
  }

  const x = Array.isArray(m.pos) ? m.pos[0] : m.pos[pos][0];
  const y = Array.isArray(m.pos) ? m.pos[1] : m.pos[pos][1];

  return (
    <td
      className={cn("")}
      style={{
        height: `${SIZE * SCALE_FACTOR}px`,
        width: `${SIZE * SCALE_FACTOR}px`,
        background: `url(${m.sprite}) ${m.bg ? `,url(${m.bg})` : ""}`,
        backgroundPosition: `-${x * SIZE}px -${y * SIZE}px ${
          m.bg ? ", center" : ""
        }`,
      }}
    ></td>
  );
}

export function FarmMap() {
  return (
    <div>
      <div
        className={cn("p-0 w-fit")}
        /*style={{
          background: "url(/sprites/sprout_lands/Tilesets/Water.png)",
        }}*/
      >
        <table>
          <tbody>
            {CONFIG.map((row, y) => (
              <tr key={`${y}`}>
                {row.map((tile, x) => (
                  <Tile key={`${x}x${y}-${tile}`} tile={tile} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
