import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { URL_DEFAULT } from 'src/app/util/constant-url';
import { snapshotToArray } from 'src/app/util/functions-export';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(private http: HttpClient) {}

  sendMessage(chat: any) {
    return this.http.post(`${URL_DEFAULT}/chats.json`, chat);
  }

  public getOnlineUsers(): Observable<any[]> {
    const roomUsersUrl = `${URL_DEFAULT}/roomusers.json`;

    return this.http.get<any[]>(roomUsersUrl);
  }

  updateUserStatus(userKey: string): Observable<any> {
    const userUrl = `${URL_DEFAULT}/roomusers/${userKey}.json`; // Substitua pela URL correta
    return this.http.patch(userUrl, { status: 'offline' });
  }

  getUsers(): Observable<any> {
    const usersUrl = `${URL_DEFAULT}/roomusers.json`; // Substitua pela URL correta
    return this.http.get(usersUrl);
  }

  getChats(): Observable<any[]> {
    return this.http.get(`${URL_DEFAULT}/chats.json`)
      .pipe(
        map(
          (data: any) =>
          snapshotToArray(data)
          )
      );
  }
}
