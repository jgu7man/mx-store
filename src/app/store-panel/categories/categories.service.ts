import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { MxStoreCategoryModel } from './category.model';
import { MxAlert } from '@marxa/devkit';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MxStoreCategoriesService {

    /**Defines the path where the categories will be saved.
     * Need to be a strings with slashs and must be even number of sections
     * Example: `collection/document/collection`: even number = 3
    */
    public path: string | null = null

    categories$: Observable<any> = new Observable()

    constructor (
        private _fs: AngularFirestore,
        private _alerta: MxAlert
    ) {
     }




    async loadCategories() {
        try {
            const productsDocRef = this._fs.doc( 'tienda/productos' ).ref;
            const productDoc = await productsDocRef.get()
            var categoList: MxStoreCategoryModel[] = await productDoc.get('categorias')



            return categoList
        } catch (error) {
            console.error(error)
            return []
        }

    }


    async addCategory( category: MxStoreCategoryModel ) {
        try {
            const productsDoc = this._fs.doc( `tienda/productos` ).ref
            var categoDoc = await productsDoc.get()
            var categoList: MxStoreCategoryModel[]

            var Category = {
                description: category.description ? category.description : '',
                fields: category.fields ? category.fields : [],
                image: category.image ? category.image : '',
                name: category.name ? category.name : '',
                path: category.path ? category.path : ''
            }

            if ( categoDoc.exists ) {
                categoList = await categoDoc.get( 'categorias' )
                let categoFinded = categoList.findIndex( c => c.name == category.name )

                categoFinded >= 0
                    ? this._alerta.message( 'Esta categoría ya existe, elige otro nombre' )
                    : categoList.push( { ...Category } );
                console.log( categoList );
                await productsDoc.set( { categorias: categoList }, { merge: true } )
            } else {
                categoList = [ Category ]
                console.log(categoList);
                await productsDoc.set({categorias: categoList})
            }



            return



        } catch (error) { console.error( error ); }
    }




    async editCategory( category: MxStoreCategoryModel, categoId: string ) {
        try {
            const productsDocRef = this._fs.doc( `tienda/productos` ).ref
            var productsDoc = await productsDocRef.get()
            var categoriasList: MxStoreCategoryModel[] = await productsDoc.get( 'categorias' )
            var categoFinded = categoriasList.findIndex( c => c.name == categoId )
        Object.keys( category ).forEach( ( key: string ) => {
          if ( category[ key as keyof MxStoreCategoryModel ] == undefined )
            delete category[ key as keyof MxStoreCategoryModel ]
      } );
            categoriasList[categoFinded] = {...category}

            var categoUpdated = await productsDocRef.set( { categorias: categoriasList})

            return true



        } catch ( error ) { console.error( error );  return error}
    }

    async delCategory( category: MxStoreCategoryModel ) {
        try {
            const productsDocRef = this._fs.doc( `tienda/productos` ).ref
            var productsDoc = await productsDocRef.get()
            var categoriasList: MxStoreCategoryModel[] = await productsDoc.get( 'categorias' )
            var categoFinded = categoriasList.findIndex( c => c.name == category.name )
            categoriasList.splice(categoFinded, 1)
            await productsDocRef.set( { categorias: categoriasList } )

            return true



        } catch ( error ) { console.error( error ); return error }
    }
}
