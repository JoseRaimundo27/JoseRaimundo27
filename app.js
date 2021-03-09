var canvas, ctx, ALTURA, LARGURA, frames=0, maxPulos = 3,velocidade = 6,
estadoAtual,

estados = {
   jogar:0,
   jogando:1,
   perdeu:2
},
// Criando objetos no jogo:

//Criando o chão:
chao ={
    y: 500,
    h: 100,
    cor: "#ffdf70",

    desenha: function(){
    ctx.fillStyle = this.cor;
    ctx.fillRect(0, this.y, LARGURA, this.h);
        }
},
//Criando meu Bloco:
bloco = {
   x:50,
   y:0,
   h:50,
   l:50,
   cor: "#ff4e4e",
   gravidade: 1.5,
   velocidade:0,
   forcaDoPulo: 19,
   qntPulos: 0,
   pula: function() {
      if(this.qntPulos < maxPulos){
      this.velocidade = -this.forcaDoPulo;
      this.qntPulos++;
         
   }
   },
   

   atualiza: function() {
      this.velocidade += this.gravidade;
      this.y += this.velocidade;
      if(this.y > chao.y - this.l && estadoAtual != estados.perdeu){
         this.y = (chao.y - this.l);
         this.qntPulos = 0;
         this.velocidade = 0;
         
      }
   },
   desenha: function() {
      ctx.fillStyle = this.cor;
      ctx.fillRect(this.x, this.y, this.l, this.h)
   }


},

//Criando os obstaculos: 
obstaculos = {
   _obs: [],
   cores: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],
   tempoInsere:0,
   
   insere: function() {
      this._obs.push({
         x: LARGURA,
         //largura: 30 + Math.floor(21 * Math.random()),
         largura: 50,                                                   
         // Se ele sortear 0 O MINIMO será 30px, se ele sortear 20 o MAXIMO será 50px
         altura: 30 + Math.floor(100*Math.random()),
         cor: this.cores[Math.floor( 5 * Math.random())],
                                                   
      });

      this.tempoInsere = 40 + Math.floor(21 *Math.random());
   },
   atualiza: function() {
      if(this.tempoInsere == 0){
         obstaculos.insere()
      }else{
         this.tempoInsere--;
      }

      for (var i = 0, tam = this._obs.length; i< tam; i++) {
         var obs = this._obs[i];
         obs.x -= velocidade;
         //Colisão:
         if(bloco.x < (obs.x + obs.largura) && (bloco.x + bloco.l) >= obs.x && bloco.y + bloco.h >= chao.y - obs.altura){
            estadoAtual = estados.perdeu;
         }else if (obs.x == -obs.largura) {
            this._obs.splice[i,1];
            i -- ;
            tam --;
         }
      }
   },
   
   limpa: function() {
      this._obs = [];
   },

   desenha: function() {
      for(var i = 0, tam = this._obs.length; i <tam; i++) {
         var obs = this._obs[i];
         ctx.fillStyle = obs.cor;
         ctx.fillRect(obs.x,chao.y - obs.altura, obs.largura, obs.altura);
      }
   }

}




function clique(event){
    // identificar se a pessoa cliclou
    if (estadoAtual == estados.jogando){   
    bloco.pula()
   }else if (estadoAtual == estados.jogar){
      estadoAtual = estados.jogando;
   }else if(estadoAtual == estados.perdeu){
      estadoAtual = estados.jogar;
      obstaculos.limpa();
      bloco.velocidade = 0;
      bloco.y = 0;
   }
    
    
}

function roda(){
    // atualizando e desenhando o jogo
    atualiza();
    desenha();
    
     window.requestAnimationFrame(roda);

}

function atualiza(){

    // atualizar status do personagem
    frames++;
    bloco.atualiza();
    if(estadoAtual == estados.jogando){
      obstaculos.atualiza();
   
   }
    
}

function desenha(){

    // desenha personagens e cenário
    ctx.fillStyle = "#50beff";
    ctx.fillRect(0,0,LARGURA,ALTURA);
    if(estadoAtual == estados.jogar) {
       ctx.fillStyle = "green";
       ctx.fillRect(LARGURA/2 -50, ALTURA/2 -50 ,100,100);

    }else if(estadoAtual == estados.perdeu) {
       ctx.fillStyle = "red";
       ctx.fillRect(LARGURA/2 -50, ALTURA/2 -50 ,100,100)
    
   }else if( estadoAtual == estados.jogando){
      obstaculos.desenha()

   }
    chao.desenha();
    bloco.desenha();
}

function main (){
   
    // inicializa o jogo
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    if(LARGURA >= 500){
        LARGURA=600;
        ALTURA=600;
    }

    canvas = document.querySelector("#canvas")
    canvas.width=LARGURA;
    canvas.height=ALTURA;
    canvas.style.border= "1px solid #3d3d3d";
    ctx = canvas.getContext("2d");
    

    document.addEventListener("click", clique);
    estadoAtual = estados.jogar;
    roda();
    
      
    
}
main();