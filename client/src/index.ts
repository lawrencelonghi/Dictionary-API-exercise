const input = document.getElementById('input') as HTMLInputElement
const searchBtn = document.getElementById('search-btn') as HTMLButtonElement
let definitionTitle = document.getElementById('definition-title') as HTMLHeadingElement
let definitionPara = document.getElementById('definition-para') as HTMLParagraphElement
let meaningUl = document.getElementById('meanings-list') as HTMLUListElement
const url: string = '/api/dictionary/'

interface DictionaryEntry {
  meta: {
    id: string;
    uuid: string;
    src: string;
    section: string;
    stems: string[];
    offensive: boolean;
  };
  hwi: {
    hw: string;
    prs: Array<{
      mw: string;
      sound: {
        audio: string;
      };
    }>;
  };
  fl: string;
  def: Array<{
    sseq: any[][]; // You can define this more specifically if needed
  }>;
  shortdef: string[];
}

function capitalizeFirstLetter(word: string) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}

async function getWord(){

const inputWord = input.value.trim().toLowerCase()

try{

const response = await fetch(`${url}${inputWord}`)
const data: DictionaryEntry[] = await response.json()
input.value = ''
definitionTitle.innerHTML = ''
meaningUl.innerHTML = ''

renderWord(data)

} catch {
  alert('Try again...')
}}

function renderWord(data: DictionaryEntry[]) {
  definitionTitle.innerHTML = capitalizeFirstLetter(data[0]?.hwi.hw) 

  data[0]?.shortdef.forEach(def => {
   meaningUl.innerHTML += `<li class='word-meaning'>${def}</li>`
  })
}

searchBtn.addEventListener('click', getWord)
