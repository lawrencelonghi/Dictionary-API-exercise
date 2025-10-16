"use strict";
const input = document.getElementById('input');
const searchBtn = document.getElementById('search-btn');
let definitionTitle = document.getElementById('definition-title');
let definitionPara = document.getElementById('definition-para');
const url = '/api/dictionary/';
function capitalizeFirstLetter(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}
async function getWord() {
    const inputWord = input.value.trim().toLowerCase();
    const response = await fetch(`${url}${inputWord}`);
    const data = await response.json();
    console.log(data[0].meta.id);
    input.value = '';
    renderWord(data);
}
function renderWord(data) {
    definitionTitle.innerHTML = capitalizeFirstLetter(data[0]?.hwi.hw);
    definitionPara.innerHTML = `• ${capitalizeFirstLetter(data[0]?.shortdef[0])}`;
}
searchBtn.addEventListener('click', getWord);
