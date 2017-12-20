/**
 * Js Global
 * Criado por Jorge Freitas
 * Data: 14/12/2017
 */

/* Estrutura */
$(document).ready(function () {

    $('#sns-btn-login').click(function () {
        window.location.href = "../";
    });

});
/* Estrutura */

function formataDataBr(date) {
    var date = moment(date).locale('pt-br').format('L');
    return date;
}

function formataMsgSucesso(msgSucesso) {
    jQuery('#sns-msg-retorno').addClass('list-group-item-success');
    jQuery('#sns-msg-retorno').removeClass('list-group-item-danger');
    jQuery('#sns-msg-retorno').text(msgSucesso);
    jQuery('#btn-modal-msg-retorno').click();
}

function formataMsgErro(msgErro) {
    jQuery('#sns-msg-retorno').removeClass('list-group-item-success');
    jQuery('#sns-msg-retorno').addClass('list-group-item-danger');
    jQuery('#sns-msg-retorno').text(msgErro);
    jQuery('#btn-modal-msg-retorno').click();
}