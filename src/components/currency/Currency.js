import { useState, useEffect } from "react";

function Currency() {
  const [firstCurrynce, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);

  const host = "api.frankfurter.app";

  useEffect(
    function () {
      async function fetchRequest() {
        const res = await fetch(
          `https://${host}/latest?amount=${amount}&from=${firstCurrynce}&to=${secondCurrency}`
        );

        const data = await res.json();
        setResult(data.rates?.[secondCurrency]);
      }

      if (firstCurrynce === secondCurrency) {
        return setResult(amount);
      }

      fetchRequest();
    },
    [amount, firstCurrynce, secondCurrency]
  );

  function hangleGetCurrnecy(e) {
    setFirstCurrency(e.target.value);
    console.log(e.target.value);
  }

  function handleGetSecondCurrency(e) {
    setSecondCurrency(e.target.value);
  }
  function handleGetValue(e) {
    setAmount(+e.target.value);
  }

  return (
    <div className="currency">
      <input type="text" onChange={handleGetValue} value={amount} />
      <select onChange={hangleGetCurrnecy}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={handleGetSecondCurrency}>
        <option value="USD">USD</option>
        <option value="EUR" selected>
          EUR
        </option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <h3>{result && result}</h3>
    </div>
  );
}

export default Currency;
