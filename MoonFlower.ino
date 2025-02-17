#include <WiFi.h>
#include <HTTPClient.h>
#include "DHTesp.h"
#include <math.h>
#include <ArduinoJson.h>
#include <TinyGPSPlus.h>
// #include <MQ135>

DHTesp dht;

// WiFi c
// const char* ssid = "Good House";
// const char* password = "goodhousecafe";
const char* ssid = "";  //Thay bằng wifi và mật khẩu wifi 
const char* password = "";
String locationId = "";

float latitude = 10.811693; //Phòng hờ trường hợp GPS kết nối thất bại
float longitude = 106.705930;
int sensorType;
String serverUrl = "";
// DHT sensor và MQ135
#define MQ135_PIN 35 
#define MQ7_PIN 33  
#define DHT_PIN 23 
#define dustPin 34 
#define ledPower 13
#define RAIN_PIN 32
#define RXD_PIN 16 // RX từ GPS nối vào TXD ESP32
#define TXD_PIN 17 // TX từ GPS nối vào RXD ESP32
#define PPS_PIN 4  // Chân PPS từ GPS (dùng để đồng bộ thời gian nếu cần)

int delayTime=280;
int delayTime2=40;
float offTime=9680; //10000-280-40

bool dataReceived = false;
int dustVal=0;
char s[32];
float voltage = 0;
float dustDensity = 0;
// float calcVoltage = 0;
// #define LED_BUILTIN 4
#define ALERT_THRESHOLD_MQ135 50 // Ngưỡng cảnh báo (ppm)
#define ALERT_THRESHOLD_MQ7 50   // Ngưỡng cảnh báo (ppm)
#define ALERT_THRESHOLD_DUST 30   // Ngưỡng cảnh báo (ppm)
#define CHANGE_THRESHOLD 10        // Ngưỡng thay đổi
HardwareSerial GPS_Serial(2);

// Tạo đối tượng TinyGPSPlus
TinyGPSPlus gps;
String Web_App_URL = "https://script.google.com/macros/s/AKfycbzAS9RBwg_ozpvrM2o5cJnA1-ZY4MSxJYTzSMlm_3MoB-YmdOUYwxsNyBWcuVC3nJDP/exec";

float mq135_value;
float mq7_value;
float temp_value;
float humid_value;
float dust_value;
int rain_value;
String evaluate ="";
String lastEvaluate ="";
// Thời gian giữa các lần cập nhật dữ liệu (15 phút)
unsigned long lastUpdateTime = 0;
const unsigned long updateInterval = 15 * 60 * 1000;  // 15 phút tính bằng mili giây

// Giá trị trước đó để kiểm tra sự thay đổi quá mức
float lastMq135Value = -1;
float lastMq7Value = -1;
float lastTempValue = -1;
float lastHumidityValue = -1;


void setup() {
  Serial.begin(115200); // Giao tiếp với Serial Monitor
  dht.setup(DHT_PIN, DHTesp::DHT11);
  // Kết nối WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  // serverUrl = "http://192.168.1.69:3000/api/packet";

  serverUrl = "https://air-pollution-monitoring-app.onrender.com/api/packet";

  if (!serverUrl.isEmpty()) {
    Serial.println("Server URL: " + serverUrl);
  } else {
    Serial.println("No server found.");
  }
  // Cài đặt LED
  pinMode(ledPower, OUTPUT);
  Serial.println(F("GPS Module Test with TinyGPSPlus"));
  
  // Khởi động giao tiếp với GPS
  GPS_Serial.begin(115200, SERIAL_8N1, RXD_PIN,  TXD_PIN );
  Serial.println(F("GPS Serial started."));
}


float readMQ135() {
  int mq135 = analogRead(MQ135_PIN);
  return map(mq135, 0, 4095, 0, 100);
  // return mq135;
}
float readMQ7() {
  int mq7 = analogRead(MQ7_PIN);
  return   map(mq7, 0, 4095, 0, 100);
  // return mq7;
}

float readDustSensor(){
  digitalWrite(ledPower, LOW);  // power on the LED
  delayMicroseconds(280);       // đo trong 280 microseconds
  dustVal = analogRead(dustPin);
  digitalWrite(ledPower, HIGH); // turn the LED off
  delayMicroseconds(40);        // chờ thêm 40 microseconds

  voltage = dustVal * 3.3 / 4095.0; 
  dustDensity = 0.172 * voltage - 0.1;

  if (dustDensity < 0) dustDensity = 0;
  if (dustDensity > 0.5) dustDensity = 0.5;

  // Chuyển giá trị về chuỗi để in ra Serial
  char voltageStr[10], densityStr[10];
  dtostrf(voltage, 9, 4, voltageStr);
  dtostrf(dustDensity * 1000.0, 5, 2, densityStr);

  String dataString = String(voltageStr) + "V, " + String(densityStr) + "ug/m3";
  // Serial.println(dataString);
  return dustDensity * 1000.0;
}
String getRainLabel(int rainValue) {
  if (4095 - rainValue  <= 50) {
    return "NO_RAIN";
  } else{
    return "RAIN";
  } 
}

