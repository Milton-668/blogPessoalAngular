import { Component, OnInit } from '@angular/core';
import {environment} from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Tema } from '../Model/Tema';
import { TemaService } from '../service/tema.service';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit()  {
    this.findAllTemas()

    if(environment.tipo != 'adm'){
      this.alertas.showAlertInfo("Você deve ser um adm para acesar essa rota!")
      this.router.navigate(['/inicio'])
    }
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }



  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema =resp
      this.alertas.showAlertSuccess('Tema Cadastrado com sucesso!')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }
}
