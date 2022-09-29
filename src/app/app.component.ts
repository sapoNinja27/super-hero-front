import {Component, OnInit} from '@angular/core';
import {Service} from './services/service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  temAnterior = false;
  jogando = false;
  ganhou = false;
  perdeu = false;
  selected = null;
  error = null;
  placar1 = 0;
  placar2 = 0;
  cartaJogador: Heroi = {
    nome: "",
    imagem: "",
    atributos: {
      velocidade: 0,
      forca: 0,
      inteligencia: 0
    }
  };
  cartaJogadorAnterior: Heroi = {
    nome: "",
    imagem: "",
    atributos: {
      velocidade: 0,
      forca: 0,
      inteligencia: 0
    }
  };
  cartaMaquina: Heroi = {
    nome: "",
    imagem: "",
    atributos: {
      velocidade: 0,
      forca: 0,
      inteligencia: 0
    }
  };

  cartaMaquinaAnterior: Heroi = {
    nome: "",
    imagem: "",
    atributos: {
      velocidade: 0,
      forca: 0,
      inteligencia: 0
    }
  };


  constructor(private service: Service) {}

  ngOnInit(): void {}

  reset() {
    this.error = null;
  }

  onSubmit(): void {
    this.divideCartas();
    this.jogando = true;
  }
  jogarNovamente(): void {
    this.placar1 = 0;
    this.placar2 = 0;
    this.ganhou = false;
    this.perdeu = false;
    this.jogando = true;
  }

  handleError(error: HttpErrorResponse) {
    this.reset();
    this.error = error.error.message;
  }


  divideCartas() {
    this.service.find().subscribe(data => {
      this.cartaJogador = data;
    });
    this.service.find().subscribe(data => {
      this.cartaMaquina = data;
    });
  }

  apostar() {
    let atributo = this.selected;
    if(atributo === "forca" || atributo === "inteligencia" || atributo === "velocidade"){
      if(this.cartaJogador.atributos[atributo] > this.cartaMaquina.atributos[atributo]){
          this.placar1 ++;
      } else {
        this.placar2 ++;
      }
    }
    this.temAnterior = true;
    this.cartaJogadorAnterior = this.cartaJogador;
    this.cartaMaquinaAnterior = this.cartaMaquina;
    if(this.placar1 === 5){
      this.ganhou = true;
      this.jogando = false;
    } else if(this.placar2 === 5){
      this.perdeu = true;
      this.jogando = false;
    }else {
      this.divideCartas();
    }
  }
}
