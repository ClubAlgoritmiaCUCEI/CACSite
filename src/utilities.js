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

export const escapeLatexSpaces = text => {
  const opening = `<p style="text-align:center">`;
  const closing = '</p>'
  let regexp = new RegExp(`[^>]\\$\\$(?!$|</p>).*\\$\\$(?!</p>)`, "gi")
  let match;
  // while((match = regexp.exec(text)) !== null){

  // }
  let newText = text;
  while (true) {
    match = regexp.exec(newText)
    console.log(match);
    if (match) {
      const left = newText.slice(0, match.index);
      const right = newText.slice(match.index + match[0].length);
      // console.log(left);
      // console.log(right);
      // const formula = match[0].replace(/\s/g, '')
      console.log(match[0]);
      newText = left + opening + match[0] + closing + right;
      // console.log(newText);
    } else break;
  }
  // if (match.index > 2000) break;
  console.log(newText);
  // let formated = text.replace(" $$ ", "$$").replace("$$ ", "$$").replace(" $$", "$$");
  return newText;
}