export const calculateCVV = (hexCodes) => {
  if (!Array.isArray(hexCodes) || hexCodes.length !== 3) {
    console.error("Invalid hexCodes input:", hexCodes);
    return "000";
  }

  const decimals = hexCodes.map((hex) => {
    const parsed = parseInt(hex, 16);
    return isNaN(parsed) ? 0 : parsed;
  });
  
  let cvv = decimals.reduce((acc, num) => acc ^ num, 0); 
  cvv = Math.abs((cvv >> 2) % 1000); 

  return cvv.toString().padStart(3, "0"); 
};
