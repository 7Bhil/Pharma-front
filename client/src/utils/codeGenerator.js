export const generatePickupCode = () => {
  const digits = Date.now().toString().slice(-6);
  return `${digits.slice(0, 3)} ${digits.slice(3)}`;
};
