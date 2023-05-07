const fs = require('fs');

//tablice do generowania losowych osób
const genders = [ 'M', 'F' ]
const maleNames = [ 'Franek', 'Tomek', 'Janek']
const femaleNames = [ 'Weronika', 'Maja', 'Kasia']
const lastNames = [ 'Dąbrowski', 'Wojciechowski', 'Marynarski']
const emails = [ 'gmail.com' , 'onet.pl']
const phoneNumber = ['+48']

//Funkcja randChoice zwraca losowy element z przekazanej tablicy
function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//generuje losowe numery telefonu z początkiem +48
function generatePhoneNumber() {
  const localisation = phoneNumber
  const num1 = Math.floor(Math.random() * 900) + 100;
  const num2 = Math.floor(Math.random() * 900) + 100;
  const num3 = Math.floor(Math.random() * 900) + 100;
  return `${localisation} ${num1} ${num2} ${num3}`
}

//Pusta tablica w której są przechowywane losowe osoby
const people = []

//Pętla która wykonuje 20 losowych iteracji(czyli wygeneruje 20 losowych osób)
for (let i = 0; i < 20; i++ ) {
  const person = {}

  //Przypisanie randChoice do tabicy genders zwracając losową wartość przypisaną do personGender
  const personGender = randChoice(genders);
  //Następnie jest przypisana do właściwości obiektu person o nazwie gender
  person.gender = personGender;

  //W zależności od płci przypisywane jest imie z tablicy (Męskie do 'M', Żeńskie ...)
  if ( personGender === 'M') {
    person.firstName = randChoice(maleNames)
  } else {
    person.firstName = randChoice(femaleNames);
  }

  //Losowanie nazwiska z tablicy
  person.lastName = randChoice(lastNames)
  //Losowanie wieku z przediału 18 - 78
  person.age = Math.floor(Math.random() * 60) + 18;
  //Losowanie numeru telefonu
  person.phoneNumber = generatePhoneNumber();
  //Dodaje imie i nazwisko do domen zapisanych w emails
  person.email = `${person.firstName.toLowerCase()}.${person.lastName.toLowerCase()}@${randChoice(emails)}`
  //Wylosowany obiekt person wypychamy do tablicy people
  people.push(person)
}

//Tworzymy obiekt JSON
const json = JSON.stringify(people);

//Po wywołaniu aplikacji tworzony jest nowy plik .json z wylosowanymi imionami (jeśli jest jakis błąd to wyrzuca error w konsoli)
fs.writeFile('people.json', json, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Dane zostały zapisane do pliku people.json');
});