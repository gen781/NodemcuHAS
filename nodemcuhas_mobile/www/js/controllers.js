angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('TemperatureCtrl', function($scope, $http) {
  $scope.getTemperatureData = function(){
    $http.post('http://api.geeknesia.com/api/attributes', {data: {'limit': '1'}},  {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'apiKey': '23bdfcea596df190cbb7490a1a4454f1'}})
    .success(function(data) {
      $scope.result = angular.fromJson(data.output.data[0].attributes);
      var arraySize = $scope.result.length;
      for (var i = 0; i < arraySize; i++) {
        var nama = $scope.result[i].name;
        var nilai = $scope.result[i].value;
        if (nama == 'Suhu1') {
          $scope.suhu1 = nilai;
        } else if (nama == 'Humidity1') {
          $scope.humidity1 = nilai;
        }  
        if (nama == 'Suhu2') {
          $scope.suhu2 = nilai;
        } else if (nama == 'Humidity2') {
          $scope.humidity2 = nilai;
        }  
        if (nama == 'Suhu3') {
          $scope.suhu3 = nilai;
        } else if (nama == 'Humidity3') {
          $scope.humidity3 = nilai;
        }  
        if (nama == 'Suhu4') {
          $scope.suhu4 = nilai;
        } else if (nama == 'Humidity4') {
          $scope.humidity4 = nilai;
        }  
      }
    })
  };
  setInterval($scope.getTemperatureData, 1000);
})

