const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const copyBtn = document.getElementById("copy");
const generateBtn = document.getElementById("generate");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

copyBtn.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textArea.value = password;
  console.log(password);
  document.body.appendChild(textArea);
  // textArea.select();
  // document.execCommand("copy");
  copyToClipboard(password);
  textArea.remove();
  // alert("Password copied to clipboard!");
});

async function copyToClipboard(pass) {
  try {
    await navigator.clipboard.writeText(pass);
    alert("Password copied to clipboard!");
  } catch (error) {
    console.error("Copy error", error);
    alert("Failed to copy password!");
  }
}

generateBtn.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  // console.log(length, hasLower, hasUpper, hasNumber, hasSymbol);

  // console.log(
  //   generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
  // );
  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  // console.log(typesCount);
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  // console.log(typesArr);

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      // console.log(type);
      const funcName = Object.keys(type)[0];
      // console.log(funcName);
      generatedPassword += randomFunc[funcName]();
      // console.log(generatedPassword);
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  // console.log(finalPassword);
  return finalPassword;
}

// ISO-8859-1 Character Set
// https://www.w3schools.com/charsets/ref_html_8859.asp

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*()[]=<>/,._-";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getRandomLower());
// console.log(getRandomUpper());
// console.log(getRandomNumber());
// console.log(getRandomSymbol());
// console.log(
//   randomFunc.lower(),
//   randomFunc.upper(),
//   randomFunc.number(),
//   randomFunc.symbol()
// );
