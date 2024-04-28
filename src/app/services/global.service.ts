import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // api principal
  // public apiUrlGlobal = 'https://dasd.dsad.com';
  // api de prueba en localhost
  public apiUrlGlobal = 'http://localhost:3000';
  public urlgeneral = 'https://fileuploadjxdesign.herokuapp.com';
  public apiUrlGlobal_servicio = 'https://serviciomensajeria.jxdesignsolution.com';
  constructor() { }

  generateRandomCode(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
