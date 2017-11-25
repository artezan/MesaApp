
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



/*
  Generated class for the Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Provider {
	mesas= [];
  mesas_store = [];
  rp_reserva=[];
  fire;

  constructor(private storage: Storage,public afd: AngularFireDatabase ) {
  
         for (var i = 1; i < 30; ++i) {
      var nivel=0;
      if (i<=12) {
        nivel = 1
      }else if (i<=29 && i>=20) {
        nivel = 2;
      }else if (i<=35 && i>=30) {
        nivel = 3
      }else if (i<=49 && i>=40) {
        nivel = 2;
      }else if (i<=55 && i>=50) {
        nivel = 3;
      }
      if (nivel != 0) {

        this.mesas.push(
    {
      numero:i,
      nombre: 'Juan Perez'+String(i),
      tipo_res: 'capitan',
      nombre_res:'capitan'+String(i),
      desc: 'algo',
      nivel: nivel,
      estado:"radio-button-off"

    }
    );
        
      }
       
      
    }
    for (var i = 30; i < 50; ++i) {
      var nivel=0;
      if (i<=12) {
        nivel = 1
      }else if (i<=29 && i>=20) {
        nivel = 2;
      }else if (i<=35 && i>=30) {
        nivel = 3
      }else if (i<=49 && i>=40) {
        nivel = 2;
      }else if (i<=55 && i>=50) {
        nivel = 3;
      }
      if (nivel != 0) {

        this.mesas.push(
    {
      numero:i,
      nombre: 'Lalo Perez'+String(i),
      tipo_res: 'rp',
      nombre_res:'rp'+String(i),
      desc: 'algo',
      nivel: nivel,
      estado:"radio-button-off"

    }
    );
        
      }
       
      
    }
    for (var i = 50; i < 56; ++i) {
      var nivel=0;
      if (i<=12) {
        nivel = 1
      }else if (i<=29 && i>=20) {
        nivel = 2;
      }else if (i<=35 && i>=30) {
        nivel = 3
      }else if (i<=49 && i>=40) {
        nivel = 2;
      }else if (i<=55 && i>=50) {
        nivel = 3;
      }
      if (nivel != 0) {

        this.mesas.push(
    {
      numero:i,
      nombre: 'Carlos Perez'+String(i),
      tipo_res: 'libre',
      nombre_res:'',
      desc: 'algo',
      nivel: nivel,
      estado:"radio-button-off"

    }
    );
        
      }
       
      
    }
   
  }
  public firebase(): Observable<any> {
 return  this.afd.list('mesas').snapshotChanges().map(actions => {
    return actions.map(action => ({ key: action.key, ...action.payload.val() }));
  })
  }

}
