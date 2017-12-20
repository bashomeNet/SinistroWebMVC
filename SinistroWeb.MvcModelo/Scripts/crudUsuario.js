var todosUsuarios = [];
var divTodosUsuarios = jQuery('#sns-hid-todos-usuarios');

jQuery(document).ready(function () {
    
    divTodosUsuarios.hide();

    jQuery("#sns-gera-token").on('click', function () {
        if (validaCamposToken()) {
            geraToken();
        }
    });

    jQuery("#sns-busca-usuario").on('click', function () {
        //if (validaToken()) {
            if (validaCamposBuscaUsuario()) {
                buscaUsuario();
            }
        //}
    });

    jQuery("#sns-insere-usuario").on('click', function () {
        //if (validaToken()) {
            if (validaCamposCrud()) {
                insereUsuario();
            }
        //}
    });

    jQuery("#sns-atualiza-usuario").on('click', function () {
        //if (validaToken()) {
            if (validaCamposBuscaUsuario()) {
                if (validaCamposCrud()) {
                    atualizaUsuario();
                }
            }
        //}
    });

    jQuery("#sns-deleta-usuario").on('click', function () {
        //if (validaToken()) {
            if (validaCamposBuscaUsuario()) {
                if (validaCamposCrud()) {
                    jQuery('#btn-modal-deleta-usuario-teste').click();
                    jQuery("#sns-deleta-usuario-teste").click(function () {
                        jQuery('#sns-fecha-deleta-usuario-teste').click();
                        deletaUsuario();
                    });
                }
            }
        //}
    });

    jQuery("#sns-busca-todos-usuarios").click(function () {
        //if (validaToken()) {

            montaTabelaUsuarios();

            //jQuery.ajax({
            //    url: "/Usuario/BuscarTodos",
            //    type: "GET",
            //    success: function (data) {
            //        divTodosUsuarios.show();
            //        todosUsuarios = data.listUsuarios;

            //        montaTabelaUsuarios(data);
            //        //jQuery("#sns-table-usuario-teste tbody tr:has(td)").remove();

            //        //jQuery.each(todosUsuarios, function (index, usuarios) {
            //        //    var lineContent = "";
            //        //    lineContent += "<tr>"
            //        //    lineContent += "<td>" + usuarios.IdUsuario + "</td>"
            //        //    lineContent += "<td>" + usuarios.NmUsuario + "</td>"
            //        //    lineContent += "<td>" + formataDataBr(usuarios.DtNascimento) + "</td>"
            //        //    lineContent += "<td>" + usuarios.Email + "</td>"
            //        //    lineContent += "</tr>"

            //        //    jQuery("#sns-table-usuario-teste tbody").append(lineContent);
            //        //})
            //    },
            //    error: function (data) {
            //        jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-success');
            //        jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-danger');
            //        jQuery('#sns-mensagem-usuario-retorno').text('Erro ao buscar a lista de usuários!');
            //        jQuery('#btn-modal-msg-usuario-teste').click();
            //    }
            //});
        //}
    });
});

function formataDataBr(date) {
    var date = moment(date).locale('pt-br').format('L');
    return date;
}

