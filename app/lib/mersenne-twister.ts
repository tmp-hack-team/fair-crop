/**
 * Mersenne Twister pseudorandom number generator
 *
 * TypeScript implementation based on the original C code by Makoto Matsumoto and Takuji Nishimura
 * JavaScript wrapper originally by Sean McCullough (banksean@gmail.com)
 *
 * A C-program for MT19937, with initialization improved 2002/1/26.
 * Coded by Takuji Nishimura and Makoto Matsumoto.
 *
 * Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
 * All rights reserved.
 *
 * Usage:
 * ```typescript
 * const mt = new MersenneTwister(); // Uses current time as seed
 * const mt2 = new MersenneTwister(123); // Uses specific seed
 *
 * const randomNumber = mt.random(); // [0, 1)
 * const randomInt = mt.genrandInt32(); // [0, 0xffffffff]
 * ```
 */
export class MersenneTwister {
  private static readonly N = 624;
  private static readonly M = 397;
  private static readonly MATRIX_A = 0x9908b0df;
  private static readonly UPPER_MASK = 0x80000000;
  private static readonly LOWER_MASK = 0x7fffffff;

  private readonly mt: number[] = new Array(MersenneTwister.N);
  private mti: number = MersenneTwister.N + 1;

  /**
   * Creates a new Mersenne Twister instance
   * @param seed - Optional seed value. If not provided, uses current timestamp
   */
  constructor(seed?: number) {
    const actualSeed = seed ?? Date.now();
    this.initGenrand(actualSeed);
  }

  /**
   * Initialize the generator with a seed
   * @param seed - Seed value
   */
  private initGenrand(seed: number): void {
    this.mt[0] = seed >>> 0;

    for (this.mti = 1; this.mti < MersenneTwister.N; this.mti++) {
      const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] =
        ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
        (s & 0x0000ffff) * 1812433253 +
        this.mti;
      // See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier
      // In the previous versions, MSBs of the seed affect only MSBs of the array mt[]
      // 2002/01/09 modified by Makoto Matsumoto
      this.mt[this.mti] >>>= 0; // for >32 bit machines
    }
  }

  /**
   * Initialize by an array with array-length
   * @param initKey - Array for initializing keys
   * @param keyLength - Length of the key array
   */
  private initByArray(initKey: number[], keyLength: number): void {
    this.initGenrand(19650218);

    let i = 1;
    let j = 0;
    let k = MersenneTwister.N > keyLength ? MersenneTwister.N : keyLength;

    for (; k; k--) {
      const s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] =
        (this.mt[i] ^
          (((((s & 0xffff0000) >>> 16) * 1664525) << 16) +
            (s & 0x0000ffff) * 1664525)) +
        initKey[j] +
        j;
      this.mt[i] >>>= 0; // for WORDSIZE > 32 machines
      i++;
      j++;
      if (i >= MersenneTwister.N) {
        this.mt[0] = this.mt[MersenneTwister.N - 1];
        i = 1;
      }
      if (j >= keyLength) j = 0;
    }

    for (k = MersenneTwister.N - 1; k; k--) {
      const s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] =
        (this.mt[i] ^
          (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) +
            (s & 0x0000ffff) * 1566083941)) -
        i;
      this.mt[i] >>>= 0; // for WORDSIZE > 32 machines
      i++;
      if (i >= MersenneTwister.N) {
        this.mt[0] = this.mt[MersenneTwister.N - 1];
        i = 1;
      }
    }

    this.mt[0] = 0x80000000; // MSB is 1; assuring non-zero initial array
  }

  /**
   * Generates a random number on [0,0xffffffff]-interval
   * @returns Random 32-bit unsigned integer
   */
  public genrandInt32(): number {
    let y: number;
    const mag01 = [0x0, MersenneTwister.MATRIX_A];

    if (this.mti >= MersenneTwister.N) {
      // Generate N words at one time
      let kk: number;

      if (this.mti === MersenneTwister.N + 1) {
        // If initGenrand() has not been called, a default initial seed is used
        this.initGenrand(5489);
      }

      for (kk = 0; kk < MersenneTwister.N - MersenneTwister.M; kk++) {
        y =
          (this.mt[kk] & MersenneTwister.UPPER_MASK) |
          (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
        this.mt[kk] =
          this.mt[kk + MersenneTwister.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }

      for (; kk < MersenneTwister.N - 1; kk++) {
        y =
          (this.mt[kk] & MersenneTwister.UPPER_MASK) |
          (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
        this.mt[kk] =
          this.mt[kk + (MersenneTwister.M - MersenneTwister.N)] ^
          (y >>> 1) ^
          mag01[y & 0x1];
      }

      y =
        (this.mt[MersenneTwister.N - 1] & MersenneTwister.UPPER_MASK) |
        (this.mt[0] & MersenneTwister.LOWER_MASK);
      this.mt[MersenneTwister.N - 1] =
        this.mt[MersenneTwister.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    // Tempering
    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    return y >>> 0;
  }

  /**
   * Generates a random number on [0,0x7fffffff]-interval
   * @returns Random 31-bit unsigned integer
   */
  public genrandInt31(): number {
    return this.genrandInt32() >>> 1;
  }

  /**
   * Generates a random number on [0,1]-real-interval
   * @returns Random number between 0 and 1 (inclusive)
   */
  public genrandReal1(): number {
    return this.genrandInt32() * (1.0 / 4294967295.0);
    // divided by 2^32-1
  }

  /**
   * Generates a random number on [0,1)-real-interval
   * This is the equivalent of Math.random()
   * @returns Random number between 0 (inclusive) and 1 (exclusive)
   */
  public random(): number {
    return this.genrandInt32() * (1.0 / 4294967296.0);
    // divided by 2^32
  }

  /**
   * Generates a random number on (0,1)-real-interval
   * @returns Random number between 0 and 1 (both exclusive)
   */
  public genrandReal3(): number {
    return (this.genrandInt32() + 0.5) * (1.0 / 4294967296.0);
    // divided by 2^32
  }

  /**
   * Generates a random number on [0,1) with 53-bit resolution
   * @returns High-precision random number between 0 (inclusive) and 1 (exclusive)
   */
  public genrandRes53(): number {
    const a = this.genrandInt32() >>> 5;
    const b = this.genrandInt32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }

  /**
   * Initialize the generator with an array of seeds
   * @param seeds - Array of seed values
   */
  public seedArray(seeds: number[]): void {
    this.initByArray(seeds, seeds.length);
  }

  /**
   * Get the current state of the generator (for serialization)
   * @returns Current internal state
   */
  public getState(): { mt: number[]; mti: number } {
    return {
      mt: [...this.mt],
      mti: this.mti,
    };
  }

  /**
   * Set the state of the generator (for deserialization)
   * @param state - Previously saved state
   */
  public setState(state: { mt: number[]; mti: number }): void {
    if (state.mt.length !== MersenneTwister.N) {
      throw new Error(
        `Invalid state: mt array must have length ${MersenneTwister.N}`
      );
    }

    for (let i = 0; i < MersenneTwister.N; i++) {
      this.mt[i] = state.mt[i];
    }
    this.mti = state.mti;
  }

  public randBetween(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1) + min);
  }
}
