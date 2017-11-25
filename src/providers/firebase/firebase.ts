
import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FirebaseProvider {
	 items;
     valores;
     keys;
  constructor(public afd: AngularFireDatabase ) {
    console.log('Hello FirebaseProvider Provider');
    this.afd.list('shoppingItems').valueChanges().subscribe(data=>{
     this.getvalues(data)
     
    });
    
   	this.afd.list('shoppingItems').snapshotChanges().map(actions => {
    return actions.map(action => ({ key: action.key, ...action.payload.val() }));
  }).subscribe(items => {
     this.valores= items
  });
 
   
  }
  getvalues(data){
    this.valores=data;
  }
  getkeys(data){
   this.keys =data;
  }
  getShoppingItems(data) {
  this.valores=data
  
  }
 
  addItem(name) {
    this.afd.list('/shoppingItems/').push({nombre:name});

  }
 
  removeItem(id) {
    this.afd.list('/shoppingItems/').remove(id);
  }
  updateItem(key,data){
  	this.afd.list('/shoppingItems/').update(key,{nombre:data});
  }
}



