// Initialize Firebase
    var config = {
    apiKey: "AIzaSyAvHtyV9p7qkcV3HK9dOJTJg0n890asZ9E",
    authDomain: "raspberrypi3sensores.firebaseapp.com",
    databaseURL: "https://raspberrypi3sensores.firebaseio.com",
    projectId: "raspberrypi3sensores",
    storageBucket: "raspberrypi3sensores.appspot.com",
    messagingSenderId: "679677240578"
};
firebase.initializeApp(config);


// Initialize Firebase en sensor con
// query ultimos datos ingresados del sensor
var ref = firebase.database().ref("/sensor").orderByKey().limitToLast(1);


// varibales html 
var ha = document.getElementById("humedad_ambiente");
var ta = document.getElementById("temperatura_ambiente");

//enviar datos a html parael liquidfillgauge
ref.on('child_added', function(data){  
    ha.innerHTML = data.val().Humidity + " %";
    ta.innerHTML = data.val().Temperature + " ºC";

    // Temperature
    var gauge1 = loadLiquidFillGauge("fillgauge1", data.val().Humidity)
    var config1 = liquidFillGaugeDefaultSettings();
    config1.circleColor = "#FF7777";
    config1.textColor = "#FF4444";
    config1.waveTextColor = "#FFAAAA";
    config1.waveColor = "#FFDDDD";
    config1.circleThickness = 0.2;
    config1.textVertPosition = 0.2;
    config1.waveAnimateTime = 1000;

    // Humidity
    var gauge2= loadLiquidFillGauge("fillgauge2", data.val().Temperature, config1);
    var config2 = liquidFillGaugeDefaultSettings();
    config2.circleColor = "#D4AB6A";
    config2.textColor = "#553300";
    config2.waveTextColor = "#805615";
    config2.waveColor = "#AA7D39";
    config2.circleThickness = 0.1;
    config2.circleFillGap = 0.2;
    config2.textVertPosition = 0.8;
    config2.waveAnimateTime = 2000;
    config2.waveHeight = 0.3;
    config2.waveCount = 1;

   

})

// detectar cuando se agrega un valor en firebase
ref.on('child_added', function(data){  
    ha = data.val().Humidity;
    ta =data.val().Temperature;


    console.log("Humidity : " + data.val().Humidity)
    console.log("Temperature : "+ data.val().Temperature)


Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Monthly Average Temperature'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        
        

    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Temperatura',
        // filter 12 meses
        // filtro data del mes actual
        // un bluce dentro del filtro de los 12 meses
        data: [ta,ta,ta,ta,ta,ta,ta,ta,ta,ta,ta]
    }, {
        name: 'Humedad',
        data: [ha,ha,ha,ha,ha,ha,ha,ha,ha,ha,ha]
    }]
});

})