/* Configuração Datatable  */
function montaTabelaUsuarios() {

    jQuery.ajax({
        url: "/Usuario/BuscarTodos",
        type: "GET",
        success: function (data) {
            
            divTodosUsuarios.show();
            todosUsuarios = data.listUsuarios;
            jQuery('#sns-table-usuario-teste').dataTable().fnDestroy();
            jQuery("#sns-table-usuario-teste tbody tr:has(td)").remove();

            jQuery.each(todosUsuarios, function (index, usuarios) {
                var lineContent = "";
                lineContent += "<tr>"
                lineContent += "<td>" + usuarios.IdUsuario + "</td>"
                lineContent += "<td>" + usuarios.NmUsuario + "</td>"
                lineContent += "<td>" + formataDataBr(usuarios.DtNascimento) + "</td>"
                lineContent += "<td>" + usuarios.Email + "</td>"
                lineContent += "</tr>"

                jQuery("#sns-table-usuario-teste tbody").append(lineContent);
            })

            jQuery('#sns-table-usuario-teste').DataTable({
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
            jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-success');
            jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-danger');
            jQuery('#sns-mensagem-usuario-retorno').text('Erro ao buscar a lista de usuários!');
            jQuery('#btn-modal-msg-usuario-teste').click();
        }
    });
}

function validaCamposToken() {

    var result = true;
    var txtUsuario = jQuery('#sns-usuario-token');
    var txtPassword = jQuery('#sns-password-token');

    if (txtUsuario.val() == null || txtUsuario.val() == "") {
        txtUsuario.css("border-color", '#F00B0B');
        txtUsuario.on('focus', function () {
            txtUsuario.css('border-color', '#ccc');
        })
        result = false;
    }
    if (txtPassword.val() == null || txtPassword.val() == "") {
        txtPassword.css("border-color", '#F00B0B');
        txtPassword.on('focus', function () {
            txtPassword.css('border-color', '#ccc');
        })
        result = false;
    }
    return result;
}

function validaToken() {

    var result = true;
    var txtToken = jQuery('#sns-token-gerado');

    if (txtToken.val() == null || txtToken.val() == "") {
        txtToken.css("border-color", '#F00B0B');
        txtToken.on('focus', function () {
            txtToken.css('border-color', '#ccc');
        })
        result = false;
    }
    return result;
}

function validaCamposBuscaUsuario() {

    var result = true;
    var txtUsuarioId = jQuery('#sns-usuario-teste-id');

    if (txtUsuarioId.val() == null || txtUsuarioId.val() == "") {
        txtUsuarioId.css("border-color", '#F00B0B');
        txtUsuarioId.on('focus', function () {
            txtUsuarioId.css('border-color', '#ccc');
        })
        result = false;
    }
    return result;
}

function validaCamposCrud() {

    var txtUsuarioNome = jQuery('#sns-usuario-teste-nome');
    var txtUsuarioDtNasc = jQuery('#sns-usuario-teste-dtnasc');
    var txtUsuarioEmail = jQuery('#sns-usuario-teste-email');

    var result = true;

    if (txtUsuarioNome.val() == null || txtUsuarioNome.val() == "") {
        txtUsuarioNome.css("border-color", '#F00B0B');
        txtUsuarioNome.on('focus', function () {
            txtUsuarioNome.css('border-color', '#ccc');
        })
        result = false;
    }
    if (txtUsuarioDtNasc.val() == null || txtUsuarioDtNasc.val() == "") {
        txtUsuarioDtNasc.css("border-color", '#F00B0B');
        txtUsuarioDtNasc.on('focus', function () {
            txtUsuarioDtNasc.css('border-color', '#ccc');
        })
        result = false;
    }
    if (txtUsuarioEmail.val() == null || txtUsuarioEmail.val() == "") {
        txtUsuarioEmail.css("border-color", '#F00B0B');
        txtUsuarioEmail.on('focus', function () {
            txtUsuarioEmail.css('border-color', '#ccc');
        })
        result = false;
    }
    return result;
}

function geraToken() {

    jQuery.ajax({
        url: "/Token/GeraTokenWebApi",
        type: "POST",
        success: function (data) {
            var token = data.AccessToken;
            jQuery("#sns-token-gerado").val(token);
        },
        error: function (data) {
            jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-success');
            jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-danger');
            jQuery('#sns-mensagem-usuario-retorno').text('Erro ao gerar o token de autenticação!');
            jQuery('#btn-modal-msg-usuario-teste').click();
        }
    });

}

function buscaUsuario() {

    var id = jQuery("#sns-usuario-teste-id").val();

    if (todosUsuarios.length > 0) {
        jQuery.each(todosUsuarios, function (index, usuarios) {
            if (usuarios.IdUsuario == id) {
                jQuery("#sns-usuario-teste-nome").val(usuarios.NmUsuario);
                jQuery("#sns-usuario-teste-dtnasc").val(formataDataBr(usuarios.DtNascimento));
                jQuery("#sns-usuario-teste-email").val(usuarios.Email);
            }
        });
    }
    else {
        jQuery.ajax({
            url: "/Usuario/BuscarUsuarioId/" + id,
            type: "GET",
            success: function (data) {
                var usuario = data.usuario;
                jQuery("#sns-usuario-teste-nome").val(usuario.NmUsuario);
                jQuery("#sns-usuario-teste-dtnasc").val(formataDataBr(usuario.DtNascimento));
                jQuery("#sns-usuario-teste-email").val(usuario.Email);
            },
            error: function (data) {
                jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-success');
                jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-danger');
                jQuery('#sns-mensagem-usuario-retorno').text('Erro ao buscar o usuário!');
                jQuery('#btn-modal-msg-usuario-teste').click();
            }
        });
    }

}

function insereUsuario() {

    var nomeUsuario = jQuery('#sns-usuario-teste-nome').val();
    var dtNascUsuario = jQuery('#sns-usuario-teste-dtnasc').val();
    var emailUsuario = jQuery('#sns-usuario-teste-email').val();

    jQuery.ajax({
        url: "/Usuario/InserirUsuario",
        type: "POST",
        data: {
            "NmUsuario": nomeUsuario,
            "DtNascimento": dtNascUsuario,
            "Email": emailUsuario,
        },
        success: function (data) {
            jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-success');
            jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-danger');
            jQuery('#sns-mensagem-usuario-retorno').text('O usuário foi inserido com sucesso.');
            jQuery('#btn-modal-msg-usuario-teste').click();
        },
        error: function (data) {
            jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-success');
            jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-danger');
            jQuery('#sns-mensagem-usuario-retorno').text('Erro ao inserir o usuário!');
            jQuery('#btn-modal-msg-usuario-teste').click();
        }
    });

}

function atualizaUsuario() {

    var idUsuario = jQuery("#sns-usuario-teste-id").val();
    var nomeUsuario = jQuery('#sns-usuario-teste-nome').val();
    var dtNascUsuario = jQuery('#sns-usuario-teste-dtnasc').val();
    var emailUsuario = jQuery('#sns-usuario-teste-email').val();

    jQuery.ajax({
        url: "/Usuario/AtualizarUsuario/" + idUsuario,
        type: "PUT",
        data: {
            "IdUsuario": idUsuario,
            "NmUsuario": nomeUsuario,
            "DtNascimento": dtNascUsuario,
            "Email": emailUsuario,
        },
        success: function (data) {
            jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-success');
            jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-danger');
            jQuery('#sns-mensagem-usuario-retorno').text('O usuário foi atualizado com sucesso.');
            jQuery('#btn-modal-msg-usuario-teste').click();
        },
        error: function (data) {
            jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-success');
            jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-danger');
            jQuery('#sns-mensagem-usuario-retorno').text('Erro ao atualizar o usuário!');
            jQuery('#btn-modal-msg-usuario-teste').click();
        }
    });

}

function deletaUsuario() {

    var idUsuario = jQuery("#sns-usuario-teste-id").val();

    jQuery.ajax({
        url: "/Usuario/DeletarUsuario/" + idUsuario,
        type: "DELETE",
        success: function (data) {
            jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-success');
            jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-danger');
            jQuery('#sns-mensagem-usuario-retorno').text('O usuário foi deletado com sucesso.');
            jQuery('#btn-modal-msg-usuario-teste').click();
        },
        error: function (data) {
            jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-success');
            jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-danger');
            jQuery('#sns-mensagem-usuario-retorno').text('Erro ao deletar o usuário!');
            jQuery('#btn-modal-msg-usuario-teste').click();
        }
    });

}