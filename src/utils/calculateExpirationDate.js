export const calculateExpirationDate = (cardNumber) => {
  if (typeof cardNumber !== "string" || cardNumber.length < 2) {
    console.error("Invalid card number:", cardNumber);
    return "Invalid Card";
  }

  const currentYear = new Date().getFullYear();

  const lastTwoDigits = parseInt(cardNumber.slice(-2), 10);
  if (Number.isNaN(lastTwoDigits)) {
    console.error("Invalid last two digits:", cardNumber.slice(-2));
    return "Invalid Card";
  }

  const firstTwoDigits = parseInt(cardNumber.slice(0, 2), 10);
  if (Number.isNaN(firstTwoDigits)) {
    console.error("Invalid first two digits:", cardNumber.slice(0, 2));
    return "Invalid Card";
  }
  
  const yearOffset = (lastTwoDigits % 5) + 3;
  const expirationYear = currentYear + yearOffset;

  const expirationMonth = ((firstTwoDigits % 12) + 1).toString().padStart(2, "0");

  return `${expirationMonth}/${expirationYear}`;
};
