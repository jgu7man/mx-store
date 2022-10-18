import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-pagina',
  templateUrl: './menu-pagina.component.html',
  styleUrls: ['./menu-pagina.component.css']
})
export class MenuPaginaComponent implements OnInit {

  rutas: RUTA[] = [
    { name: 'inicio', route: '' },
    { name: 'categorías', route: 'categorias' },
    // { name: 'citas', route: 'citas' },
    // { name: 'blog', route: 'blog' },
    { name: 'contacto', route: 'contacto' },
  ]

  constructor () { }

  async ngOnInit() {
  }

}

interface RUTA {
  name: string,
  route: string
}
