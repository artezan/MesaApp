import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Provider} from  '../../providers/provider/provider'
import { Storage } from '@ionic/storage';
import {HomePage} from '../home/home'
import { AngularFireDatabase  } from 'angularfire2/database';



/**
 * Generated class for the EditarmesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editarmesa',
  templateUrl: 'editarmesa.html',
})
export class EditarmesaPage {
mesa= [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public provider: Provider,private storage: Storage,
   public afd: AngularFireDatabase) {
  	 this.mesa.push({numero:navParams.get('numero'), nivel: navParams.get('nivel'), nombre:navParams.get('nombre'), tipo_res:navParams.get('tipo_res'), 
  	 	desc:navParams.get('desc'), nombre_res:navParams.get('nombre_res'), estado:navParams.get('estado'), key:navParams.get('key')});
  	 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarmesaPage');
  }
  editar(){
     for (var i = this.provider.mesas_store.length - 1; i >= 0; i--) {
      if (this.provider.mesas_store[i].numero == this.navParams.get('numero')  ) {
        this.provider.mesas_store[i]=({numero:this.mesa[0].numero, nivel: this.mesa[0].nivel, nombre:this.mesa[0].nombre, tipo_res:this.mesa[0].tipo_res, 
       desc:this.mesa[0].desc, nombre_res:this.mesa[0].nombre_res, estado:this.mesa[0].estado,key:this.mesa[0].key});
        this.afd.list('mesas').update(this.mesa[0].key,this.provider.mesas_store[i]); 
      }
    }

     this.navCtrl.setRoot(HomePage)

  }

}
