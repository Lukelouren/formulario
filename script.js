
function validarCNPJ(cnpj) {
    cnpj = cnpj.toUpperCase();
    cnpj = cnpj.replace(/[.\-/\s]/g, "");

    if (!/^[A-Z0-9]{12}[0-9]{2}$/.test(cnpj)) {
        return false;
    }

    if (/^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    function calcularDigito(base) {
        let soma = 0;
        let peso = 2;

        for (let i = base.length - 1; i >= 0; i--) {
            let valor = base.charCodeAt(i) - 48;
            soma += valor * peso;

            peso++;

            if (peso > 9) {
                peso = 2;
            }
        }

        let resto = soma % 11;

        return resto < 2 ? 0 : 11 - resto;
    }

    let primeiro = calcularDigito(cnpj.slice(0, 12));

    let segundo = calcularDigito(
        cnpj.slice(0, 12) + primeiro
    );

    return cnpj.slice(12) ===
        String(primeiro) + String(segundo);
}

document.getElementById("formEmpresa")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        let cnpj = document.getElementById("cnpj").value;
        let mensagem = document.getElementById("mensagem");

        if (validarCNPJ(cnpj)) {
            mensagem.textContent =
                "Empresa cadastrada com sucesso!";
            mensagem.style.color = "green";
        } else {
            mensagem.textContent = "CNPJ inválido!";
            mensagem.style.color = "red";
        }
    });

    