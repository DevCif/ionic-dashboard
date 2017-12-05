import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.Interface';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem

  shoppinItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {

    this.shoppinItemRef$ = this.database.list('cars-list');
    /**
     * Lista de compras:
     * 0:
     *   itemName: 'pizza',
     *   itemNumer : 1 
     * 1: 
     *   itemName: 'cheesecake',
     *   itemNumer 5
     */

  }


  addShoppinItem(shoppingItem: ShoppingItem) {
    /**
     * Crear los nuevos argumentos del objeto y convertir itemNumber
     * a un numero
     * enviar esto a firebase
     */

    this.shoppinItemRef$.push({
      Name: this.shoppingItem.itemName,
      Number: Number(this.shoppingItem.itemNumber),
      Kilometraje: Number(this.shoppingItem.itemKilometraje),
      KilometrajeUso: Number(this.shoppingItem.itemKilometrajeUso),
      FechaServicio: this.shoppingItem.itemFechaServicio,
      Servicio : this.shoppingItem.itemServicio,
      Modelo : this.shoppingItem.itemModelo,

    
    });

    this.shoppingItem = {} as ShoppingItem;

    /**
     *  'ShoppingListPage'
     */
    this.navCtrl.pop();
  }

}
