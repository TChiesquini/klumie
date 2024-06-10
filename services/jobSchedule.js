import schedule from 'node-schedule';
import Empresa from './models/Empresa.js';
import Interprete from './models/Interprete.js';
import Pessoa from './models/Pessoa.js';
import Evento from './models/Evento.js';

async function verificarEvento () {

  eventos = await Evento.find();

  for (var i = 0; i < eventos.length; i++){
    var cliente = Empresa.findOne({'_id': eventos[i].idCliente }) || Pessoa.findOne({'_id': eventos[i].idCliente });
    if((cliente.carteira + cliente.tempobonus) = Math.abs(eventos[i].inicioprevio - eventos[i].terminoprevio)) {
      if(eventos[i].status == "Agendado"){
        var dataAtual = Date.now;
        var dataEvento = eventos[i].inicioprevio; 

        const diferenca = (Math.abs(dataEvento - dataAtual)) / (1000 * 60 * 60);
        
        if((diferenca <= 3.5 && diferenca >= 2.5) || (diferenca <= 24 && diferenca >= 23.5)){
          const mailOptions = {
            from: '"Klumie" <klumie.cursos@gmail.com>',
            to: cliente.email,
            subject: 'Assunto: Klumie | Falta de saldo',
            html: `<html>
            <head>
              <style>
                /* Estilos CSS para o e-mail */
                .container {
                  font-family: Arial, sans-serif;
                  text-align: center;
                }
                .large-bold {
                  font-size: 24px; /* Tamanho de fonte grande */
                  font-weight: bold; /* Texto em negrito */
                }
              </style>
            </head>
            <body>
              <div class="container">
                <p>Olá,</p>
                <p>Você recebeu este e-mail porque seu saldo está baixo para iniciar o evento: </p>
                <p><span class="large-bold">${eventos[i].nomeEvento}</span></p>
                <p><span class="large-bold">${eventos[i].inicioprevio}</span></p>
                <p>Recarregue seu saldo para que ele não seja cancelado.</p>
                <p>Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
                <p>Atenciosamente,</p>
                <p>Klumie</p>
              </div>
            </body>
          </html>`
        };
      
        // Enviar o email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(500).json({ erro: `Erro ao enviar o email: ${error}` });  
            } else {
                const token = jwt.sign({ email }, process.env.SECRET, {
                  expiresIn: 86400
                });
                res.status(200).json({ 
                  mensagem: 'Email de redefinição de senha enviado com sucesso.',
                });
            }
        });
        }
      }
    }
  }
}

schedule.scheduleJob('00 * * * *', verificarEvento);