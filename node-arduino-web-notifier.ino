void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.write("ABC", 3);
  delay(5000);
}
