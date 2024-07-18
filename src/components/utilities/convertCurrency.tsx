import axios from "axios";
import { useEffect, useState } from "react";

function useConvertCurrency() {
  const [currencyRates, setCurrencyRates] = useState({});

  const request = async () => {
    try {
      const response = await axios.get(
        "https://api.currencyapi.com/v3/latest?apikey=Xjn91xfaYM2vpbwfYG4KcgZhmmzgQsODVj2ieZWu&currencies=EUR%2CUSD%2CCAD"
      );
      setCurrencyRates(response.data.data);
    } catch (e: any) {
      console.error("Error fetching data", e.response.data.message);
    }
  };

  useEffect(() => {
    request();
  }, []);

  return currencyRates;
}

export default useConvertCurrency;
