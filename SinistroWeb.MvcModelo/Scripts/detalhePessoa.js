/**
 * Js Tela Detalhe Pessoa
 * Criado por Jorge Freitas
 * Data: 14/12/2017
 */

var cdPessoa = jQuery("#sns-cd-dtlpessoa");
var tpPessoa = jQuery("#sns-tp-dtlpessoa");
var nrCgcCpf = jQuery("#sns-cpfcgc-dtlpessoa");
var nmPessoa = jQuery("#sns-nome-dtlpessoa");
var dtNascimento = jQuery("#sns-dtnasc-dtlpessoa");
var tpSexo = jQuery("#sns-sexo-dtlpessoa");

/* Estrutura */
$(document).ready(function () {

    if (sessionStorage.getItem('sessaoPessoa') != null) {
        populaDetalhePessoa();
    }

    jQuery("#sns-novo-dtlpessoa").click(function () {
        //Se a sessão estiver populada, é zerada pra trazer a tela vazia
        if (sessionStorage.getItem('sessaoPessoa') != null) {
            sessionStorage.setItem('sessaoPessoa', '');
        }
        limpaTela();
    });

    jQuery("#sns-salva-dtlpessoa").click(function () {
        if (validaCamposTela()) {
            //Se sessão estiver nula, grava, se não altera
            if (sessionStorage.getItem('sessaoPessoa') != null) {
                alteraPessoa();
            }
            else {
                gravaPessoa();
            }
        }
    });

    jQuery("#sns-voltar-dtlpessoa").click(function () {
        window.location.href = "../Pessoa/Pessoa";
    });

});
/* Estrutura */

function limpaTela() {
    cdPessoa.val("");
    tpPessoa.val("");
    nrCgcCpf.val("");
    nmPessoa.val("");
    dtNascimento.val("");
    tpSexo.val("");
}

function populaDetalhePessoa() {
    var sessao = JSON.parse(sessionStorage.getItem('sessaoPessoa'));

    cdPessoa.val(sessao.cdpes);
    tpPessoa.val(sessao.tppes);
    nrCgcCpf.val(sessao.nrcgccpf);
    nmPessoa.val(sessao.nmpes);
    dtNascimento.val(formataDataBr(sessao.dtnas));
    tpSexo.val(sessao.tpsex);
}

function formataDataJson(date) {
    var date = moment(date).locale('en').format();
    return date;
}

function validaCamposTela() {

    var result = true;

    //if (cdPessoa.val() == null || cdPessoa.val() == "") {
    //    cdPessoa.css("border-color", '#F00B0B');
    //    cdPessoa.on('focus', function () {
    //        cdPessoa.css('border-color', '#ccc');
    //    })
    //    result = false;
    //}
    if (tpPessoa.val() == null || tpPessoa.val() == "") {
        tpPessoa.css("border-color", '#F00B0B');
        tpPessoa.on('focus', function () {
            tpPessoa.css('border-color', '#ccc');
        })
        result = false;
    }
    if (nrCgcCpf.val() == null || nrCgcCpf.val() == "") {
        nrCgcCpf.css("border-color", '#F00B0B');
        nrCgcCpf.on('focus', function () {
            nrCgcCpf.css('border-color', '#ccc');
        })
        result = false;
    }
    if (nmPessoa.val() == null || nmPessoa.val() == "") {
        nmPessoa.css("border-color", '#F00B0B');
        nmPessoa.on('focus', function () {
            nmPessoa.css('border-color', '#ccc');
        })
        result = false;
    }
    if (dtNascimento.val() == null || dtNascimento.val() == "") {
        dtNascimento.css("border-color", '#F00B0B');
        dtNascimento.on('focus', function () {
            dtNascimento.css('border-color', '#ccc');
        })
        result = false;
    }
    if (tpSexo.val() == null || tpSexo.val() == "") {
        tpSexo.css("border-color", '#F00B0B');
        tpSexo.on('focus', function () {
            tpSexo.css('border-color', '#ccc');
        })
        result = false;
    }
    return result;
}

function gravaPessoa() {

    //O Web Api pega p objeto pelo body, é preciso setar um valor para o código da pessoa
    //Embora isso não faça diferença nenhuma na gravação na base, uma vez que o campo é auto_increment 
    if (cdPessoa.val() == "" || cdPessoa.val() == null) {
        cdPessoa.val(1);
    }

    jQuery.ajax({
        url: "http://wrkrbdes15:8083/api/Pessoa",
        type: "POST",
        dataType: "json",
        async: false,
        data:
        {
            "cdpes": cdPessoa.val(),
            "tppes": tpPessoa.val(),
            "nrcgccpf": nrCgcCpf.val(),
            "nmpes": nmPessoa.val(),
            "dtnas": dtNascimento.val(),
            "tpsex": tpSexo.val()
        },
        success: function (response) {
            var msgSucesso = "Pessoa gravada com sucesso.";
            formataMsgSucesso(msgSucesso);
        },
        error: function (response) {
            var msgErro = "Erro ao gravar a pessoa!";
            formataMsgErro(msgErro);
        }
    });
}

function alteraPessoa() {

    //var dtNasc = formataDataJson(jQuery("#sns-dtnasc-dtlpessoa").val());

    jQuery.ajax({
        url: "http://wrkrbdes15:8083/api/Pessoa",
        type: "PUT",
        dataType: "json",
        async: false,
        data:
        {
            "cdpes": cdPessoa.val(),
            "tppes": tpPessoa.val(),
            "nrcgccpf": nrCgcCpf.val(),
            "nmpes": nmPessoa.val(),
            "dtnas": dtNascimento.val(),
            "tpsex": tpSexo.val()
        },
        success: function (response) {
            var msgSucesso = "As informações da pessoa foram alteradas com sucesso.";
            formataMsgSucesso(msgSucesso);
        },
        error: function (response) {
            var msgErro = "Erro ao alterar informações da pessoa!";
            formataMsgErro(msgErro);
        }
    });
}





