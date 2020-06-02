export const parseMonth = month => {
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


export const removeDangerousHTML = text => {
  const regex = /<br>|<\/br>|<br\/>/gi;
  return text.replace(regex, "");
};

export const formateLatex = text => {
  const style = "display:block;text-align:center"
  const opening = `<span style="${style}">$$`;
  const closing = "$$</span>";
  let regexp = new RegExp(`\\$\\$\\s*([^$]*\\S)\\s*\\$\\$`, "gi")
  const newText = text.replace(regexp, (...props) => {
    console.log(props);
    return opening + props[1] + closing;
  })
  return newText;
}

export const formateMarkdown = text => {
  return formateLatex(removeDangerousHTML(text));
}