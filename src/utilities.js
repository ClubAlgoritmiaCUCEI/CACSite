const parseMonth = month => {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return null;
  }
};

export { parseMonth };

export const generateRandomCode = n => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < n; i++) {
    result += characters[Math.floor(Math.random() * charactersLength)];
  }
  return result;
};

const regex = /<br>|<\/br>|<br\/>/gi;

export const removeDangerousHTML = text => {
  return text.replace(regex, "");
};
