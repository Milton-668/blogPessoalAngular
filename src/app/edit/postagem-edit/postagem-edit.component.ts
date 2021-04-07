import { Tema } from 'src/app/Model/Tema';
import { PostagemService } from './../../service/postagem.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/Model/Postagem';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem();

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit() {

    window.scroll(0,0)
    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=> {
      this.postagem = resp
    })
  }

  findByIdTema(){
    this.temaService.gitByIdTema(this.idTema).subscribe((resp: Tema)=> {
      this.tema = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  atualizar(){
   this.tema.id = this.idTema
   this.postagem.tema = this.tema

   this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem)=>{
     this.postagem = resp
     alert('Postagem atualizada com sucesso!')
     this.router.navigate(['/inicio'])
   })

  }

}
