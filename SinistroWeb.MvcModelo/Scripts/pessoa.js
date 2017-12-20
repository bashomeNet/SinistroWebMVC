/**
 * Js Tela Pessoa
 * Criado por Jorge Freitas
 * Data: 14/12/2017
 */

var pessoas = [];
var divTodosPessoa = jQuery('#sns-hid-todos-pessoa');

/* Estrutura */
$(document).ready(function () {

    divTodosPessoa.hide();

    jQuery("#sns-gera-token-pessoa").on('click', function () {
        geraToken();
    });

    jQuery("#sns-novo-pessoa").click(function () {
        //Se a sessão estiver populada, é zerada pra trazer a tela vazia
        if (sessionStorage.getItem('sessaoPessoa') != null) {
            sessionStorage.setItem('sessaoPessoa', '');
        }
        window.location.href = "../DetalhePessoa/DetalhePessoa";
    });

    jQuery("#sns-busca-pessoa").on('click', function () {
        if (validaCamposBuscaUsuario()) {
            buscaPessoaId();
        }
    });

    jQuery("#sns-busca-pessoa-todos").click(function () {
        /* Requisição feita através de json diretamente no Web Api */
        //montaTabelaUsuarios();
        /* Requisição feita através de json acessando o controller e o controller acessa o Web Api */
        montaTabelaUsuariosController()
    });

});
/* Estrutura */

function geraToken() {

    jQuery.ajax({
        url: "/Pessoa/GeraTokenWebApi",
        type: "POST",
        success: function (response, data) {
            var token = response.AccessToken;
            jQuery("#sns-token-gerado-pessoa").val(token);
        },
        error: function (response, data) {
            var msgErro = "Erro ao gerar o token de validação no Web Api!";
            formataMsgErro(msgErro);
        }
    });

}

function modalConfirmaDelecao(id) {
    jQuery('#btn-modal-deleta').click();
    jQuery('#sns-confirma-delecao').click(function () {
        jQuery('#sns-fecha-modal-deleta').click();
        DeletaPessoaId(id);
    });
}

function validaCamposBuscaUsuario() {

    var result = true;
    var txtPessoaId = jQuery('#sns-cd-pessoa');

    if (txtPessoaId.val() == null || txtPessoaId.val() == "") {
        txtPessoaId.css("border-color", '#F00B0B');
        txtPessoaId.on('focus', function () {
            txtPessoaId.css('border-color', '#ccc');
        })
        result = false;
    }
    return result;
}

/* Requisição feita através de json diretamente no Web Api */
/* Configuração Datatable  */
function montaTabelaUsuarios() {

    jQuery.ajax({
        url: "http://wrkrbdes15:8083/api/Pessoa",
        type: "GET",
        success: function (data) {

            pessoas = data;
            //Seta na sessão o objeto que será recebido na tela redirecionada
            //sessionStorage.setItem('sessaoPessoa', data);
            divTodosPessoa.show();

            jQuery('#sns-table-pessoa').dataTable().fnDestroy();
            jQuery("#sns-table-pessoa tbody tr:has(td)").remove();

            jQuery.each(pessoas, function (index, pessoa) {
                var lineContent = "";
                lineContent += "<tr>"
                lineContent += "<td>" + pessoa.cdpes + "</td>"
                lineContent += "<td>" + pessoa.tppes + "</td>"
                lineContent += "<td>" + pessoa.nrcgccpf + "</td>"
                lineContent += "<td>" + pessoa.nmpes + "</td>"
                lineContent += "<td>" + formataDataBr(pessoa.dtnas) + "</td>"
                lineContent += "<td>" + pessoa.tpsex + "</td>"
                lineContent += "<td class='sns-td-action'>" +
                                    "<button type='submit' class='btn btn-primary btn-xs' value='Detalhar' onclick='buscaPessoaId(" + pessoa.cdpes + ")'>" +
                                        "<span class='fa fa-binoculars sns-margin-icon sns-icon-sm-position' title='Detalhar'></span>Detalhar" +
                                    "</button>" +
                                    "<button type='submit' class='btn btn-danger btn-xs' value='Detalhar' onclick='modalConfirmaDelecao(" + pessoa.cdpes + ")'>" +
                                        "<span class='fa fa-times sns-margin-icon sns-icon-sm-position' title='Excluir'></span>Excluir" +
                                    "</button>" +
                               "</td>"
                lineContent += "</tr>"

                jQuery("#sns-table-pessoa tbody").append(lineContent);
            })

            jQuery('#sns-table-pessoa').DataTable({
                pagingType: 'simple',
                language: {
                    emptyTable: 'Não há registros pra serem exibidos',
                    zeroRecords: 'Não há registros pra serem exibidos',
                    thousands: ',',
                    processing: 'Processando...',
                    loadingRecords: 'Carregando...',
                    info: 'Exibindo página _PAGE_ de _PAGES_',
                    infoEmpty: 'Exibindo 0 de 0',
                    infoFiltered: '(Filtrados de _MAX_ registros)',
                    infoPostFix: '',
                    lengthMenu: 'Exibir _MENU_ registros por página',
                    search: 'Pesquisar:',
                    paginate: {
                        next: 'Próximo',
                        previous: 'Anterior'
                    },
                    aria: {
                        sortAscending: ' Ordenar colunas de forma ascendente',
                        sortDescending: ' Ordenar colunas de forma descendente'
                    }
                }
            });
        },
        error: function (data) {
            var msgErro = "Erro ao buscar a lista de pessoas!";
            formataMsgErro(msgErro);
        }
    });
}