int calculateAQI(float mq135, float mq7, float dust) {
  // Chuyển đổi giá trị MQ135 từ 0-100 sang AQI
  if (mq135 >= 60 || mq7 >= 60 || dust >= 100) {  
    return 3; // Hazardous
  } else if (mq135 >= 50 || mq7 >= 50 || dust >= 70) {
    return 2; // Unhealthy
  } else if (mq135 >= 40 || mq7 >= 40 || dust >= 50 ) {
    return 1; // Moderate
  } else{
    return 0; // Good
  } 
}

void calibernate() {
  mq135_value = readMQ135();
  mq7_value = readMQ7();
  temp_value = dht.getTemperature();
  humid_value = dht.getHumidity();
  rain_value = digitalRead(RAIN_PIN);
  dust_value = readDustSensor();
  int aqi = calculateAQI(mq135_value, mq7_value, dust_value);
  evaluate = "";
  // Hiển thị cảnh báo
  switch (aqi) {
    case 0:
      Serial.println("Air Quality: Good");
      evaluate = "Good";
      break;
    case 1:
      Serial.println("Air Quality: Moderate");
      evaluate = "Moderate";
      break;
    case 2:
      Serial.println("Air Quality: Unhealthy for Sensitive Groups");
      evaluate = "Unhealthy";
      break;
    case 3:
      Serial.println("Air Quality: Hazardous! Avoid exposure!");
      evaluate = "Hazardous";
      break;
  }

  // Kiểm tra cảnh báo
  if (mq135_value > ALERT_THRESHOLD_MQ135 || mq7_value > ALERT_THRESHOLD_MQ7|| dust_value > ALERT_THRESHOLD_DUST || lastEvaluate != evaluate ) {
    // Serial.println("Warning!!! Please wear a mask and stay away from this area.");
    writeSheet();
    // triggerAlarm(true);
  }
  // writeSheet();
  lastMq135Value = mq135_value;
  lastMq7Value = mq7_value; 
  lastEvaluate = evaluate;

}

String findNearestPacket(float longitude, float latitude) {
  if (isnan(longitude) || isnan(latitude)) { // Kiểm tra giá trị hợp lệ
    return "";
  }

  // Xây dựng URL API
  String nearestPacket = serverUrl + "/nearest-packet/" + String(latitude, 6) + "&" + String(longitude, 6);
  Serial.println("Requesting: " + nearestPacket);
  if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      // http.setFollowRedirects(HTTPC_FORCE_FOLLOW_REDIRECTS); // Tự động theo dõi redirect
      http.begin(nearestPacket);
      http.addHeader("Content-Type", "application/json");
      
      int httpResponseCode = http.GET();
      Serial.println("HTTP Response Code: " + String(httpResponseCode));

      if (httpResponseCode > 0) {
          String response = http.getString();
          StaticJsonDocument<512> doc;
          DeserializationError error = deserializeJson(doc, response);

          if (!error) {
              if (doc.containsKey("data")) {
                  JsonObject dataObj = doc["data"].as<JsonObject>();
                  if (dataObj.containsKey("locationId")) {
                      const char* locationId = dataObj["locationId"];
                      Serial.println("✅ Nearest Packet Location ID: " + String(locationId));
                      http.end();
                      return String(locationId); // Trả về locationId
                  } else {
                      Serial.println("⚠️ 'locationId' not found in 'data'.");
                  }
              } else {
                  Serial.println("⚠️ 'data' field not found in JSON.");
              }
          } else {
              Serial.println("❌ JSON Parsing Error: " + String(error.c_str()));
          }
      } else {
          Serial.println("❌ HTTP Error: " + String(httpResponseCode));
      }
      http.end();
  } else {
      Serial.println("❌ WiFi not connected");
  }

  return ""; // Trả về chuỗi rỗng nếu có lỗi

}

// void sendDataToServer(float mq135, float mq7, float temperature, float humidity, String rain) {
void sendDataToServer(String locationId, float mq135, float mq7, float temp, float humidity, float dust, int rain, String evaluate) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected");
    return;
  }

  HTTPClient http;
  http.begin(serverUrl);
  StaticJsonDocument<512> doc;

  // Tạo JSON payload
  doc["location"] = locationId;
  doc["evaluate"] = evaluate;
  Serial.println("Location:  " + locationId);
  JsonArray dataset = doc.createNestedArray("dataset");

  JsonObject airQuality = dataset.createNestedObject();
  airQuality["dataType"] = "AIR_QUALITY";
  airQuality["dataValue"] = mq135;

  JsonObject co = dataset.createNestedObject();
  co["dataType"] = "CO";
  co["dataValue"] = mq7;

  JsonObject temperature = dataset.createNestedObject();
  temperature["dataType"] = "TEMPERATURE";
  temperature["dataValue"] = temp;

  JsonObject humidityObj = dataset.createNestedObject();
  humidityObj["dataType"] = "HUMIDITY";
  humidityObj["dataValue"] = humidity;

  JsonObject dustObj = dataset.createNestedObject();
  dustObj["dataType"] = "DUST";
  dustObj["dataValue"] = dust;

  JsonObject rainStatus = dataset.createNestedObject();
  rainStatus["dataType"] = "RAIN_STATUS";
  rainStatus["dataValue"] = getRainLabel(rain);

  String payload;
  serializeJson(doc, payload);

  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(payload);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Response: " + response);
  } else {
    Serial.println("Error sending data: " + String(httpResponseCode));
  }

  http.end();
}

  

