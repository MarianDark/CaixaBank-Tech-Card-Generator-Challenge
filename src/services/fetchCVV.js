export const fetchCVV = async () => {
  try {
    const response = await fetch(
      "https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-50deec91-1644-467d-9759-c2eb309d6f91/default/cvv-hex-codes"
    );

    if (!response.ok) {
      console.error("Error: API response not OK", response.status);
      return ["00", "00", "00"];
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.codes)) {
      console.error("Error: Invalid API response structure", data);
      return ["00", "00", "00"];
    }

    return data.codes;
  } catch (error) {
    console.error("Error fetching CVV:", error.message);
    return ["00", "00", "00"];
  }
};
