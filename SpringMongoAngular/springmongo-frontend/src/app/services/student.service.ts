import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student'; 

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url:string = "http://localhost:8081/api/v1/";

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + "student/getall");
  }

  register(student: Student): Observable<any> {
    return this.http.post(this.url + "student/save", student, { responseType: 'text' });
  }

  update(student: Student): Observable<any> {
    return this.http.post(this.url + "student/edit/" + student._id, student, { responseType: 'text' });
  }

  delete(studentId: string): Observable<any> {
    return this.http.get(this.url + "student/delete/" + studentId, { responseType: 'text' });
  }
}
