jQuery(document).ready(function () {

    populaCmbEmpresa();
    jQuery("#sns-cmb-sucursal").prop("disabled", true);

    jQuery("#sns-cmb-empresa").on('change', function () {

        var empresaValue = jQuery("#sns-cmb-empresa").find('option:selected').val();

        if (empresaValue == 0) {
            jQuery("#sns-cmb-sucursal").prop("disabled", true);
            jQuery("#sns-cmb-sucursal").val(0);
        }
        else {
            jQuery("#sns-cmb-sucursal").prop("disabled", false);
            populaCmbSucursal(empresaValue);
        }

    })

});

function formataMsgSucesso(msgSucesso) {
    jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-success');
    jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-danger');
    jQuery('#sns-mensagem-usuario-retorno').text('O usuário foi deletado com sucesso.');
    jQuery('#btn-modal-msg-usuario-teste').click();
}

function formataMsgErro(msgErro) {
    jQuery('#sns-mensagem-usuario-retorno').removeClass('list-group-item-success');
    jQuery('#sns-mensagem-usuario-retorno').addClass('list-group-item-danger');
    jQuery('#sns-mensagem-usuario-retorno').text(msgErro);
    jQuery('#btn-modal-msg-usuario-teste').click();
}

function populaCmbEmpresa() {

    jQuery.ajax({
        url: "/OrgaoProdutor/RecuperarEmpresa",
        type: "GET",
        success: function (data) {

            var lstEmpresas = data.listaEmpresas;

            jQuery.each(lstEmpresas, function (index, empresas) {
                var lineContent = "";
                lineContent += "<option value=" + empresas.CdOrgPrt + ">" + empresas.NmOrgPrt + "</option>"

                jQuery("#sns-cmb-empresa").append(lineContent);
            })
        },
        error: function (data) {
            var msgErro = 'Erro ao popular a combobox "Empresa"!';
            formataMsgErro(msgErro);
        }
    });
}

function populaCmbSucursal(idEmpresa) {

    jQuery.ajax({
        url: "/OrgaoProdutor/RecuperarSucursalId/" + idEmpresa,
        type: "GET",
        success: function (data) {

            var lstSucursais = data.listaSucursais;
            
            jQuery("#sns-cmb-sucursal").empty();
            jQuery("#sns-cmb-sucursal").append("<option value='0'>SELECIONE</option>");

            jQuery.each(lstSucursais, function (index, sucursais) {
                var lineContent = "";
                lineContent += "<option value=" + sucursais.CdOrgPrt + ">" + sucursais.NmOrgPrt + "</option>";

                jQuery("#sns-cmb-sucursal").append(lineContent);
            })
        },
        error: function (data) {
            var msgErro = 'Erro ao popular a combobox "Sucursal"!';
            formataMsgErro(msgErro);
        }
    });
}