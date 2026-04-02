// Задача 1. Проверяет длину строки

function checkStringLength (string = '', maxLength = 1) {
  return string.length <= maxLength;
}

checkStringLength();

// другой вариант записи с помощью стрелочной функции
// const checkStringLength = (string = '', maxLength = 1) => string.length <= maxLength;


// Задача 2. Проверяет, является ли строка полиндромом

function isPalindrome (string = '') {
  string = string.replaceAll(' ', '').toLowerCase();
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

//ДЗ module5-task2

const isMeetingWithinWorkday = (workStart, workEnd, meetingStart, duration) => {
  //Преобразует строку времени (чч:мм) в минуты от начала суток
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStartMinutes = toMinutes(workStart);
  const workEndMinutes = toMinutes(workEnd);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;

  //Проверяет, что встреча полностью внутри рабочего дня
  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

isMeetingWithinWorkday('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkday('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkday('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkday('14:00', '17:30', '08:0', 90); // false
isMeetingWithinWorkday('8:00', '17:30', '08:00', 900); // false
