var campo = $(".campo-digitacao");
const tempoGeral = $(".time-typing").text();
var tempoRestante = $(".time-typing").text();
var fraseGeral = $(".frase").text(); // $ atalho para jQuery shorthand

function atualizaTamanhoFrase(fraseGeral) {
    var numPalavra = fraseGeral.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavra);
}

// ========= Contador de palavras e caracteres com expressao regular =========
function contadores(campo) {
    campo.on("input", function () {
        var conteudo = campo.val();
        var qtdePalavras = conteudo.split(/\S+/).length - 1;
        $(".contador-palavra").text(qtdePalavras);

        var qtdeCaracteres = conteudo.length;
        $(".contador-caractere").text(qtdeCaracteres);

    });
}

// ================= Contador para digitar ====================================
function timer(tempoRestante, campo) {
    campo.one("focus", function () { //one diferente do on ele sera executado somente uma vez
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $(".time-typing").text(tempoRestante);

            if (tempoRestante < 1) {
                $(".campo-digitacao").attr("disabled", true); // atributo
                clearInterval(cronometroID)
                $("#botao-reiniciar").attr("disabled", false);

            }
        }, 1000);
    });

};

$(function () { // atalho para $(document).ready(function(){})
    atualizaTamanhoFrase(fraseGeral)
    timer(tempoRestante, campo)
    contadores(campo)

});


// ================= Reiniciar Jogo ====================================

var botaoReiniciar = $("#botao-reiniciar");

function reiniciarJogo() {
    $(".time-typing").text(tempoGeral);
    console.log(tempoGeral);
    $(".contador-palavra").text(0);
    $(".contador-caractere").text(0);
    $(".campo-digitacao").attr("disabled", false)
    $(".campo-digitacao").val("");

    contadores(campo);
    timer(tempoGeral, campo);
}

botaoReiniciar.click(function () { // shorthand, chamar a função de uma forma mais simples
    reiniciarJogo();
});