import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrl: './cursos-form.component.scss',
})
export class CursosFormComponent {
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    // let registro = null;
    
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const curso = this.service.loadbyID(id)
    //     curso.subscribe(curso => {
    //       registro = curso;
    //       this.updateForm(curso);
    //     });
    //   }
    // );

    // console.log(registro)

    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.service.loadbyID(id))
    // )
    // .subscribe(curso => this.updateForm(curso));

    const curso= this.route.snapshot.data['curso']

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.create(this.form.value).subscribe(
        (sucess) => {
          this.modal.showAlertSucess('Curso criado com sucesso!');
          this.location.back();
        },
        (error) =>
          this.modal.showAlertDanger('Erro ao criar curso, tente novamente.'),
        () => console.log('request complete!')
      );
    }
  }

  onCancel() {
    this.submitted = true;
    this.form.reset();
    //console.log('onCancel')
  }
}
