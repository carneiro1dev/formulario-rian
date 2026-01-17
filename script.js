function aumentar(id) {
    var logo = document.getElementById(id);
    logo.style.transform = 'scale(1.05)';
}

function voltar(id) {
    var logo = document.getElementById(id);
    logo.style.transform = 'scale(1)';
    logo.style.boxShadow = 'none';
}

document.addEventListener('DOMContentLoaded', function() {   // Espera o HTML carregar completamente antes de rodar o Js
    var form = document.getElementById('form-contato');      // Pega o formulário pelo ID "form-contato"
    var msg = document.getElementById('status');            // Pega o parágrafo onde vamos mostrar mensagem de sucesso ou erro
    
    // Se não encontrar o formulário ou a mensagem, para tudo
    if (!form || !msg) {
        console.log('Form ou status não encontrado');
        return;
    }

    form.addEventListener('submit', function(e) {        // Fica "escutando" quando alguém clicar no botão de enviar
        e.preventDefault();                         // Impede o comportamento padrão do formulário (recarregar a página)

        var data = new FormData(form);    // Cria um pacote com todos os dados digitados no formulário

        // Envia os dados para o Formspree usando internet (fetch)
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(response) {            // Quando o Formspree responder
            
            msg.classList.remove('sucesso', 'erro');   // Remove estilos antigos de sucesso ou erro

            // Se a resposta for positiva (mensagem enviada)
            if(response.ok) {
                msg.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
                msg.classList.add('sucesso');       //Deixa o texto verde
                msg.style.display = 'block';        //Mostra mensagem na tela
                form.reset();                   // Limpa os campos do formulário
            } 
            
            // Se der errado o envio
            else {
                msg.textContent = 'Erro ao enviar. Tente novamente.';
                msg.classList.add('erro');
                msg.style.display = 'block';
            }
        
        })
        
        // Se nem conseguir conectar com o Formspree
        .catch(function() {
            msg.textContent = 'Erro de conexão. Tente novamente.';
            msg.classList.add('erro');
            msg.style.display = 'block';
        });
    });
});