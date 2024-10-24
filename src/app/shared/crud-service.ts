import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";

export class CrudService<T> {

  constructor(protected http: HttpClient, private API_URL: any) { }

  list() {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(2000),
        // tap(console.log)
      );
  }

  loadbyID(id: any) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(record: T) {
    return this.http.post(this.API_URL,record)
    .pipe(
        tap(record => console.log(record)),
        take(1)
    );
  }

  private update(record: T) {
    return this.http.put(`${this.API_URL}/${record['id' as keyof T]}`, record).pipe(take(1))
  }

  save(record: T) {  
    console.log(record)
    if (record['id' as keyof T]) {
      return this.update(record)
    }
    
    //gambiarra do pai
    const semId = record;
    delete semId['id' as keyof T];

    return this.create(record)
  }

  remove(id: any) { 
    return this.http.delete(`${this.API_URL}/${id}`, id).pipe(take(1));
   }
}
