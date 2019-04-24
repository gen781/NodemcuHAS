#include <DHT.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

String appId = "57d191984a9efa68228b4760";//Application ID Pushbots
String appSecret = "346efbcad61ececd7e0cbff7ab532832";//Application Secret Pushbots
const char* serverPushbots = "api.pushbots.com";//Nama server IOT
const char* ssid = "Gensprint 4G";//Nama SSID
const char* password = "sukasukaaja";// Password SSID
int ctrlA = 14;//set pin D5 untuk control A IC CD4051
int ctrlB = 12;//set pin D6 untuk control B IC CD4051
int ctrlC = 13;//set pin D7 untuk control C IC CD4051
int outSensorPin = 15;//set pin D8 untuk output IC CD4051
int statusPIR = 0; //status logical PIR
int dataPIR = 0; // data input PIR
int statusUltra = 0; //status logical Ultrasonic
int dataUltra = 0; // data input Ultrasonic
int dataFlame = 0;
int statusFlame = 0;
String KontrolPIR, pushNotif, pesan;
int trigPin = 0; //set pin D3 untuk input triger dari sensor Ultrasonic
int echoPin = 2; //set pin D4 untuk input echo dari sensor Ultrasonic
int duration, distance; //durasi & jarak pada sensor Utrasonic
int dataGas = 0; // data input sensor Gas
int statusGas = 0; //status logical sensor Gas
const int dataPin = 16;   //set pin D0 untuk transfer data lampu pada SN74HC595
const int loadPin = 5;   //set pin D1 untuk kontrol SN74HC595
const int clockPin = 4;  //set pin D2 sebagai sinyal clock untuk mengontrol transfer data pada SN74HC595
int lampData=63; //data lampu yang akan ditransfer ke SN74HC595
int lamp1=0;
int lamp2=0;
int lamp3=0;
int lamp4=0;
int lamp5=0;
int lamp6=0;
float h1,h2,h3,h4,t1,t2,t3,t4; //variable humidity & temperatur dari DHT11
#define DHTPIN 15 //set pin D8 sebagai input dari DHT11
DHT dht(DHTPIN, DHT11,15);
DHT dht2(DHTPIN, DHT11,15);
DHT dht3(DHTPIN, DHT11,15);
DHT dht4(DHTPIN, DHT11,15);
WiFiClient client;
HTTPClient http;

