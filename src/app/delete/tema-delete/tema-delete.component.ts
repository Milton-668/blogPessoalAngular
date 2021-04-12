import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/Model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import {environment} from './../../../environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate([ '/entrar'])
    }

    this.idTema= this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number) {
    this.temaService.gitByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  deletar(){
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      this.alertas.showAlertInfo('Tema apagado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }
}
