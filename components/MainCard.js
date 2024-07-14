import Image from "next/image";
import { ctoF } from "../services/converters";
import { DateAndTime } from "../components/DateAndTime"; 
import { MetricsCard } from "../components/MetricsCard"; 
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  description,
  iconName,
  unitSystem,
  weatherData,
}) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      <p className={styles.description}>{description}</p>
      <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
      <Image
        width="300px"
        height="300px"
        src={`/icons/${iconName}.svg`}
        alt="weatherIcon"
      />
      <h1 className={styles.temperature}>
        {unitSystem == "metric"
          ? Math.round(weatherData.main.temp)
          : Math.round(ctoF(weatherData.main.temp))}
        °{unitSystem == "metric" ? "C" : "F"}
      </h1>
      <p>
        Feels like{" "}
        {unitSystem == "metric"
          ? Math.round(weatherData.main.feels_like)
          : Math.round(ctoF(weatherData.main.feels_like))}
        °{unitSystem == "metric" ? "C" : "F"}
      </p>
    
      <div className={styles.metricsWrapper}>
        <MetricsCard
          title={"Humidity"}
          iconSrc={"/icons/humidity.png"}
          metric={weatherData.main.humidity}
          unit={"%"}
        /> 
      </div>
    </div>
  );
};
