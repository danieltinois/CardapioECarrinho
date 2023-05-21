import React, { useState } from "react";
import Navbar from "./components/navbar";
import Cardapio from "./components/cardapio";

import "./app.module.scss";
import { ListaPedidosModel } from "./models/lista.pedidos.model";

function App() {
  const [listaCarrinho, setListaCarrinho] = useState<ListaPedidosModel[]>([]);

  const onGetListaCarrinho = (lista: ListaPedidosModel[]) => {
    setListaCarrinho(lista);
  };

  return (
    <>
      <Navbar listaCarrinhoProps={listaCarrinho} />
      <Cardapio onGetListaCarrinho={onGetListaCarrinho} />
    </>
  );
}

export default App;
