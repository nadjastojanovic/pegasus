// DebugLDRThresholds.ino
// Quickly prints raw readings from each of your six LDRs

#define SEQ_LENGTH 6

// Change these if your wiring differs
const int ldrPins[SEQ_LENGTH] = {
  A0, // sensor 1
  A1, // sensor 2
  A2, // sensor 3
  A5, // sensor 4
  A4, // sensor 5
  A3  // sensor 6
};

void setup() {
  Serial.begin(9600);
  // Give you a moment to open the Serial Monitor
  delay(1000);
  Serial.println("=== LDR Threshold Debug ===");
}

void loop() {
  for (int i = 0; i < SEQ_LENGTH; i++) {
    int val = analogRead(ldrPins[i]);
    Serial.print("LDR ");
    Serial.print(i + 1);
    Serial.print(": ");
    Serial.println(val);
  }
  Serial.println();        // blank line between readings
  delay(500);              // half-second between updates
}
