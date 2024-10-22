import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Curso } from '../curso';
import { Observable, of } from 'rxjs';
import { CursosService } from '../cursos.service';

@Injectable({
    providedIn: 'root'
})

export class CursoResolverGuard implements Resolve<Curso> {

    constructor(private service: CursosService) {  }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        
        if (route.params && route.params['id']) {
            return this.service.loadbyID(route.params['id']);
        }

        return of({
            id: null,
            nome: null
        });
    }
}