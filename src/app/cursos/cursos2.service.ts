import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Curso } from './curso';
import { environment } from '../../environment/environment';

@Injectable()
export class Cursos2Service extends CrudService<Curso> {

    constructor(protected override http: HttpClient) {
        super(http, `${environment.API}cursos`);
    }

}