.controller('LightingCtrl',function($scope, $http) {
  $scope.lamp1 = {nilai:'0',checked:false};
  $scope.lamp2 = {nilai:'0',checked:false};
  $scope.lamp3 = {nilai:'0',checked:false};
  $scope.lamp4 = {nilai:'0',checked:false};
  $scope.lamp5 = {nilai:'0',checked:false};
  $scope.lamp6 = {nilai:'0',checked:false};
  
  /*
  $http.get('http://api.geeknesia.com/api/attribute/Lamp1?api_key=ac7e300812320e2f71e05380952e12b7')
  .then(function(response) {
    $scope.bacaHasil = response.data;
    
    if (angular.toJson($scope.bacaHasil) == '{"output":{"attribute":{"Lamp1":1}}}') {
      $scope.lamp1.nilai = '1';
      $scope.lamp1.checked = true;
      //alert($scope.lamp1.nilai);
    } else {
      $scope.lamp1.nilai = '0';
      //alert($scope.lamp1.nilai);
      //alert(angular.toJson($scope.bacaHasil));    
    }
  })
  */

  $http.post('http://api.geeknesia.com/api/attributes', {data: {'limit': '1'}},  {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'apiKey': 'ac7e300812320e2f71e05380952e12b7'}})
  .success(function(data) {
    $scope.result1 = angular.fromJson(data.output.data[0].attributes);
    var arraySize1 = $scope.result1.length;
    //alert(arraySize1);
    for (var i = 0; i < arraySize1; i++) {
      var nama1 = $scope.result1[i].name;
      var nilai1 = $scope.result1[i].value;
      //alert(nama1);
      if (nama1 == 'Lamp1' && nilai1 == '1') {
        $scope.lamp1.nilai = '1';
        $scope.lamp1.checked = true;
      } else if (nama1 == 'Lamp1' && nilai1 == '0'){
        $scope.lamp1.nilai = '0';
      }
      if (nama1 == 'Lamp2' && nilai1 == '1') {
        $scope.lamp2.nilai = '1';
        $scope.lamp2.checked = true;
      } else if (nama1 == 'Lamp1' && nilai1 == '0'){
        $scope.lamp2.nilai = '0';
      }
      if (nama1 == 'Lamp3' && nilai1 == '1') {
        $scope.lamp3.nilai = '1';
        $scope.lamp3.checked = true;
      } else if (nama1 == 'Lamp3' && nilai1 == '0'){
        $scope.lamp2.nilai = '0';
      }
      if (nama1 == 'Lamp4' && nilai1 == '1') {
        $scope.lamp4.nilai = '1';
        $scope.lamp4.checked = true;
      } else if (nama1 == 'Lamp1' && nilai1 == '0'){
        $scope.lamp4.nilai = '0';
      }
      if (nama1 == 'Lamp5' && nilai1 == '1') {
        $scope.lamp5.nilai = '1';
        $scope.lamp5.checked = true;
      } else if (nama1 == 'Lamp5' && nilai1 == '0'){
        $scope.lamp5.nilai = '0';
      }
      if (nama1 == 'Lamp6' && nilai1 == '1') {
        $scope.lamp6.nilai = '1';
        $scope.lamp6.checked = true;
      } else if (nama1 == 'Lamp6' && nilai1 == '0'){
        $scope.lamp6.nilai = '0';
      }     
    }
  })

  $scope.updateLamp1 = function () {   

    /*
    //Metode GET dengan alamat url langsung
    $http.get('https://api.thingspeak.com/update?api_key=I6K0RV2VMVIFCY88&field6=1')
    .success(function(data) {
        alert(data)
    })
    .error(function(data) {
        alert("ERROR");
    });
  

    //Metode GET dengan menggunakan parameter
    if($scope.lamp1 == 'mati'){
      $scope.lamp1 = 'hidup';
    } else if ($scope.lamp1 == 'hidup'){
      $scope.lamp1 = 'mati';
    }

    $http.get('https://api.thingspeak.com/update.json', {params: {api_key : 'I6K0RV2VMVIFCY88', field6 : $scope.lamp1}})
      .success(function (data) {
        alert($scope.lamp1);
      })
      .error(function () {
        alert("ERROR");
      });
    */

    /*
    //metode POST menggunakan parameter v2
    var data = {
      api_key : 'I6K0RV2VMVIFCY88', 
      field6 : $scope.lamp1
    };

    if($scope.lamp1 == 'mati'){
      $scope.lamp1 = 'hidup';
    } else if ($scope.lamp1 == 'hidup'){
      $scope.lamp1 = 'mati';
    }

    $http.post('https://api.thingspeak.com/update.json', JSON.stringify(data))
      .success(function (hasil) {
        alert(hasil);
      })
      .error(function () {
        alert("ERROR");
      });
    */
    
    if($scope.lamp1.nilai == '0'){
      $scope.lamp1.nilai = '1';
    } else if ($scope.lamp1.nilai == '1'){
      $scope.lamp1.nilai = '0';
    }
    $http.get('http://api.geeknesia.com/api/data?api_key=ac7e300812320e2f71e05380952e12b7&attributes={"Lamp1":'+$scope.lamp1.nilai+',"Lamp2":'+$scope.lamp2.nilai+',"Lamp3":'+$scope.lamp3.nilai+',"Lamp4":'+$scope.lamp4.nilai+',"Lamp5":'+$scope.lamp5.nilai+',"Lamp6":'+$scope.lamp6.nilai+'}');
    
    /*
    //metode GET menggunakan parameter pada Geeknesia
    if($scope.lamp1 == 'mati'){
      $scope.lamp1 = 'hidup';
    } else if ($scope.lamp1 == 'hidup'){
      $scope.lamp1 = 'mati';
    }

    $http.get('http://api.geeknesia.com/api/data', {params: {api_key : 'ac7e300812320e2f71e05380952e12b7', attributes : {"Lamp1":$scope.lamp1}}})
      //.success(function () {
        //alert($scope.lamp1);
      //})
      //.error(function () {
      //  alert("ERROR");
      //});
    */
  };

  $scope.updateLamp2 = function () {   
    if($scope.lamp2.nilai == '0'){
      $scope.lamp2.nilai = '1';
    } else if ($scope.lamp2.nilai == '1'){
      $scope.lamp2.nilai = '0';
    }
    $http.get('http://api.geeknesia.com/api/data?api_key=ac7e300812320e2f71e05380952e12b7&attributes={"Lamp1":'+$scope.lamp1.nilai+',"Lamp2":'+$scope.lamp2.nilai+',"Lamp3":'+$scope.lamp3.nilai+',"Lamp4":'+$scope.lamp4.nilai+',"Lamp5":'+$scope.lamp5.nilai+',"Lamp6":'+$scope.lamp6.nilai+'}');
  };

  $scope.updateLamp3 = function () {   
    if($scope.lamp3.nilai == '0'){
      $scope.lamp3.nilai = '1';
    } else if ($scope.lamp3.nilai == '1'){
      $scope.lamp3.nilai = '0';
    }
    $http.get('http://api.geeknesia.com/api/data?api_key=ac7e300812320e2f71e05380952e12b7&attributes={"Lamp1":'+$scope.lamp1.nilai+',"Lamp2":'+$scope.lamp2.nilai+',"Lamp3":'+$scope.lamp3.nilai+',"Lamp4":'+$scope.lamp4.nilai+',"Lamp5":'+$scope.lamp5.nilai+',"Lamp6":'+$scope.lamp6.nilai+'}');
  };

  $scope.updateLamp4 = function () {   
    if($scope.lamp4.nilai == '0'){
      $scope.lamp4.nilai = '1';
    } else if ($scope.lamp4.nilai == '1'){
      $scope.lamp4.nilai = '0';
    }
    $http.get('http://api.geeknesia.com/api/data?api_key=ac7e300812320e2f71e05380952e12b7&attributes={"Lamp1":'+$scope.lamp1.nilai+',"Lamp2":'+$scope.lamp2.nilai+',"Lamp3":'+$scope.lamp3.nilai+',"Lamp4":'+$scope.lamp4.nilai+',"Lamp5":'+$scope.lamp5.nilai+',"Lamp6":'+$scope.lamp6.nilai+'}');
  };

  $scope.updateLamp5 = function () {   
    if($scope.lamp5.nilai == '0'){
      $scope.lamp5.nilai = '1';
    } else if ($scope.lamp5.nilai == '1'){
      $scope.lamp5.nilai = '0';
    }
    $http.get('http://api.geeknesia.com/api/data?api_key=ac7e300812320e2f71e05380952e12b7&attributes={"Lamp1":'+$scope.lamp1.nilai+',"Lamp2":'+$scope.lamp2.nilai+',"Lamp3":'+$scope.lamp3.nilai+',"Lamp4":'+$scope.lamp4.nilai+',"Lamp5":'+$scope.lamp5.nilai+',"Lamp6":'+$scope.lamp6.nilai+'}');
  };

  $scope.updateLamp6 = function () {   
    if($scope.lamp6.nilai == '0'){
      $scope.lamp6.nilai = '1';
    } else if ($scope.lamp6.nilai == '1'){
      $scope.lamp6.nilai = '0';
    }
    $http.get('http://api.geeknesia.com/api/data?api_key=ac7e300812320e2f71e05380952e12b7&attributes={"Lamp1":'+$scope.lamp1.nilai+',"Lamp2":'+$scope.lamp2.nilai+',"Lamp3":'+$scope.lamp3.nilai+',"Lamp4":'+$scope.lamp4.nilai+',"Lamp5":'+$scope.lamp5.nilai+',"Lamp6":'+$scope.lamp6.nilai+'}');
  };

  $scope.onAll = function () {   
    $http.get('http://api.geeknesia.com/api/data?api_key=ac7e300812320e2f71e05380952e12b7&attributes={"Lamp1":"1","Lamp2":"1","Lamp3":"1","Lamp4":"1","Lamp5":"1","Lamp6":"1"}');
    $scope.lamp1.checked = true;
    $scope.lamp2.checked = true;
    $scope.lamp3.checked = true;
    $scope.lamp4.checked = true;
    $scope.lamp5.checked = true;
    $scope.lamp6.checked = true;
    $scope.lamp1.nilai = '1';
    $scope.lamp2.nilai = '1';
    $scope.lamp3.nilai = '1';
    $scope.lamp4.nilai = '1';
    $scope.lamp5.nilai = '1';
    $scope.lamp6.nilai = '1';
  };

  $scope.offAll = function () {   
    $http.get('http://api.geeknesia.com/api/data?api_key=ac7e300812320e2f71e05380952e12b7&attributes={"Lamp1":"0","Lamp2":"0","Lamp3":"0","Lamp4":"0","Lamp5":"0","Lamp6":"0"}');
    $scope.lamp1.checked = false;
    $scope.lamp2.checked = false;
    $scope.lamp3.checked = false;
    $scope.lamp4.checked = false;
    $scope.lamp5.checked = false;
    $scope.lamp6.checked = false;
    $scope.lamp1.nilai = '0';
    $scope.lamp2.nilai = '0';
    $scope.lamp3.nilai = '0';
    $scope.lamp4.nilai = '0';
    $scope.lamp5.nilai = '0';
    $scope.lamp6.nilai = '0';
  };

})

