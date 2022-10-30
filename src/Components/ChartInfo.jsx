import {
  Box,
  CircularProgress,
  createTheme,
  styled,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { chartDays } from "../Config/data";
import SelectButton from "./SelectButton";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    text: {
      main: "#fff",
    },
    mode: "dark",
  },
});

const Container = styled(Box)(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));

function ChartInfo({ coin }) {
  const [datas, setData] = useState();
  const [days, setDay] = useState(1);
  const { currency } = CryptoState();

  const fetchData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setData(data.prices);
  };
  //   console.log(coin.id)

  useEffect(() => {
    fetchData();
  }, [days]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {/* Chart */}
        {!datas ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: datas.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: datas.map((coin) => coin[1]),
                    label: `Price Past ${days} Days in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

             {/* Buttons */}

             <div 
             style={{
                display:'flex',
                marginTop: 20,
                justifyContent: 'space-between',
                width: '100%'
             }}
             >
                {chartDays.map((day)=>(
                    <SelectButton 
                    key={day.value}
                    onClick={()=>setDay(day.value)}
                    selected={day.value===days}
                    >
                        {day.label}
                    </SelectButton>
                ))}
             </div>
          </>
        )}

       
      </Container>
    </ThemeProvider>
  );
}

export default ChartInfo;