void setup() {

  pinMode(ctrlA, OUTPUT);
  pinMode(ctrlB, OUTPUT);
  pinMode(ctrlC, OUTPUT);
  pinMode(outSensorPin, INPUT);
  pinMode(dataPin, OUTPUT);
  pinMode(loadPin, OUTPUT);
  pinMode(clockPin, OUTPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  transferLampData();
  Serial.begin(115200);
  delay(10);
  dht.begin();
  WiFi.begin(ssid, password);
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

}

void loop() {

  readLampControlGeeknesia();
  transferLampData();
  readSensorControlGeeknesia();
  readSuhu();
  sendSensorDataGeeknesia();
  
}

void sendPushNotif() {

  if (pushNotif=="pir") pesan = "Peringatan, ada orang yang masuk ke dalam rumahmu!";
  else if (pushNotif=="ultra") pesan = "Peringatan, seseorang telah memindahkan mobil Anda dari tempat parkir!";
  else if (pushNotif=="gas") pesan = "Peringatan, terjadi kebocoran gas di rumah Anda!";
  else if (pushNotif=="flame") pesan = "Peringatan, terjadi kebakaran di rumah Anda!";

  if((WiFi.status() == WL_CONNECTED))
    {   
        HTTPClient http;
        http.begin("http://api.pushbots.com/push/all");
        http.addHeader("x-pushbots-appId", appId);
        http.addHeader("x-pushbots-secret", appSecret);
        http.addHeader("Content-Type", "application/json");
        int httpCode = http.POST("{\"platform\":\"1\",\"msg\":\""+pesan+"\"}");
        if(httpCode <= 0)
        {
            Serial.printf("[HTTP] POST PushBots... failed, error: %s\n", http.errorToString(httpCode).c_str());
        } 
        // tutup koneksi HTTP
        http.end();
    }

}

void sendSensorDataGeeknesia() {

  if((WiFi.status() == WL_CONNECTED))
    {
        HTTPClient http;
        http.begin("http://api.geeknesia.com/api/data?api_key=23bdfcea596df190cbb7490a1a4454f1");
        http.addHeader("Content-Type", "application/x-www-form-urlencoded");
        int httpCode = http.POST("attributes={\"Suhu1\":"+String(t1)+",\"Humidity1\":"+String(h1)+",\"Suhu2\":"+String(t2)+",\"Humidity2\":"+String(h2)+",\"Suhu3\":"+String(t3)+",\"Humidity3\":"+String(h3)+",\"Suhu4\":"+String(t4)+",\"Humidity4\":"+String(h4)+",\"Pir\":"+String(dataPIR)+",\"Ultra\":"+String(dataUltra)+",\"Gas\":"+String(dataGas)+",\"Flame\":"+String(dataFlame)+"}");
        // httpCode akan bernilai negatif bila error
        if(httpCode > 0)
        {
            // cetak httpCode ke Serial
            // Serial.printf("[HTTP] POST... code: %d\n", httpCode);
            // bila nilai dari server diterima
            if(httpCode == HTTP_CODE_OK)
            {
                // cetak string json dari server
                String strData = http.getString();
                Serial.println(strData);     
            }
        } else {
            Serial.printf("[HTTP] POST Geeknesia... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }
        // tutup koneksi HTTP
       http.end();
    }
  delay(1000);

}

void readLampControlGeeknesia() {

  if((WiFi.status() == WL_CONNECTED))
    {
        HTTPClient http;
        http.begin("http://api.geeknesia.com/api/attributes");
        http.addHeader("apiKey", "ac7e300812320e2f71e05380952e12b7");
        http.addHeader("Content-Type", "application/x-www-form-urlencoded");

        // mulai koneksi dan ambil HTTP Header
        int httpCode = http.POST("limit=1");;
        // httpCode akan bernilai negatif bila error
        if(httpCode > 0)
        {
            // cetak httpCode ke Serial
            //Serial.printf("[HTTP] POST... code: %d\n", httpCode);
            // bila nilai dari server diterima
            if(httpCode == HTTP_CODE_OK)
            {
                // cetak string json dari server
                String strData = http.getString();
                //Serial.println(strData);
                String jsonReq = strData; //if send json data, it have only 1 argument
                int size = jsonReq.length() + 1;
                char json[size];
                jsonReq.toCharArray(json, size);
                StaticJsonBuffer<600> jsonBuffer;
                JsonObject& root = jsonBuffer.parseObject(json); // parsing json data
                JsonArray& attributes = root["output"]["data"][0]["attributes"];

                if (!root.success()){
                  Serial.println("parseObject() failed");
                  return;
                } 

                int arraySize = attributes.size();   //get size of JSON Array
                //Serial.print("\nSize of value array: ");
                //Serial.println(arraySize);

                for (int i = 0; i < arraySize; i++) { //Iterate through results
                  //String hasil = attributes[i];
                  //Serial.println(hasil);
                  JsonObject& attributesNew = attributes[i];
                  String nama = attributesNew["name"];
                  String nilai = attributesNew["value"];
                  //Serial.print(nama);
                  //Serial.println(nilai);
                  if (lamp1==0 && nama == "Lamp1" && nilai == "1"){
                      Serial.println(nama+" hidup");
                      lampData-=1;
                      //transferLampData();
                      lamp1 = 1;
                  } else if (lamp1==1 && nama == "Lamp1" && nilai == "0"){
                      Serial.println(nama+" mati");
                      lampData+=1;
                      //transferLampData();
                      lamp1 = 0;
                  }
                  if (lamp2==0 && nama == "Lamp2" && nilai == "1"){
                      Serial.println(nama+" hidup");
                      lampData-=2;
                      //transferLampData();
                      lamp2 = 1;
                  } else if (lamp2==1 && nama == "Lamp2" && nilai == "0"){
                      Serial.println(nama+" mati");
                      lampData+=2;
                      //transferLampData();
                      lamp2 = 0;
                  }
                  if (lamp3==0 && nama == "Lamp3" && nilai == "1"){
                      Serial.println(nama+" hidup");
                      lampData-=4;
                      //transferLampData();
                      lamp3 = 1;
                  } else if (lamp3==1 && nama == "Lamp3" && nilai == "0"){
                      Serial.println(nama+" mati");
                      lampData+=4;
                      //transferLampData();
                      lamp3 = 0;
                  }
                  if (lamp4==0 && nama == "Lamp4" && nilai == "1"){
                      Serial.println(nama+" hidup");
                      lampData-=8;
                      //transferLampData();
                      lamp4 = 1;
                  } else if (lamp4==1 && nama == "Lamp4" && nilai == "0"){
                      Serial.println(nama+" mati");
                      lampData+=8;
                      //transferLampData();
                      lamp4 = 0;
                  }
                  if (lamp5==0 && nama == "Lamp5" && nilai == "1"){
                      Serial.println(nama+" hidup");
                      lampData-=16;
                      //transferLampData();
                      lamp5 = 1;
                  } else if (lamp5==1 && nama == "Lamp5" && nilai == "0"){
                      Serial.println(nama+" mati");
                      lampData+=16;
                      //transferLampData();
                      lamp5 = 0;
                  }
                  if (lamp6==0 && nama == "Lamp6" && nilai == "1"){
                      Serial.println(nama+" hidup");
                      lampData-=32;
                      //transferLampData();
                      lamp6 = 1;
                  } else if (lamp6==1 && nama == "Lamp6" && nilai == "0"){
                      Serial.println(nama+" mati");
                      lampData+=32;
                      //transferLampData();
                      lamp6 = 0;
                  }
                }
                Serial.print(lampData);          
            }
        } else {
            Serial.printf("[HTTP] POST Geeknesia... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }
        // tutup koneksi HTTP
       http.end();
    }
  delay(1000);

}

void readSensorControlGeeknesia() {

  if((WiFi.status() == WL_CONNECTED))
    {
        HTTPClient http;
        http.begin("http://api.geeknesia.com/api/attributes");
        http.addHeader("apiKey", "122226c8c8371e86aa1551e2a905cde1");
        http.addHeader("Content-Type", "application/x-www-form-urlencoded");

        // mulai koneksi dan ambil HTTP Header
        int httpCode = http.POST("limit=1");;
        // httpCode akan bernilai negatif bila error
        if(httpCode > 0)
        {
            // cetak httpCode ke Serial
            //Serial.printf("[HTTP] POST... code: %d\n", httpCode);
            // bila nilai dari server diterima
            if(httpCode == HTTP_CODE_OK)
            {
                // cetak string json dari server
                String strData = http.getString();
                //Serial.println(strData);
                String jsonReq = strData; //if send json data, it have only 1 argument
                int size = jsonReq.length() + 1;
                char json[size];
                jsonReq.toCharArray(json, size);
                StaticJsonBuffer<600> jsonBuffer;
                JsonObject& root = jsonBuffer.parseObject(json); // parsing json data
                JsonArray& attributes = root["output"]["data"][0]["attributes"];

                if (!root.success()){
                  Serial.println("parseObject() failed");
                  return;
                } 

                int arraySize = attributes.size();   //get size of JSON Array
                //Serial.print("\nSize of value array: ");
                //Serial.println(arraySize);

                for (int i = 0; i < arraySize; i++) { //Iterate through results
                  //String hasil = attributes[i];
                  //Serial.println(hasil);
                  JsonObject& attributesNew = attributes[i];
                  String nama = attributesNew["name"];
                  String nilai = attributesNew["value"];
                  //Serial.print(nama);
                  //Serial.println(nilai);
                  if (nama == "KontrolPIR" && nilai == "1"){
                      Serial.println(nama+" hidup");
                      readPIR();
                      KontrolPIR = "1";
                  } else if (nama == "KontrolPIR" && nilai == "0"){
                      Serial.println(nama+" mati");
                      //digitalWrite(indikator, LOW); //matikan led indikator PIR    
                      statusPIR = LOW;
                      dataPIR= LOW;
                      KontrolPIR = "0";
                  }
                  if (nama == "KontrolUltra" && nilai == "1"){
                      Serial.println(nama+" hidup");
                      readUltra();
                  } else if (nama == "KontrolUltra" && nilai == "0"){
                      Serial.println(nama+" mati");
                      statusUltra = LOW;
                  }
                  if (nama == "KontrolGas" && nilai == "1"){
                      Serial.println(nama+" hidup");
                      readGas();
                  } else if (nama == "KontrolGas" && nilai == "0"){
                      Serial.println(nama+" mati");
                      statusGas = LOW;
                  }
                  if (nama == "KontrolFlame" && nilai == "1"){
                      Serial.println(nama+" hidup");
                      readFlame();
                  } else if (nama == "KontrolFlame" && nilai == "0"){
                      Serial.println(nama+" mati");
                      statusFlame = LOW;
                  }
                }          
            }
        } else {
            Serial.printf("[HTTP] POST Geeknesia... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }
        // tutup koneksi HTTP
       http.end();
    }
  delay(1000);

}

void readPIR() {

  digitalWrite(ctrlC, LOW);
  digitalWrite(ctrlB, LOW);
  digitalWrite(ctrlA, LOW);
  dataPIR = digitalRead(outSensorPin); //baca input dr out PIR
  if ((dataPIR == HIGH) && (statusPIR == LOW)) { //cek jika ada pergerakan
    Serial.println("Motion detected!"); //buat monitor ke laptop
    statusPIR = HIGH; //diset high supaya tidak mendeteksi terus
    pushNotif="pir";
    sendPushNotif();//memanggil fungsi
  } else {
    if ((dataPIR == LOW) && (statusPIR == HIGH)){
      Serial.println("Motion ended!");//buat monitor ke laptop
      statusPIR = LOW;
    }
  }

}

void readUltra() {
  
  digitalWrite (trigPin, LOW);
  delayMicroseconds(8);
  digitalWrite (trigPin, HIGH);
  delayMicroseconds(8);
  digitalWrite (trigPin, LOW);
  delayMicroseconds(8);
  duration=pulseIn(echoPin, HIGH);
  distance=(duration/2)/29.1;
  if(distance >=10) dataUltra = HIGH;
  else dataUltra = LOW;
  if ((dataUltra == HIGH) && (statusUltra == LOW)) {
    statusUltra = HIGH; 
    pushNotif="ultra";
    Serial.println("Your car has been moved!");
    sendPushNotif();
  } else if ((dataUltra == LOW) && (statusUltra == HIGH)){
    statusUltra = LOW;
    Serial.println("Your car still in the position");
  }
  Serial.print("Jarak mobil dengan dinding : ");
  Serial.print(distance);
  Serial.println(" cm");
  
}

void readGas() {

  digitalWrite(ctrlC, LOW);
  digitalWrite(ctrlB, LOW);
  digitalWrite(ctrlA, HIGH);
  dataGas = !digitalRead(outSensorPin); //baca input dr output sensor Gas
  //Serial.println(dataGas);
  if ((dataGas == HIGH) && (statusGas == LOW)) { //cek jika ada kebocoran gas
    Serial.println("Gas leakage detected!"); //buat monitor ke komputer
    statusGas = HIGH; //diset high supaya tidak mendeteksi terus
    pushNotif="gas";
    sendPushNotif();//memanggil fungsi
  } else if ((dataGas == LOW) && (statusGas == HIGH)){
    Serial.println("No gas leakage!");//buat monitor ke komputer
    statusGas = LOW;
  }
  
}

void readFlame() {

  digitalWrite(ctrlC, LOW);
  digitalWrite(ctrlB, HIGH);
  digitalWrite(ctrlA, LOW);
  dataFlame = !digitalRead(outSensorPin); //baca input dr output sensor Gas
  //Serial.println(dataFlame);
  if ((dataFlame == HIGH) && (statusFlame == LOW)) { //cek jika ada kebocoran gas
    Serial.println("Flame detected!"); //buat monitor ke komputer
    statusFlame = HIGH; //diset high supaya tidak mendeteksi terus
    pushNotif="flame";
    sendPushNotif();//memanggil fungsi
  } else if ((dataFlame == LOW) && (statusFlame == HIGH)){
    Serial.println("No flame!");//buat monitor ke komputer
    statusFlame = LOW;
  }
  
}

void readSuhu(){

  digitalWrite(ctrlC, LOW);
  digitalWrite(ctrlB, HIGH);
  digitalWrite(ctrlA, HIGH);
  h1 = dht.readHumidity();
  t1 = dht.readTemperature();
  if (isnan(h1) || isnan(t1)) {
    Serial.println("Failed to read from DHT sensor#1!");
    return;
  }

  digitalWrite(ctrlC, HIGH);
  digitalWrite(ctrlB, LOW);
  digitalWrite(ctrlA, LOW);
  h2 = dht2.readHumidity();
  t2 = dht2.readTemperature();
  if (isnan(h2) || isnan(t2)) {
    Serial.println("Failed to read from DHT sensor#2!");
    return;
  }

  digitalWrite(ctrlC, HIGH);
  digitalWrite(ctrlB, LOW);
  digitalWrite(ctrlA, HIGH);
  h3 = dht3.readHumidity();
  t3 = dht3.readTemperature();
  if (isnan(h3) || isnan(t3)) {
    Serial.println("Failed to read from DHT sensor#3!");
    return;
  }

  digitalWrite(ctrlC, HIGH);
  digitalWrite(ctrlB, HIGH);
  digitalWrite(ctrlA, LOW);
  h4 = dht4.readHumidity();
  t4 = dht4.readTemperature();
  if (isnan(h4) || isnan(t4)) {
    Serial.println("Failed to read from DHT sensor#4!");
    return;
  }
  
}

void transferLampData() {
  
  digitalWrite(loadPin, LOW);
  shiftOut(dataPin, clockPin, MSBFIRST, lampData);
  digitalWrite(loadPin, HIGH);

}

