// Auxilliary functions

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
Array.prototype.differenceOfArrays = function(arr2) { return this.filter(x => !arr2.includes(x)); }

function chooseRandom(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

// Data
const words = ["a", "akesi", "ala", "alasa", "ale", "anpa", "ante", "anu", "awen", "e", "en", "esun", "ijo", "ike", "ilo", "insa", "jaki", "jan", "jelo", "jo", "kala", "kalama", "kama", "kasi", "ken", "kepeken", "kili", "kiwen", "ko", "kon", "kule", "kulupu", "kute", "la", "lape", "laso", "lawa", "len", "lete", "li", "lili", "linja", "lipu", "loje", "lon", "luka", "lukin", "lupa", "ma", "mama", "mani", "meli", "mi", "mije", "moku", "moli", "monsi", "mu", "mun", "musi", "mute", "nanpa", "nasa", "nasin", "nena", "ni", "nimi", "noka", "o", "olin", "ona", "open", "pakala", "pali", "palisa", "pan", "pana", "pi", "pilin", "pimeja", "pini", "pipi", "poka", "poki", "pona", "pu", "sama", "seli", "selo", "seme", "sewi", "sijelo", "sike", "sin", "sina", "sinpin", "sitelen", "sona", "soweli", "suli", "suno", "supa", "suwi", "tan", "taso", "tawa", "telo", "tenpo", "toki", "tomo", "tu", "unpa", "uta", "utala", "walo", "wan", "waso", "wawa", "weka", "wile"]
const words_banned_as_honorifics = ["a", "anu", "e", "en", "kepeken", "la", "li", "lon", "mi", "ni", "o", "ona", "pi", "sama", "seme", "sina", "tan", "taso", "tawa", "unpa"]
const syllable_counts = [1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4]
const word_onsets_nuclei = ["a", "e", "i", "o", "u", "ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "no", "nu", "pa", "pe", "pi", "po", "pu", "ta", "te", "to", "tu", "ka", "ke", "ki", "ko", "ku", "sa", "se", "si", "so", "su", "wa", "we", "wi", "la", "le", "li", "lo", "lu", "ja", "je", "jo", "ju"]
const word_internal = ["ma", "me", "mi", "mo", "mu", "na", "ne", "ni", "no", "nu", "pa", "pe", "pi", "po", "pu", "ta", "te", "to", "tu", "ka", "ke", "ki", "ko", "ku", "sa", "se", "si", "so", "su", "wa", "we", "wi", "la", "le", "li", "lo", "lu", "ja", "je", "jo", "ju"]
const word_internal_preceded_by_n = ["pa", "pe", "pi", "po", "pu", "ta", "te", "to", "tu", "ka", "ke", "ki", "ko", "ku", "sa", "se", "si", "so", "su", "wa", "we", "wi", "la", "le", "li", "lo", "lu", "ja", "je", "jo", "ju"]
const coda_n = ["", "", "", "", "", "n"]

// Dynamically generated data
const honorifics = words.differenceOfArrays(words_banned_as_honorifics)
cartouche_dictionary = {"a": [], "e": [], "i": [], "o": [], "u": [], "m": [], "n": [], "p": [], "t": [], "k": [], "s": [], "w": [], "l": [], "j": []}
for (i = 0; i < words.length; i++) {
	//alert(words[i][0])
	cartouche_dictionary[words[i][0]].push(words[i])
}

var current_word

function userEntersSomething() {
	word = document.getElementById("word").value
	//console.log(word)
	if (word == current_word) {
		addEntry(current_word)
		onNewWord()
	}
}

function onNewWord() {
	document.getElementById("word").value = ""
	//alert(word)
	setNewWord()
}

function setNewWord() {
	honorific = chooseRandom(honorifics)
	generated_word = generateValidWord()//.toTitleCase()
	generated_cartouche = generateCartoucheFromWord(generated_word)
	displayed_word = honorific + " " + generated_cartouche
	current_word = honorific + " " + generated_word.toTitleCase()
	//alert(current_word)
	document.getElementById("word_display").innerHTML = displayed_word
}

function generateValidWord() {
	syllables = chooseRandom(syllable_counts)
	word = chooseRandom(word_onsets_nuclei)
	for (i = 0; i < syllables-1; i++) {
		n = chooseRandom(coda_n)
		if (n.length > 0) {
			word += n
			word += chooseRandom(word_internal_preceded_by_n)
		} else {
			word += chooseRandom(word_internal)
		}
	}
	word += chooseRandom(coda_n)
	return word
}

function generateCartoucheFromWord(word) {
	cartouche = "[_"
	for (i = 0; i < word.length; i++) {
		cartouche += chooseRandom(cartouche_dictionary[word[i]]) + "_"
	}
	cartouche = cartouche.slice(0, -1)
	cartouche += "]"
	return cartouche
}

function addEntry(word) {
	entries = document.getElementById("entries")
	paragraph = document.createElement("p")
	text = document.createTextNode(word)
	paragraph.appendChild(text)
	entries.prepend(paragraph)
}