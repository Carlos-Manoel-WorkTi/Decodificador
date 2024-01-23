
const shift = 3;
    
// Salvar elementos da seção principal:
const codificarButton = document.getElementById('Codificar');
const descodificarButton = document.getElementById('Descodificar');

// Salvar elementos da lista de criptografia:
const listaCriptElement = document.getElementById('lista_cript');
const ulListaElement = document.getElementById('ul_lista');
const fraseCriptElements = document.querySelectorAll('.frase_cript');
const copyButtons = document.querySelectorAll('.copy');

// Eventos
codificarButton.addEventListener('click',codificar)
ulListaElement.addEventListener('click',copyToClipboard)
descodificarButton.addEventListener('click',descodificar)

// funções logicas
function codificar(){
    const texto = document.getElementById('input_text').value;
    // const textoCodificado = btoa(texto);
    const encryptedText = encryptCesar(texto, shift);
    addMsgToList(encryptedText);
}

function descodificar() {
    const textoCodificado = document.getElementById('input_text').value;
    const decryptedText = decryptCesar(textoCodificado, shift);
    console.log(':',decryptedText);
    // const textoDescodificado = atob(decryptedText);
    document.getElementById('input_text').value = decryptedText;
}

function copyToClipboard(event){
    const frase = event.target.parentNode.parentNode.textContent;
    
    if (event.target.classList.contains('img_cpy')) {
        navigator.clipboard.writeText(frase);
        const pai = event.target.parentNode;
        event.target.remove()
        console.log(pai);
        pai.innerHTML += `<img  class="img_cpy" src="./public/ok-svgrepo-com.svg" alt="">`
    }
    
}

// funcoes views
function addMsgToList(msg){
    if(msg === '') return
    ulListaElement.innerHTML += `<li class="frase_cript">${msg} <button class="copy"><img class="img_cpy" src="./public/copy-svgrepo-com.svg" alt=""></button> </li>`
    clearInput()
}
 function clearInput(){
    document.getElementById('input_text').value = '';
 }

//  cript e descrip

// Função para criptografar usando o cifrador de César
  function encryptCesar(text, shift) {
    return text.split('').map(char => {
      if (char.match(/[a-zA-Z]/)) {
        const code = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const shiftedCode = (code - (isUpperCase ? 65 : 97) + shift) % 26 + (isUpperCase ? 65 : 97);
        return String.fromCharCode(shiftedCode);
      } else {
        return char;
      }
    }).join('');
  }
    // Função para descriptografar usando o cifrador de César
    function decryptCesar(ciphertext, shift) {
        return encryptCesar(ciphertext, -shift);
      }
    
