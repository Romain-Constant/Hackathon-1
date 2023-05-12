import React from "react";
import AppartmentCard from "../components/appartmentCard/AppartmentCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { StyledEngineProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Home.module.css";
import "swiper/css";
import "swiper/css/pagination";

function Home() {
  const [apppartment, setApppartment] = useState([]);

  useEffect(() => {
    const fectchAllAppartment = async () => {
      try {
        const response = await axios.get("http://localhost:8800/");
        setApppartment(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fectchAllAppartment();
  }, []);
console.log(apppartment);
  
  return (
    <StyledEngineProvider>
      <div className={styles.home}>
        <div className={styles.appartmentsContainer}>
          
            {apppartment.map((appartment) => (
              
                <AppartmentCard  appartment={appartment} />
              
            ))}
          
        </div>
      </div>
    </StyledEngineProvider>
  );
}

export default Home;
