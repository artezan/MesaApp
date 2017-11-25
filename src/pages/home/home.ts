import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {Provider} from  '../../providers/provider/provider'
import { Storage } from '@ionic/storage';
import {PlanoPage} from  '../plano/plano';
import {CapturarPage} from  '../capturar/capturar';

import { AlertController } from 'ionic-angular';
import {EditarmesaPage} from '../editarmesa/editarmesa';

import { Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AngularFireDatabase  } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {
  shoppingItems:any;
  newItem:any;
  items = [];
  seleccionado = [];
  estado:any;
  textarea;
  constructor(public navCtrl: NavController,public provider: Provider,private storage: Storage, 
public alertCtrl: AlertController,private http:Http, public afd: AngularFireDatabase,private backgroundMode: BackgroundMode,
) {
     
   this.backgroundMode.enable();

  this.backgroundMode.overrideBackButton();
  
  this.backgroundMode.isScreenOff(); 
 
    this.estado = 'reservaciones';
   this.obtener(); 
   //this.obtenerfirebase();
  }

  obtenerfirebase(){
    this.afd.list('shoppingItems').snapshotChanges().map(actions => {
    return actions.map(action => ({ key: action.key, ...action.payload.val() }));
  }).subscribe(items => {
     this.shoppingItems = items
     this.provider.fire = items
  });
  }
  addItem() {
       console.log(this.provider.fire);

    this.afd.list('/shoppingItems/').push({nombre:this.newItem});
  }
    removeItem(id) {
    this.afd.list('/shoppingItems/').remove(id);
  }
  updateItem(key) {
    this.afd.list('/shoppingItems/').update(key,{nombre:this.newItem});
  }
  obtener(){
     this.provider.firebase().subscribe(items => {
     this.provider.mesas_store=items;
  });
      
     
  }
select(element,item){ 
    for (var i = this.provider.mesas_store.length - 1; i >= 0; i--) {
      if (this.provider.mesas_store[i].numero == element && this.provider.mesas_store[i].estado=="radio-button-off"  ) {
        this.provider.mesas_store[i].estado="radio-button-on";
        this.afd.list('mesas').update(item.key,{estado:"radio-button-on"});   
      }else if (this.provider.mesas_store[i].numero == element && this.provider.mesas_store[i].estado=="radio-button-on"  ) {
        this.provider.mesas_store[i].estado="radio-button-off";
        this.afd.list('mesas').update(item.key,{estado:"radio-button-off"});   
      }

    }
    
   
}
   getItems(ev: any) {
    // Reset items back to all of the item
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.provider.mesas_store = this.provider.mesas_store.filter((item) => {
        return ((String(item.nombre)+String(item.numero)).toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
       
    }
    else{  this.obtener(); }
  }
  plano(item){
  	this.navCtrl.push(PlanoPage, item);
  }
   presentPrompt() {
  const alert = this.alertCtrl.create({
    title: 'Restablecer Valores',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Borrar',
        handler: data => {
          this.actualizar();
        }
      }
    ]
  });
  alert.present();
}
actualizar(){

 
    this.afd.list('/mesas/').remove();
  
  this.provider.mesas_store.length = 0;
  for (var i = this.provider.mesas.length - 1; i >= 0; i--) {
    this.afd.list('/mesas/').push(this.provider.mesas[i]);
  }
  this.obtener();
}
editar(item){
  this.navCtrl.push(EditarmesaPage, item)
}
dar_mesa(item){
  this.navCtrl.push(PlanoPage, {item,dar:1})
}
 borrar(numero){
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      subTitle: 'Seguro que quiere borrar reservacion de: '+ String(numero),
      buttons: [
      {
        text:'Si',handler: () => {
          this.modal(numero);
        }
      },
      {
        text:'No',role: 'cancel',handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    alert.present();
    
  }
   modal(numero){
 for (var i = this.provider.mesas_store.length - 1; i >= 0; i--) {
      if (this.provider.mesas_store[i].numero == numero) {
         this.provider.mesas_store[i].tipo_res= "libre";
         this.provider.mesas_store[i].nombre= " ";
         this.provider.mesas_store[i].nombre_res= " ";
         this.afd.list('mesas').update(this.provider.mesas_store[i].key,{numero:numero,tipo_res: "libre",nombre: " ",nombre_res:" ", estado:"radio-button-off"}); 

      }
    } 

     this.navCtrl.setRoot(HomePage);

      
  }
  planopage(){
   this.navCtrl.setRoot(PlanoPage);
  }
  capturarpage(){
    this.navCtrl.setRoot(CapturarPage);
  }
  enviar(){

    var myData = JSON.stringify({app_id: "18b2cb4f-b75d-456d-9c81-8577b8500b8b",
  contents: {"en": "Mesa ocupada"},
  included_segments: ["All"]});
    let headers = new Headers();
    headers.append('Authorization', 'Basic ZGE0ODgxOWEtN2M5MC00MDVkLThkMWMtYTBhYjhmODE5Y2Zj' );
     headers.append('Content-Type', 'application/json; charset=utf-8');
     let options = new RequestOptions({ headers: headers});
      this.http.post(' https://onesignal.com/api/v1/notifications',myData, options ).map(res =>  res.json()).subscribe(data => {
          console.log(data);
           });
  }

}
