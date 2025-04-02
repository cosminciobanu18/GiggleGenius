export const getColor = function (nota) {
  if (nota <= 4) return "red";
  if (nota <= 7) return "blue";
  if (nota <= 10) return "green";
};

export const responseToObject = function (str) {
  return JSON.parse(str.slice(8).slice(0, -5));
};
