import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class Service {
  private path = "https://hero-randon-api.herokuapp.com/api/herois";

  constructor(private http: HttpClient) {}

  find(): Observable<Heroi> {
    return this.http.get<Heroi>(`${this.path}`);
  }
}
