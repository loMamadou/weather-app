import * as config from './../../config.json'

export default async function handler(req, res) {
  //latitude=${config.lattitude}&longitude=${config.longitude}
  const { cityInput } = req.body;
  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${config.lattitude}&longitude=${config.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,rain,cloud_cover,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timeformat=unixtime&forecast_days=1`
  );
  const data = await getWeatherData.json();
  res.status(200).json(data);
}


