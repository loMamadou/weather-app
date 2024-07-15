import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      { <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={weatherData.main.humidity}
        unit={"%"}
      /> }
   
     
    </div>
  );
};
