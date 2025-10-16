const input = document.getElementById('input') as HTMLInputElement
const searchBtn = document.getElementById('search-btn') as HTMLButtonElement
let definitionTitle = document.getElementById('definition-title') as HTMLHeadingElement
let definitionPara = document.getElementById('definition-para') as HTMLParagraphElement
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
const response = await fetch(`${url}${inputWord}`)
const data: DictionaryEntry[] = await response.json()
console.log(data[0].meta.id);
input.value = ''
renderWord(data)
}

function renderWord(data: DictionaryEntry[]) {
  definitionTitle.innerHTML = capitalizeFirstLetter(data[0]?.hwi.hw) 

  definitionPara.innerHTML = `• ${capitalizeFirstLetter(data[0]?.shortdef[0])}`
}

searchBtn.addEventListener('click', getWord)
