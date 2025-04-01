export default function generateCardColors(cardNumber) {
  if (typeof cardNumber !== "string" || !/^\d+$/.test(cardNumber)) {
    console.error("Invalid card number for color generation:", cardNumber);
    return { gradient: "#ffffff", solidColor: "#ffffff" }; 
  }

  const digits = [...cardNumber].map(Number);
  const sum = digits.reduce((acc, num) => acc + num, 0);

  const getColorValue = (multiplier) => Math.abs((sum * multiplier) % 256);

  const r1 = getColorValue(3);
  const g1 = getColorValue(5);
  const b1 = getColorValue(7);
  const r2 = getColorValue(2);
  const g2 = getColorValue(4);
  const b2 = getColorValue(6);
  
  const opacity1 = ((sum % 50) + 50) / 100;
  const opacity2 = ((sum % 30) + 20) / 100;
  
  const gradient = `linear-gradient(to bottom, rgba(${r1}, ${g1}, ${b1}, ${opacity1}), rgba(${r2}, ${g2}, ${b2}, ${opacity2}))`;

  const solidColor = `#${r1.toString(16).padStart(2, "0")}${g1.toString(16).padStart(2, "0")}${b1.toString(16).padStart(2, "0")}`;

  return { gradient, solidColor };
}
