#include <Arduino.h>

#define SEQ_LENGTH 6

// LED & LDR pin configuration
const int ledPins[SEQ_LENGTH] = {2, 6, 5, 7, 3, 4};
const int ldrPins[SEQ_LENGTH] = {A0, A1, A2, A5, A4, A3};
const int ldrThresholds[SEQ_LENGTH] = { 450, 650, 650, 500, 400, 300 };

int pattern[SEQ_LENGTH]; // pattern to be filled in once received from the backend
int currentStep = 0; // current position in sequence
bool patternLoaded = false; // will update when received from the backend

unsigned long startTime = 0; // timer
unsigned long endTime   = 0;

void setup() {
  Serial.begin(9600);

  // configure LEDs & LDRs
  for (int i = 0; i < SEQ_LENGTH; i++) {
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], LOW);
    pinMode(ldrPins[i], INPUT);
  }
}

void loop() {
  // 1) until we get a pattern, try reading it from Serial
  if (!patternLoaded && Serial.available()) {
    String line = Serial.readStringUntil('\n');
    line.trim();  // remove whitespace

    if (line.indexOf(',') >= 0) { // ignore the lines where I print ldrLightLevel
      int idx = 0;
      char buf[line.length() + 1];
      line.toCharArray(buf, sizeof(buf));
      char* tok = strtok(buf, ",");
      while (tok && idx < SEQ_LENGTH) {
        pattern[idx++] = atoi(tok);
        tok = strtok(NULL, ",");
      }
      if (idx == SEQ_LENGTH) {
        patternLoaded = true;
        currentStep = 0;
        startTime = millis(); // start timer!

        int firstHole = pattern[0] - 1;
        digitalWrite(ledPins[firstHole], HIGH); // light the first LED!

        Serial.print("Loaded pattern: ");
        for (int i = 0; i < SEQ_LENGTH; i++) {
          Serial.print(pattern[i]);
          Serial.print(i < SEQ_LENGTH - 1 ? "," : "\n");
        }
      }
    }
  }

  // 2) run the sequence
  if (patternLoaded && currentStep < SEQ_LENGTH) {
    int holeIndex = pattern[currentStep] - 1;
    int lightLevel = analogRead(ldrPins[holeIndex]);
    int threshold  = ldrThresholds[holeIndex];

    if (lightLevel < threshold) { // peg inserted
      digitalWrite(ledPins[holeIndex], LOW); // turn LED off

      currentStep++; // move on
      delay(200);  // debounce

      if (currentStep < SEQ_LENGTH) {
        int nextHole = pattern[currentStep] - 1; 
        digitalWrite(ledPins[nextHole], HIGH); // turn next LED on, rinse & repeat
      } else {
        endTime = millis(); // end timer!
        float durationSec = (endTime - startTime) / 1000.0;
        Serial.print("DURATION:");
        Serial.println(durationSec, 2);

        // reset, and await new pattern
        patternLoaded = false;
      }
    }
  }
}
