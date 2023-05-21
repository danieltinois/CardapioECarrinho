import React, { useState } from "react";

import styles from "./cardapio.module.scss";
import { ListaPedidosModel } from "../../models/lista.pedidos.model";
import pizzaExibi from "../../assets/imgPizza/pizzaExibi.jpg";

type CardapioProps = {
  onGetListaCarrinho: (lista: ListaPedidosModel[]) => void;
};

const Cardapio = ({ onGetListaCarrinho }: CardapioProps) => {
  const [listaCarrinho, setListaCarrinho] = useState<ListaPedidosModel[]>([]);
  const [listaDeProdutos, setListaDeProdutos] = useState<ListaPedidosModel[]>([
    {
      imagem: pizzaExibi,
      id: 1,
      produto: "- Pizza de Portuguesa",
      descricao:
        "Descrição da pizza: Ipsum dolor sit amet consectetur, adipisicing elit. Sequi eaque excepturi rerum earum inventore exercitationemullam, ipsum deserunt numquam voluptatibus nemo!",
      preco: 59.99,
    },
    {
      imagem: pizzaExibi,
      id: 2,
      produto: "- Pizza de Atum",
      descricao:
        "Descrição da pizza: Ipsum dolor sit amet consectetur, adipisicing elit. Sequi eaque excepturi rerum earum inventore exercitationemullam, ipsum deserunt numquam voluptatibus nemo!",
      preco: 85.99,
    },
    {
      imagem: pizzaExibi,
      id: 3,
      produto: "- Pizza de Frango",
      descricao:
        "Descrição da pizza: Ipsum dolor sit amet consectetur, adipisicing elit. Sequi eaque excepturi rerum earum inventore exercitationemullam, ipsum deserunt numquam voluptatibus nemo!",
      preco: 59.99,
    },
    {
      imagem: pizzaExibi,
      id: 4,
      produto: "- Pizza de Carne seca",
      descricao:
        "Descrição da pizza: Ipsum dolor sit amet consectetur, adipisicing elit. Sequi eaque excepturi rerum earum inventore exercitationemullam, ipsum deserunt numquam voluptatibus nemo!",
      preco: 36.99,
    },
  ]);

  const handleAdicionarAoCarrinho = (item: ListaPedidosModel) => {
    let listaCarrinhoAtual: ListaPedidosModel[] = [...listaCarrinho];
    listaCarrinhoAtual.push(item);

    setListaCarrinho(listaCarrinhoAtual);
    onGetListaCarrinho(listaCarrinhoAtual);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.tituloCardapio}>Cardapio</h1>
      <ul className={styles.listaDeProdutosUl}>
        {listaDeProdutos.map((produtos, index) => (
          <li
            className={styles.listaDeProdutosLi}
            value={produtos.id}
            key={index}
          >
            <h3 className={styles.produtoNome}>{produtos.produto}</h3>
            <div className={styles.divLista}>
              <img
                className={styles.imgPizza}
                src={produtos.imagem}
                alt={produtos.produto}
              />
              <div>
                <p className={styles.produtoDescricao}>{produtos.descricao}</p>
                <div className={styles.divPrecoBtn}>
                  <p className={styles.produtoPreco}>
                    {`${
                      produtos?.preco! &&
                      parseFloat(produtos?.preco?.toFixed(2)).toLocaleString(
                        "pt-BR",
                        { style: "currency", currency: "BRL" }
                      )
                    }`}
                  </p>
                  <button
                    className={styles.btnAdd}
                    onClick={() => handleAdicionarAoCarrinho(produtos)}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cardapio;