/* Requisição feita através de json acessando o controller e o controller acessa o Web Api */
/* Configuração Datatable  */
function montaTabelaUsuariosController() {

    jQuery.ajax({
        url: "/Pessoa/RecuperarTodos",
        type: "GET",
        success: function (data) {

            pessoas = data.pessoas;
            //Seta na sessão o objeto que será recebido na tela redirecionada
            //sessionStorage.setItem('sessaoPessoa', data);
            divTodosPessoa.show();

            jQuery('#sns-table-pessoa').dataTable().fnDestroy();
            jQuery("#sns-table-pessoa tbody tr:has(td)").remove();

            jQuery.each(pessoas, function (index, pessoa) {
                var lineContent = "";
                lineContent += "<tr>"
                lineContent += "<td>" + pessoa.cdpes + "</td>"
                lineContent += "<td>" + pessoa.tppes + "</td>"
                lineContent += "<td>" + pessoa.nrcgccpf + "</td>"
                lineContent += "<td>" + pessoa.nmpes + "</td>"
                lineContent += "<td>" + formataDataBr(pessoa.dtnas) + "</td>"
                lineContent += "<td>" + pessoa.tpsex + "</td>"
                lineContent += "<td class='sns-td-action'>" +
                    "<button type='submit' class='btn btn-primary btn-xs' value='Detalhar' onclick='buscaPessoaId(" + pessoa.cdpes + ")'>" +
                    "<span class='fa fa-binoculars sns-margin-icon sns-icon-sm-position' title='Detalhar'></span>Detalhar" +
                    "</button>" +
                    "<button type='submit' class='btn btn-danger btn-xs' value='Detalhar' onclick='modalConfirmaDelecao(" + pessoa.cdpes + ")'>" +
                    "<span class='fa fa-times sns-margin-icon sns-icon-sm-position' title='Excluir'></span>Excluir" +
                    "</button>" +
                    "</td>"
                lineContent += "</tr>"

                jQuery("#sns-table-pessoa tbody").append(lineContent);
            })

            jQuery('#sns-table-pessoa').DataTable({
                pagingType: 'simple',
                language: {
                    emptyTable: 'Não há registros pra serem exibidos',
                    zeroRecords: 'Não há registros pra serem exibidos',
                    thousands: ',',
                    processing: 'Processando...',
                    loadingRecords: 'Carregando...',
                    info: 'Exibindo página _PAGE_ de _PAGES_',
                    infoEmpty: 'Exibindo 0 de 0',
                    infoFiltered: '(Filtrados de _MAX_ registros)',
                    infoPostFix: '',
                    lengthMenu: 'Exibir _MENU_ registros por página',
                    search: 'Pesquisar:',
                    paginate: {
                        next: 'Próximo',
                        previous: 'Anterior'
                    },
                    aria: {
                        sortAscending: ' Ordenar colunas de forma ascendente',
                        sortDescending: ' Ordenar colunas de forma descendente'
                    }
                }
            });
        },
        error: function (data) {
            var msgErro = "Erro ao buscar a lista de pessoas!";
            formataMsgErro(msgErro);
        }
    });
}

function buscaPessoaId(id) {

    var idCampo = jQuery("#sns-cd-pessoa").val();

    if (pessoas.length > 0) {
        jQuery.each(pessoas, function (index, pessoa) {
            if (pessoas[index].cdpes == id) {
                //Seta na sessão o objeto que será recebido na tela redirecionada
                sessionStorage.setItem('sessaoPessoa', JSON.stringify(pessoa));

                window.location.href = "../DetalhePessoa/DetalhePessoa";
            }
        });
    }
    else {

        jQuery.ajax({
            url: "http://wrkrbdes15:8083/api/Pessoa/" + idCampo,
            type: "GET",
            success: function (data) {
                //Seta na sessão o objeto que será recebido na tela redirecionada
                sessionStorage.setItem('sessaoPessoa', JSON.stringify(data));

                window.location.href = "../DetalhePessoa/DetalhePessoa";
            },
            error: function (data) {
                var msgErro = "Erro ao buscar a pessoa!";
                formataMsgErro(msgErro);
            }
        });
    }

}

function DeletaPessoaId(id) {

    jQuery.ajax({
        url: "http://wrkrbdes15:8083/api/Pessoa/" + id,
        type: "DELETE",
        success: function (response, data) {
            var msgSucesso = "Pessoa deletada com sucesso.";
            formataMsgSucesso(msgSucesso);
            montaTabelaUsuarios();
        },
        error: function (response, data) {
            var msgErro = "Erro ao deletar a pessoa!";
            formataMsgErro(msgErro);
        }
    });
}







