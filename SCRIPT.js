let meusItems = [];
window.onload = () => {
    if(!localStorage.getItem("tudoLista")) {
        localStorage.setItem("tudoLista", JSON.stringify([]));
    } else {
        meusItems =JSON.parse(localStorage.getItem("tudoLista"));
        meusItems.forEach(item => displayItems(item));
    }
}

function atualizaRelogio() {
    var momentoAtual = new Date();

    var vhora = momentoAtual.getHours();
    var vminuto = momentoAtual.getMinutes();
    var vsegundo = momentoAtual.getSeconds();

    var vdia = momentoAtual.getDate();
    var vmes = momentoAtual.getMonth() + 1;
    var vano = momentoAtual.getFullYear();

    if (vdia < 10) { vdia = "0" + vdia; }
    if (vmes < 10) { vmes = "0" + vmes; }
    if (vhora < 10) { vhora = "0" + vhora; }
    if (vminuto < 10) { vminuto = "0" + vminuto; }
    

    dataFormat = vdia + " / " + vmes + " / " + vano;
    horaFormat = vhora + " : " + vminuto;

    document.getElementById("data").textContent = dataFormat;
    document.getElementById("hora").textContent = horaFormat;

    setTimeout("atualizaRelogio()", 1000);
};
atualizaRelogio();

function criarItem(conteudo){
    if (conteudo.length > 0){
        var ulpai = document.getElementById("para-fazer");
        var novoel = document.createElement("li");
        novoel.textContent = conteudo;
        novoel.addEventListener("click", removersi);
        meusItems.push(novoel.textContent);
        novoel.classList.add("add");
        ulpai.appendChild(novoel);
        localStorage.setItem("tudoLista", JSON.stringify(meusItems));
    }
}

var input = document.getElementById('aitem');
input.addEventListener("keydown", (e) =>{
    if(e.keyCode == 13){
        criarItem(input.value);
        input.value = "";
    }
})

var itens = document.querySelectorAll("li");
itens.forEach(item=>item.addEventListener("click", removersi));

function removersi(event){
    var ulpai = document.getElementById("para-fazer");
    var el = event.target.textContent;
    var elemento = event.target;
    console.log(elemento);
    elemento.classList.remove("add");
    elemento.classList.add("delete");
    meusItems = meusItems.filter((item) => item !== el);
    localStorage.setItem("tudoLista", JSON.stringify(meusItems));

    setTimeout(() => {
        elemento.remove();
    }, 200);
    
}

var pesquisar = document.getElementById('pesquisar');
pesquisar.addEventListener("keydown", (e) =>{
    if(e.keyCode == 13){
        var term = pesquisar.value;
        window.open(`https://www.duckduckgo.com/?q=${term}`);
        pesquisar.value = "";
    }
})

function displayItems(conteudo){
    let ulpai = document.getElementById("para-fazer");
    var novoel = document.createElement("li");
    novoel.textContent = conteudo;
    novoel.addEventListener("click", removersi);
    ulpai.appendChild(novoel);
}