.controller('SecurityCtrl',function($scope, $http) {
  $scope.sensor1 = {nilai:'0',checked:false, status:'Tidak aktif'};
  $scope.sensor2 = {nilai:'0',checked:false, status:'Tidak aktif'};
  $scope.sensor3 = {nilai:'0',checked:false, status:'Tidak aktif'};
  $scope.sensor4 = {nilai:'0',checked:false, status:'Tidak aktif'};
  //$http.get('http://api.geeknesia.com/api/attribute/KontrolPIR?api_key=ac7e300812320e2f71e05380952e12b7')
  $http.post('http://api.geeknesia.com/api/attributes', {data: {'limit': '1'}},  {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'apiKey': '122226c8c8371e86aa1551e2a905cde1'}})
  .success(function(data) {
    $scope.result = angular.fromJson(data.output.data[0].attributes);
    var arraySize = $scope.result.length;
    //alert(arraySize);
    for (var i = 0; i < arraySize; i++) {
      var nama = $scope.result[i].name;
      var nilai = $scope.result[i].value;
      if (nama == 'KontrolPIR' && nilai == '1') {
        $scope.sensor1.nilai = '1';
        $scope.sensor1.checked = true;
        $scope.sensor1.status = 'Aktif';
      } else if (nama == 'KontrolPIR' && nilai == '0'){
        $scope.sensor1.nilai = '0';
        $scope.sensor1.status = 'Tidak aktif';
      }
      if (nama == 'KontrolUltra' && nilai == '1') {
        $scope.sensor2.nilai = '1';
        $scope.sensor2.checked = true;
        $scope.sensor2.status = 'Aktif';
      } else if (nama == 'KontrolUltra' && nilai == '0'){
        $scope.sensor2.nilai = '0';
        $scope.sensor2.status = 'Tidak aktif';
      }   
       if (nama == 'KontrolGas' && nilai == '1') {
        $scope.sensor3.nilai = '1';
        $scope.sensor3.checked = true;
        $scope.sensor3.status = 'Aktif';
      } else if (nama == 'KontrolGas' && nilai == '0'){
        $scope.sensor3.nilai = '0';
        $scope.sensor3.status = 'Tidak aktif';
      }  
       if (nama == 'KontrolFlame' && nilai == '1') {
        $scope.sensor4.nilai = '1';
        $scope.sensor4.checked = true;
        $scope.sensor4.status = 'Aktif';
      } else if (nama == 'KontrolFlame' && nilai == '0'){
        $scope.sensor4.nilai = '0';
        $scope.sensor4.status = 'Tidak aktif';
      }  

    }
  })

  $scope.updateSensor1 = function () {   
    if($scope.sensor1.nilai == '0'){
      $scope.sensor1.nilai = '1';
      $scope.sensor1.status = 'Aktif';
    } else if ($scope.sensor1.nilai == '1'){
      $scope.sensor1.nilai = '0';
      $scope.sensor1.status = 'Tidak aktif';
    }
    $http.get('http://api.geeknesia.com/api/data?api_key=122226c8c8371e86aa1551e2a905cde1&attributes={"KontrolPIR":'+$scope.sensor1.nilai+',"KontrolUltra":'+$scope.sensor2.nilai+',"KontrolGas":'+$scope.sensor3.nilai+',"KontrolFlame":'+$scope.sensor4.nilai+'}');
    //$http.post('http://api.geeknesia.com/api/data?api_key=ac7e300812320e2f71e05380952e12b7', {data: {'attributes':{'KontrolPIR':'1'}}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
  };

  $scope.updateSensor2 = function () {   
    if($scope.sensor2.nilai == '0'){
      $scope.sensor2.nilai = '1';
      $scope.sensor2.status = 'Aktif';
    } else if ($scope.sensor2.nilai == '1'){
      $scope.sensor2.nilai = '0';
      $scope.sensor2.status = 'Tidak aktif';
    }
    $http.get('http://api.geeknesia.com/api/data?api_key=122226c8c8371e86aa1551e2a905cde1&attributes={"KontrolPIR":'+$scope.sensor1.nilai+',"KontrolUltra":'+$scope.sensor2.nilai+',"KontrolGas":'+$scope.sensor3.nilai+',"KontrolFlame":'+$scope.sensor4.nilai+'}');
  };

  $scope.updateSensor3 = function () {   
    if($scope.sensor3.nilai == '0'){
      $scope.sensor3.nilai = '1';
      $scope.sensor3.status = 'Aktif';
    } else if ($scope.sensor3.nilai == '1'){
      $scope.sensor3.nilai = '0';
      $scope.sensor3.status = 'Tidak aktif';
    }
    $http.get('http://api.geeknesia.com/api/data?api_key=122226c8c8371e86aa1551e2a905cde1&attributes={"KontrolPIR":'+$scope.sensor1.nilai+',"KontrolUltra":'+$scope.sensor2.nilai+',"KontrolGas":'+$scope.sensor3.nilai+',"KontrolFlame":'+$scope.sensor4.nilai+'}');
  };

  $scope.updateSensor4 = function () {   
    if($scope.sensor4.nilai == '0'){
      $scope.sensor4.nilai = '1';
      $scope.sensor4.status = 'Aktif';
    } else if ($scope.sensor4.nilai == '1'){
      $scope.sensor4.nilai = '0';
      $scope.sensor4.status = 'Tidak aktif';
    }
    $http.get('http://api.geeknesia.com/api/data?api_key=122226c8c8371e86aa1551e2a905cde1&attributes={"KontrolPIR":'+$scope.sensor1.nilai+',"KontrolUltra":'+$scope.sensor2.nilai+',"KontrolGas":'+$scope.sensor3.nilai+',"KontrolFlame":'+$scope.sensor4.nilai+'}');
  };

  $scope.getDataSensor = function(){
    $scope.result = [];
    $http.post('http://api.geeknesia.com/api/attributes', {data: {'limit': '1'}},  {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'apiKey': '23bdfcea596df190cbb7490a1a4454f1'}})
      .success(function(data) {
        //$scope.sensor1.deteksi = data;
        //alert(angular.toJson($scope.sensor1.deteksi));
        $scope.result = angular.fromJson(data.output.data[0].attributes);
        var arraySize = $scope.result.length;
        //alert(arraySize);
        //alert($scope.result[2].value);
        for (var i = 0; i < arraySize; i++) {
          var nama = $scope.result[i].name;
          var nilai = $scope.result[i].value;
          if ($scope.sensor1.status == 'Aktif') {
            if (nama == 'Pir' && nilai == '1') {
              $scope.sensor1.keterangan = 'Seseorang terdeteksi masuk ke dalam rumah!';
            } else if (nama == 'Pir' && nilai == '0'){
              $scope.sensor1.keterangan = 'Tidak ada pergerakan yang terdeteksi';
            }
          } else {
            $scope.sensor1.keterangan = 'Sensor tidak aktif, tidak dapat mendeteksi';
          }
          if ($scope.sensor2.status == 'Aktif') {
            if (nama == 'Ultra' && nilai == '1') {
              $scope.sensor2.keterangan = 'Seseorang telah memindahkan mobil Anda dari tempat parkir!';
            } else if (nama == 'Ultra' && nilai == '0'){
              $scope.sensor2.keterangan = 'Mobil Anda masih di tempat parkir';
            }
          } else {
            $scope.sensor2.keterangan = 'Sensor tidak aktif, tidak dapat mendeteksi';
          }
          if ($scope.sensor3.status == 'Aktif') {
            if (nama == 'Gas' && nilai == '1') {
              $scope.sensor3.keterangan = 'Terjadi kebocoran gas di dalam rumah!';
            } else if (nama == 'Gas' && nilai == '0'){
              $scope.sensor3.keterangan = 'Tidak ada kebocoran gas yang terdeteksi';
            }
          } else {
            $scope.sensor3.keterangan = 'Sensor tidak aktif, tidak dapat mendeteksi';
          }
          if ($scope.sensor4.status == 'Aktif') {
            if (nama == 'Flame' && nilai == '1') {
              $scope.sensor4.keterangan = 'Terjadi kebakaran di rumah Anda!';
            } else if (nama == 'Flame' && nilai == '0'){
              $scope.sensor4.keterangan = 'Tidak ada kebakaran yang terdeteksi';
            }
          } else {
            $scope.sensor4.keterangan = 'Sensor tidak aktif, tidak dapat mendeteksi';
          }
        }
      });
  };
  setInterval($scope.getDataSensor, 500);

  $scope.activeAll = function () {   
    $http.get('http://api.geeknesia.com/api/data?api_key=122226c8c8371e86aa1551e2a905cde1&attributes={"KontrolPIR":"1","KontrolFlame":"1","KontrolGas":"1","KontrolUltra":"1"}');
    $scope.sensor1.checked = true;
    $scope.sensor2.checked = true;
    $scope.sensor3.checked = true;
    $scope.sensor4.checked = true;
    $scope.sensor1.nilai = '1';
    $scope.sensor2.nilai = '1';
    $scope.sensor3.nilai = '1';
    $scope.sensor4.nilai = '1';
    $scope.sensor1.status = 'Aktif';
    $scope.sensor2.status = 'Aktif';
    $scope.sensor3.status = 'Aktif';
    $scope.sensor4.status = 'Aktif';
  }

  $scope.inactiveAll = function () {   
    $http.get('http://api.geeknesia.com/api/data?api_key=122226c8c8371e86aa1551e2a905cde1&attributes={"KontrolPIR":"0","KontrolFlame":"0","KontrolGas":"0","KontrolUltra":"0"}');
    $scope.sensor1.checked = false;
    $scope.sensor2.checked = false;
    $scope.sensor3.checked = false;
    $scope.sensor4.checked = false;
    $scope.sensor1.nilai = '0';
    $scope.sensor2.nilai = '0';
    $scope.sensor3.nilai = '0';
    $scope.sensor4.nilai = '0';
    $scope.sensor1.status = 'Tidak Aktif';
    $scope.sensor2.status = 'Tidak Aktif';
    $scope.sensor3.status = 'Tidak Aktif';
    $scope.sensor4.status = 'Tidak Aktif';
  }

})

