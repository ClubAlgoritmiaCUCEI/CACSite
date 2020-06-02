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
  // const opening = `<p style="text-align:center"> $$`;
  // const closing = '$$ </p>'
  const style = "display:block;text-align:center"
  const opening = `<span style="${style}"> $$`;
  const closing = "$$ </span>";
  let regexp = new RegExp(`\\$\\$(?!\\s*</span>)\\s*([^$]*\\S)\\s*\\$\\$(?!</span>)`, "gi")

  let newText = text;
  while (true) {
    let match = regexp.exec(newText)
    if (match) {
      console.log(match);
      // console.log(match[1]);
      const left = newText.slice(0, match.index);
      const right = newText.slice(match.index + match[0].length);
      newText = left + opening + match[1] + closing + right;
    } else break;
  }
  return newText;
}