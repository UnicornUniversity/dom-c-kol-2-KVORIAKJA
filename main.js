//=============== Program na prevod cisla do jednotlivych ciselnych sustav ===============



//=============== Funkcie ===============
// Znak na cislo
function hodnota(znak) {
  znak = znak.toUpperCase();

  if (znak >= '0' && znak <= '9') return znak.charCodeAt(0) - 48;
  if (znak >= 'A' && znak <= 'F') return znak.charCodeAt(0) - 55;

  return -1;
}

// Preved do desiatkovej
function doDec(cislo, zaklad) {
  let vysledok = 0;

  for (let i = 0; i < cislo.length; i++) {
    let h = hodnota(cislo[i]);

    if (h < 0 || h >= zaklad) {
      return null;
    }

    vysledok = vysledok * zaklad + h;
  }

  return vysledok;
}

// Preved z desiatkovej do inej sustavy
function zDec(cislo, zaklad) {
  if (cislo === 0) return "0";

  let vysledok = "";

  while (cislo > 0) {
    let zvysok = cislo % zaklad;

    if (zvysok < 10) {
      vysledok = zvysok + vysledok;
    } else {
      vysledok = String.fromCharCode(55 + zvysok) + vysledok;
    }

    cislo = Math.floor(cislo / zaklad);
  }

  return vysledok;
}

// Dopln nulu vo vypise
function doplnNuly(cislo, dlzka) {
  while (cislo.length < dlzka) {
    cislo = "0" + cislo;
  }
  return cislo;
}

// =============== Program ===============

// vyber sustavy
let zaklad;

while (true) {
  zaklad = prompt("Vyber sustavu z ktorej chces prevadzat (2, 8, 10, 16):");

  if (zaklad === null) {
    alert("Koniec");
    throw "koniec";
  }

  if (zaklad === "2" || zaklad === "8" || zaklad === "10" || zaklad === "16") {
    zaklad = Number(zaklad);
    break;
  }

  alert("Zadaj iba: 2, 8, 10 alebo 16");
}

// zadanie cisla
let cislo;
let dec;

while (true) {
  cislo = prompt("Zadaj cislo:");

  if (cislo === null) {
    alert("Koniec");
    throw "koniec";
  }

  cislo = cislo.trim();

  if (cislo.length === 0) {
    alert("Zadaj nejake cislo");
    continue;
  }

  dec = doDec(cislo, zaklad);

  if (dec !== null) {
    break;
  } else {
    alert("Neplatne cislo pre zvolenu sustavu");
  }
}

// =============== VYSTUP ===============

// Ak binarne s veducou nulou
let bin = doplnNuly(zDec(dec, 2), 8);

alert(
  "Binarne: " + bin + "\n" +
  "Oktalove: " + zDec(dec, 8) + "\n" +
  "Desiatkove: " + dec + "\n" +
  "Hexadecimalne: " + zDec(dec, 16)
);