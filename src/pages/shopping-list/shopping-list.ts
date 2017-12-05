import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping'
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database-deprecated";
import { ShoppingItem } from '../../models/shopping-item/shopping-item.Interface';
import { ActionSheet } from 'ionic-angular/components/action-sheet/action-sheet';
import { EditShoppinItemPage } from '../edit-shoppin-item/edit-shoppin-item'



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {
    //referencia      
    this.shoppingListRef$ = this.database.list('cars-list');
    //this.shoppingListRef$.subscribe(x => console.log(x));
  }


  selectShoppingItem(shoppingItem: ShoppingItem) {
    /**
     * Ver Propiedades del item
     * 
     * 1. Editar el item
     * 2. Eliminar el item 
     * 3. Cancelar la seleccion
     */

    this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            /* Envio de usuario para EditShoppinItemPage y pasar
            como parametro key */

            this.navCtrl.push(EditShoppinItemPage, { shoppingItemId: shoppingItem.$key });
             
            /** 
             * { shoppingItemId: '-kiwuldylok4ruwo'}
             */

          }
        },
        {
          text: 'Eliminar',
          role: 'dustructive',
          handler: () => {
            // Eliminar el ultimo item seleccionado
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("El usuario a presionado el boton cancelar");
          }

        }
      ]
    }).present();


  }

  navigateToaddShoppingPage() {
    //navegador de usuario

    this.navCtrl.push(AddShoppingPage);
  }

}
