const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.width = 675;
ctx.height=353;

const intervalo=10;
var tempo =0;
const maxtempo = 10000;

const somMove = new Audio("chute.ogg");
const somPancada = new Audio("pancada.ogg");
const somAh = new Audio("ah.ogg");

function Personagem(imagem, x, y, h, w) {
    this.x=x;
    this.y=y;
    this.estado=0;
    this.img = new Image();
    this.img.src = imagem; 
    this.width = w;
    this.height = h;
}

function Estado(ini,fini, sx, sy, vel) {
    this.frameIni=ini;
    this.frameFim=fini;
    this.num=ini;
    this.sx = sx;
    this.sy = sy;
    this.velocidade=vel;
    this.transx=0;
    this.transy=0;
    this.tabelatrans;  
    
    this.prox = function() {
        if (this.num===this.frameFim){
            this.num= this.frameIni;
        } 
        else { 
            this.num=  this.num+1;
            this.trans();
        }
    }
    this.muda = function() {
        var x = tempo/this.velocidade;
        if (x-Math.floor(x)>0) return false;
        else  return true;;
        
    }
    this.trans = function() {
        if (this.tabelatrans==undefined) {
            this.transx=0;
            this.transy=0;
        } else {
            this.transx=this.tabelatrans[this.num].x;
            this.transy=this.tabelatrans[this.num].y;
        }
    }
}

var fundo =  new function(){
    this.img = new Image();
    this.img.src = 'fundonoite.png';  
    this.desenha = function(){
        ctx.drawImage(this.img,0,0); 
    }  
}

var lutador =  new function(){
    this.agente = new Personagem('lutador.gif', 230,120, 132,125 );
    this.frames = 6;
    this.corrente=0;
    this.estados= new Array();
    this.estados[0] = new Estado(0,1,0,0,500);
    
    this.estados[1] = new Estado(0,6,0,0,100);
    this.estados[1].tabelatrans = new Array();
    this.estados[1].tabelatrans[0]=new Object();
    this.estados[1].tabelatrans[0].x=0;
    this.estados[1].tabelatrans[0].y=0;
    this.estados[1].tabelatrans[1]=new Object();
    this.estados[1].tabelatrans[1].x=00;
    this.estados[1].tabelatrans[1].y=-20;
    this.estados[1].tabelatrans[2]=new Object();
    this.estados[1].tabelatrans[2].x=0;
    this.estados[1].tabelatrans[2].y=-40;
    this.estados[1].tabelatrans[3]=new Object();
    this.estados[1].tabelatrans[3].x=0;
    this.estados[1].tabelatrans[3].y=-40;
    this.estados[1].tabelatrans[4]=new Object();
    this.estados[1].tabelatrans[4].x=0;
    this.estados[1].tabelatrans[4].y=-20;
    this.estados[1].tabelatrans[5]=new Object();
    this.estados[1].tabelatrans[5].x=0;
    this.estados[1].tabelatrans[5].y=-10;
    this.estados[1].tabelatrans[6]=new Object();
    this.estados[1].tabelatrans[6].x=0;
    this.estados[1].tabelatrans[6].y=0;

    this.estados[2] = new Estado(1,4,0,0,100);
      
    this.desenha = function(){
        var sx = this.agente.width*this.estados[this.corrente].num+this.estados[this.corrente].sx;
        if ( this.estados[this.corrente].muda()) this.estados[this.corrente].prox();
        try {
            ctx.save();
            ctx.translate(this.estados[this.corrente].transx, this.estados[this.corrente].transy)
            ctx.drawImage(this.agente.img, sx, 0 ,this.agente.width,this.agente.height,
                this.agente.x, this.agente.y, this.agente.width,this.agente.height); 
            ctx.restore();
            
        } catch (e) {
            alert(e.toString());
        }
        this.calculaProxEstado();
    }
    
    this.iniciaEstado = function(n) {
        this.corrente = n;
        if (n===1) {
            this.estados[lutador.corrente].num=lutador.estados[lutador.corrente].frameIni; 
            somMove.play();
        } else if (n===2) {
            this.estados[lutador.corrente].num=lutador.estados[lutador.corrente].frameIni; 
            somPancada.play()
        }

    }
    
    this.calculaProxEstado = function() {
        switch(this.corrente) {
            case 1:
            case 2:
                if (this.estados[this.corrente].num === 
                    this.estados[this.corrente].frameFim) {
                    this.corrente =0;
                }
                break;
            case 0:
                break;
        }
    }   
}

function desenha(){
    fundo.desenha();
    lutador.desenha();
}

var lutadora =  new function(){
    this.agente = new Personagem('lutadora.png', 500,150, 95,80 );
    this.frames = 5;
    this.corrente=0;
    this.estados= new Array();
    
    this.estados[0] = new Estado(0,1,0,0,1000); 

    this.estados[1] = new Estado(1,5,0,0,250);
    this.estados[1].tabelatrans = new Array();
    this.estados[1].tabelatrans[1] = new Object();
    this.estados[1].tabelatrans[1].x = 0;
    this.estados[1].tabelatrans[1].y = 0;
    this.estados[1].tabelatrans[2] = new Object();
    this.estados[1].tabelatrans[2].x = 0;
    this.estados[1].tabelatrans[2].y = 0;
    this.estados[1].tabelatrans[3] = new Object();
    this.estados[1].tabelatrans[3].x = 50;
    this.estados[1].tabelatrans[3].y = -30;
    this.estados[1].tabelatrans[4] = new Object();
    this.estados[1].tabelatrans[4].x = 60;
    this.estados[1].tabelatrans[4].y = 0;
    this.estados[1].tabelatrans[5] = new Object();
    this.estados[1].tabelatrans[5].x = 0;
    this.estados[1].tabelatrans[5].y = 0;

      
    this.desenha = function(){
        var sx = this.agente.width*this.estados[this.corrente].num+this.estados[this.corrente].sx;
        if ( this.estados[this.corrente].muda()) this.estados[this.corrente].prox();
        try {
            ctx.save();
            ctx.translate(this.estados[this.corrente].transx, this.estados[this.corrente].transy)
            ctx.drawImage(this.agente.img, sx, 0 ,this.agente.width,this.agente.height,
                this.agente.x, this.agente.y, this.agente.width,this.agente.height); 
            ctx.restore();
        } catch (e) {
            alert(e.toString());
        }
        this.calculaProxEstado();
    }
    
    this.iniciaEstado = function(n) {
        this.corrente = n;
        if (n===1) {
            this.estados[lutadora.corrente].num=lutadora.estados[lutadora.corrente].frameIni;
            somAh.play()
        }
    }
    
    this.calculaProxEstado = function() {
        switch(this.corrente) {
            case 1:
                if (this.estados[this.corrente].num === 
                    this.estados[this.corrente].frameFim) {
                    this.corrente =0;
                }
                break;
            case 0:
                break;
        }
    }
}

function desenha(){
    fundo.desenha();
    lutador.desenha();
    lutadora.desenha();
}

var GameLoop = function(){
    desenha();
    setTimeout(GameLoop, intervalo);
    tempo = tempo+intervalo;
    if (tempo>maxtempo) tempo=0;
}

document.onkeydown = function(e){
    let keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    if (keycode===40) {
        lutador.iniciaEstado(0);
    } else if(keycode===38) {
        lutador.iniciaEstado(1);
    } else if(keycode===37 || keycode===39) {
        lutadora.iniciaEstado(1);
        lutador.iniciaEstado(2);
    }
}

GameLoop();