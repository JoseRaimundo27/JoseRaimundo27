// Variáveis de jogo:
var canvas, ctx, ALTURA, LARGURA, frame = 0
//Criando o objeto chão que terá suas propiedades
var chao = {
   y:550,
   altura:50,
   cor: "red",
   desenha: function(){
      ctx.fillRect(0, this.y, LARGURA, this.altura);
      ctx.fillStyle = this.cor;
   }
}


function clique(event){
   alert("Clicou");

}

function main(){
   ALTURA = innerHeight;
   LARGURA = innerWidth;
   

   if(LARGURA<= 500){
      LARGURA = 600;
      ALTYRA = 600;
   }
   canvas = document.querySelector("#teste");
   canvas.heigth = ALTURA;
   canvas.width = LARGURA;
   ctx = canvas.getContext("2d");
   canvas.addEventListener("click", clique)
   
   roda()




   


}

function roda(){
   atualiza();
   draw();

   window.requestAnimationFrame(roda);
}

function atualiza(){
   frame++;

}

function draw(){
   ctx.fillStyle = "#50beff";
   ctx.fillRect(0,0,LARGURA,ALTURA);
   chao.desenha()

   
   
   
   

   
}

//Iniciando o jogo:
main()