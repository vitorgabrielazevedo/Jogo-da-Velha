// selecionando dados
const celulaElements = document.querySelectorAll(".celula");
const jogadorDaVez = document.querySelector(".jogador");

// variáveis globais
let jogador = "X";
let ehVezBolinha = false;
const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4 ,5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// funções
const comecarJogo = () => {
    celulaElements.forEach((celula) => {
        celula.classList.remove("x");
        celula.classList.remove("o");
        celula.innerText = "";
        celula.addEventListener("click", manipularClick, {once: true}) ;
        // {once: true} -> não permite mudar o símbolo que já esteja em uma célula porque vai mudar uma vez
    })
    
    jogadorDaVez.innerText = `JOGADOR DA VEZ: ${jogador}`;
}

const finalizarJogo = (ehEmpate) => {
    let ultimoJogador = jogador === "X" ? "O" : "X";

    if(ehEmpate){
        alert(`EMPATE!`);
        comecarJogo();
    }else{
        alert(`${ultimoJogador} VENCEU!`);
        comecarJogo();
    }
}

const checarVitoria = (jogador) => {
    return combinacoesVitoria.some((combinacao) => {
        return combinacao.every((pos) => {
            return celulaElements[pos].classList.contains(jogador);
        })
    })
}

const checarEmpate = () => {
    return [...celulaElements].every(celula => {
        return celula.classList.contains("x") || celula.classList.contains("o");
    })
}

const adicionarMarca = (celula, classToAdd) => {
    celula.innerText = jogador;
    celula.classList.add(classToAdd);
}

const trocarSimbolo = () => {
    ehVezBolinha = !ehVezBolinha;

    if(ehVezBolinha){
        jogador = "O";
    }else{
        jogador = "X";
    }

    jogadorDaVez.innerText = `JOGADOR DA VEZ: ${jogador}`;
}

const manipularClick = (e) => {
    // colocar X ou O
    const celula = e.target;
    const classToAdd = ehVezBolinha ? "o" : "x";

    adicionarMarca(celula, classToAdd);

    // checar ganhador
    const venceu = checarVitoria(classToAdd);

    // checar empate
    const empate = checarEmpate();

    // setTimeout vai mostrar a mensagem após 0,1 segundos
    if(venceu){
        setTimeout(() => {
            finalizarJogo(false);
        }, [100]);
    }else if(empate){
        setTimeout(() => {
            finalizarJogo(true);
        }, [100]);
    }

    // mudar símbolo
    trocarSimbolo();
}

comecarJogo();
