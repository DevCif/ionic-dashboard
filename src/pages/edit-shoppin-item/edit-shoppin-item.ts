import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database-deprecated";
import { ShoppingItem } from '../../models/shopping-item/shopping-item.Interface';


@Component({
  selector: 'page-edit-shoppin-item',
  templateUrl: 'edit-shoppin-item.html',
})
export class EditShoppinItemPage {

  shoppinItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase) {

    // capturar el shoppingId as NavParameter
    const shoppingItemId = this.navParams.get('shoppingItemId');
    
    // Log el parametro 
    console.log(shoppingItemId);

    // seleccionar el scope de firebase
    this.shoppinItemRef$ = this.database.object(`cars-list/${shoppingItemId}`);
    // suscribir el objeto
    this.shoppinItemRef$.subscribe(shoppingItem => this.shoppingItem = shoppingItem);
  }

  editShoppingItem(shoppingItem: ShoppingItem){
    this.shoppinItemRef$.update(shoppingItem);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShoppinItemPage');
  }

}
