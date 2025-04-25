/**
 * Generate a random pattern of pins for a given level.
 */
export function generatePattern(level) {
// number of pins per level.
    const levelLengths = {
      1: 2,
      2: 3,
      3: 6,
    };

    const patternLength = levelLengths[level];
    // there are 16 possible pins, so array of length 16 to represent all possible pins
    const pins = Array.from({ length: 6 }, (_, i) => i + 1);
  
    // Shuffles the array
    for (let i = pins.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pins[i], pins[j]] = [pins[j], pins[i]];
    }
  
    // Return the pins from the shuffled array
    return pins.slice(0, patternLength);
  }