#!/usr/bin/env node

/**
 * Script per generare dati mock di sensori di temperatura
 * Utilizzo: node generate-sensor-data.js [numero_mesi]
 * Default: 3 mesi di dati
 */

const fs = require('fs');

// Configurazione
const SENSORS = ['Sensor_1', 'Sensor_2', 'Sensor_3', 'Sensor_7'];
const DEFAULT_MONTHS = 3;

// Parametri della generazione
const INTERVAL_HOURS = 3; // Intervallo base tra le misurazioni
const BASE_TEMP = 14; // Temperatura base in °C
const DAILY_VARIATION = 2; // Variazione giornaliera max
const SEASONAL_VARIATION = 1; // Variazione stagionale max
const RANDOM_NOISE = 0.75; // Rumore casuale max

function main() {
  const args = process.argv.slice(2);
  const months = args[0] ? parseInt(args[0]) : DEFAULT_MONTHS;
  
  if (isNaN(months) || months < 1 || months > 12) {
    console.error('Errore: Il numero di mesi deve essere tra 1 e 12');
    process.exit(1);
  }
  
  console.log(`Generazione dati per ${months} mesi...`);
  
  const data = generateSensorData(months);
  const filename = 'sensor-data.json';
  
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  
  console.log(`✅ Dati generati con successo in ${filename}`);
  console.log(`📊 Periodo: ${data.timeRange.earliest} - ${data.timeRange.latest}`);
  console.log(`🔢 Sensori: ${data.sensors.length}`);
  console.log(`📈 Punti dati totali: ${data.sensors.reduce((sum, s) => sum + s.data.length, 0)}`);
}

function generateSensorData(months) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - months);
  
  const sensors = SENSORS.map(sensorName => ({
    sensor: sensorName,
    data: generateDataForSensor(sensorName, startDate, endDate)
  }));
  
  // Calcola il timeRange effettivo dai dati generati
  let earliestTimestamp = null;
  let latestTimestamp = null;
  
  sensors.forEach(sensor => {
    if (sensor.data.length > 0) {
      const sensorEarliest = sensor.data[0].timestamp;
      const sensorLatest = sensor.data[sensor.data.length - 1].timestamp;
      
      if (!earliestTimestamp || sensorEarliest < earliestTimestamp) {
        earliestTimestamp = sensorEarliest;
      }
      
      if (!latestTimestamp || sensorLatest > latestTimestamp) {
        latestTimestamp = sensorLatest;
      }
    }
  });
  
  return {
    sensors: sensors,
    timeRange: {
      earliest: earliestTimestamp || startDate.toISOString(),
      latest: latestTimestamp || endDate.toISOString()
    }
  };
}

function generateDataForSensor(sensorName, startDate, endDate) {
  const data = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const value = generateTemperatureValue(currentDate, sensorName);
    
    data.push({
      value: Math.round(value * 100) / 100, // 2 decimali
      timestamp: currentDate.toISOString()
    });
    
    // Prossimo punto dati (2-4 ore con variazione)
    const nextInterval = INTERVAL_HOURS + (Math.random() - 0.5) * 2;
    currentDate.setHours(currentDate.getHours() + nextInterval);
  }
  
  // Aggiungi picchi per Sensor_7
  if (sensorName === 'Sensor_7') {
    addTemperatureSpikes(data);
  }
  
  return data.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

function generateTemperatureValue(date, sensorName) {
  let temperature = BASE_TEMP;
  
  // Variazione giornaliera (più caldo durante il giorno)
  const hour = date.getHours();
  const dailyVariation = Math.sin((hour - 6) * Math.PI / 12) * DAILY_VARIATION;
  
  // Variazione stagionale leggera
  const dayOfYear = getDayOfYear(date);
  const seasonalVariation = Math.sin((dayOfYear - 80) * 2 * Math.PI / 365) * SEASONAL_VARIATION;
  
  // Variazione per sensore
  const sensorVariation = getSensorVariation(sensorName);
  
  // Rumore casuale
  const randomNoise = (Math.random() - 0.5) * (RANDOM_NOISE * 2);
  
  temperature += dailyVariation + seasonalVariation + sensorVariation + randomNoise;
  
  // Mantieni nel range realistico
  return Math.max(5, Math.min(35, temperature));
}

function getSensorVariation(sensorName) {
  const variations = {
    'Sensor_1': -0.5,  // Più freddo
    'Sensor_2': 0.3,   // Leggermente più caldo
    'Sensor_3': -0.2,  // Leggermente più freddo
    'Sensor_7': 1.0    // Più caldo (per i picchi)
  };
  
  return variations[sensorName] || 0;
}

function addTemperatureSpikes(data) {
  const numSpikes = Math.floor(data.length / 100) + 1; // Un picco ogni ~100 punti
  
  for (let i = 0; i < numSpikes; i++) {
    const spikeIndex = Math.floor(Math.random() * data.length);
    const window = 5; // Punti attorno al picco
    
    // Crea un picco gaussiano
    for (let j = Math.max(0, spikeIndex - window); j < Math.min(data.length, spikeIndex + window); j++) {
      const distance = Math.abs(j - spikeIndex);
      const multiplier = Math.exp(-Math.pow(distance, 2) / (2 * Math.pow(window / 3, 2)));
      data[j].value += multiplier * (4 + Math.random() * 4); // Picco +4-8°C
    }
  }
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Esegui lo script
if (require.main === module) {
  main();
} 