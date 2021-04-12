import {environment} from './../../../environments/environment.prod';
import {ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tema } from 'src/app/Model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { AlertasService } from 'src/app/service/alertas.service';


@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  )
  { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
  }

  findByIdTema(id: number) {
    this.temaService.gitByIdTema(id).subscribe((resp: Tema)=> {
      this.tema = resp
    })
  }

  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp : Tema)=> {
      this.tema = resp
      this.alertas.showAlertSuccess('Tema atualizado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}
