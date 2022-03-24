import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITodo } from '../shared/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = environment.baseURL;

  constructor(private http: HttpClient) { }

  addTodo(todo: ITodo): Observable<string> {
    return this.http.post<string>(`${this.url}todo`, todo, {responseType: 'text' as 'json'});
  }

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.url}todo`);
  }

  deleteTodo(id: string): Observable<string> {
    return this.http.delete<string>(`${this.url}todo/${id}`, {responseType: 'text' as 'json'});
  }

  updateTodo(todo: ITodo, id: string): Observable<string> {
    return this.http.put<string>(`${this.url}todo/${id}`, todo, {responseType: 'text' as 'json'});
  }
}
