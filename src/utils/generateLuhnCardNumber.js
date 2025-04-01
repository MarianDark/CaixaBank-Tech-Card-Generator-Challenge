export const generateLuhnCardNumber = () => {
  const baseNumber = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10));

  const sum = baseNumber
    .map((digit, index) => {
      const isEven = (baseNumber.length - index) % 2 === 0;
      const processedDigit = isEven ? (digit * 2 > 9 ? digit * 2 - 9 : digit * 2) : digit;
      return processedDigit;
    })
    .reduce((acc, num) => acc + num, 0);

  const lastDigit = (10 - (sum % 10)) % 10;
  
  return [...baseNumber, lastDigit].join("");
};
