/**
 * Generate a random pattern of pins for a given level.
 */
export function generatePattern(level) {
// number of pins per level.
    const levelLengths = {
      1: 4,
      2: 8,
      3: 12,
      4: 16
    };

    const patternLength = levelLengths[level];
    // there are 16 possible pins, so array of length 16 to represent all possible pins
    const pins = Array.from({ length: 16 }, (_, i) => i + 1);
  
    // Shuffles the array
    for (let i = pins.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pins[i], pins[j]] = [pins[j], pins[i]];
    }
  
    // Return the pins from the shuffled array
    return pins.slice(0, patternLength);
  }