import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getCurrentUser() {
    return 'szymonpucher';
  }
}
