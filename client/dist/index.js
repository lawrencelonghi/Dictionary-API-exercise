"use strict";
const input = document.getElementById('input');
const searchBtn = document.getElementById('search-btn');
let definitionTitle = document.getElementById('definition-title');
let definitionPara = document.getElementById('definition-para');
let meaningUl = document.getElementById('meanings-list');
const url = '/api/dictionary/';
function capitalizeFirstLetter(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}
async function getWord() {
    const inputWord = input.value.trim().toLowerCase();
    try {
        const response = await fetch(`${url}${inputWord}`);
        const data = await response.json();
        input.value = '';
        definitionTitle.innerHTML = '';
        meaningUl.innerHTML = '';
        renderWord(data);
    }
    catch {
        alert('Try again...');
    }
}
function renderWord(data) {
    definitionTitle.innerHTML = capitalizeFirstLetter(data[0]?.hwi.hw);
    data[0]?.shortdef.forEach(def => {
        meaningUl.innerHTML += `<li class='word-meaning'>${def}</li>`;
    });
}
searchBtn.addEventListener('click', getWord);