void writeSheet() {
  if (isnan(mq135_value) || isnan(mq7_value) || isnan(temp_value) || isnan(humid_value) || isnan(dust_value)) {
    Serial.println("Invalid data detected. Skipping data send.");
    return;
  }

  if (mq135_value < 0 || mq7_value < 0 || temp_value < -40 || temp_value > 80 || humid_value < 0 || humid_value > 100) {
    Serial.println("Sensor values out of range. Skipping data send.");
    return;
  }

  String Send_Data_URL = Web_App_URL + "?sts=write";
  Send_Data_URL += "&co2=" + String(mq135_value);
  Send_Data_URL += "&co=" + String(mq7_value);
  Send_Data_URL += "&humid=" + String(humid_value);
  Send_Data_URL += "&temp=" + String(temp_value);
  Send_Data_URL += "&dust=" + String(dust_value);
  Send_Data_URL += "&rain=" + getRainLabel(rain_value);
  Send_Data_URL += "&evaluate=" + evaluate;

  Serial.println();
  // Serial.println("-------------");
  // Serial.println("Send data to Google Spreadsheet...");
  // Serial.print("URL : ");
  Serial.println(Send_Data_URL);

  HTTPClient http;
  http.begin(Send_Data_URL.c_str());
  http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);

  int httpCode = http.GET();
  Serial.print("HTTP Status Code : ");
  Serial.println(httpCode);
  locationId = findNearestPacket(latitude, longitude);

  if (httpCode > 0) {
    // String payload = http.getString();
    // Serial.println("Payload : " + payload);
  } else {
    Serial.println("Failed to send data. HTTP error.");
  }
  sendDataToServer(locationId, mq135_value, mq7_value, temp_value, humid_value, dust_value, rain_value, evaluate);

  http.end();
}

void loop() {
  if (!dataReceived) {
    while (GPS_Serial.available() > 0) {
      char c = GPS_Serial.read(); // Đọc từng ký tự từ GPS
      if (gps.encode(c)) {        // Nếu dữ liệu hợp lệ
        displayInfo();            // Hiển thị thông tin
        dataReceived = true;      // Đặt cờ đã nhận dữ liệu
        break;                    // Thoát khỏi vòng lặp
      }
    }
  }
  calibernate();
  
  if (!isnan(mq135_value) && !isnan(mq7_value) && !isnan(temp_value) && !isnan(humid_value)) {
    if (millis() - lastUpdateTime >= updateInterval || 
        fabs(mq135_value - lastMq135Value) > CHANGE_THRESHOLD || 
        fabs(mq7_value - lastMq7Value) > CHANGE_THRESHOLD) {
      writeSheet();
      lastUpdateTime = millis();
    }
  } else {
    Serial.println("Skipping data update due to invalid sensor values.");
  }
  // Serial.println(temp_value);
  // Serial.print("Humidity: ");
  // Serial.println(humid_value);
  // Serial.print("Temperature: ");
  // Serial.println(temp_value);
  // Serial.print("CO:");
  // Serial.println(readMQ7());
  // Serial.print("CO2: ");
  // Serial.println(readMQ135());
  
  // delay(600000); //10' 
  // Serial.println(getRainLabel(rain_value));

  delay(1000); 
  
}

void displayInfo()
{
  Serial.print(F("Location: ")); 
  if (gps.location.isValid()) {
    latitude = (gps.location.lat(), 6);
    // Serial.print(latitude);
    // Serial.print(gps.location.lat());

    Serial.print(F(","));
    longitude = (gps.location.lng(), 6);
    // Serial.print(gps.location.lng());
    // Serial.print(longitude);
    locationId = findNearestPacket(latitude, longitude);
  } else {
    locationId = findNearestPacket(latitude, longitude);

    Serial.print(F("INVALID"));
  }

  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid()) {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  } else {
    Serial.print(F("INVALID"));
  }

  Serial.print(F(" "));
  if (gps.time.isValid()) {
    if (gps.time.hour() < 10) Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10) Serial.print(F("0"));
    Serial.print(gps.time.centisecond());
  } else {
    Serial.print(F("INVALID"));
  }

  Serial.println();
}