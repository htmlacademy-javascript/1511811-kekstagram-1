//Проверяет является ли строка палиндромом.
const checkPalindrome = (text) => {
  const arrTextReverse = text.toLowerCase().split('').reverse().join('').replaceAll(' ', '');
  return text.toLowerCase().replaceAll(' ', '') === arrTextReverse;
};

checkPalindrome('Лёша на полке клопа нашёл ');


//Функция для проверки длины строки.
const checkMaxLengthOfText = (text, numberOfLength) => text.length <= numberOfLength;

checkMaxLengthOfText('проверяемая строка', 20);


//Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
const getNumberFromString = (text) => {
  const number = Number(text.replace(/\D/g,''));
  if (number === 0) {
    return NaN;
  } else if (Number.isInteger(number)) {
    return number;
  }
};

getNumberFromString('1 кефир, 0.5 батона');


// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку
// с добавочными символами — и возвращает исходную строку, дополненную указанными символами
// до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает
// заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается
// с конца.
const replaceOriginalTextToSecondText = (originalText, minLength, secondText) => {
  const originText = originalText.padStart(minLength, secondText);
  return originText;
};

replaceOriginalTextToSecondText('q', 4, 'werty');
