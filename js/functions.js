// Задача 1. Проверяет длину строки

function checkStringLength (string = '', maxLength = 1) {
  return string.length <= maxLength;
}

checkStringLength();

// другой вариант записи с помощью стрелочной функции
// const checkStringLength = (string = '', maxLength = 1) => string.length <= maxLength;


// Задача 2. Проверяет, является ли строка полиндромом

function isPalindrome (string = '') {
  string = string.replaceAll(' ', '');
  string = string.toLowerCase();
  let reversedLine = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversedLine += string[i];
  }

  return string === reversedLine;
}

isPalindrome();

// Задача 3. Принимает строку и извлекает содержащиеся в ней цифры

function extractNumber (string) {
  let result = '';

  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
}

extractNumber();
