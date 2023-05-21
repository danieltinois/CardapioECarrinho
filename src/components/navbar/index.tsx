import React, { useState, useEffect } from "react";
import { ImCart } from "react-icons/im";
import { GiFullPizza } from "react-icons/gi";
import { ListaPedidosModel } from "../../models/lista.pedidos.model";

import styles from "./navbar.module.scss";
// import DataTable from "react-data-table-component";

type NavbarProps = {
  listaCarrinhoProps: ListaPedidosModel[];
};

const Navbar = ({ listaCarrinhoProps }: NavbarProps) => {
  const [listaCarrinho, setListaCarrinho] = useState<ListaPedidosModel[]>([]);
  const [valorTotalCompra, setValorTotalCompra] = useState<number>(0);
  const [listaCarrinhoSeparada, setListaCarrinhoSeparada] = useState<
    ListaPedidosModel[]
  >([]);

  useEffect(() => {
    const listaSemRepeticao = listaCarrinhoProps.filter((item, index) => {
      return listaCarrinhoProps.indexOf(item) === index;
    });

    if (listaCarrinhoProps!) {
      calculaTotal(listaCarrinhoProps);
    }

    setListaCarrinhoSeparada(listaSemRepeticao);
    setListaCarrinho(listaCarrinhoProps);
  }, [listaCarrinhoProps]);

  const calculaTotal = (listagem: ListaPedidosModel[]) => {
    let valorTotal: number = 0;

    listagem.forEach((lista) => {
      valorTotal += lista?.preco!;
    });
    setValorTotalCompra(valorTotal);
  };

  return (
    <div className={styles.container}>
      <nav className={`navbar ${styles.backgroundNavBar}`}>
        <div className="container-fluid">
          <div className="navbar-brand">
            <GiFullPizza
              size={80}
              className={styles.imgIconPizza}
              color="#f3dfa0"
            />
            <span className={styles.tituloNavBar}>Pizza land!</span>
          </div>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className={styles.btnCarrinhoDeCompras}
            data-bs-toggle="modal"
            data-bs-target="#carrinhoDeCompras"
          >
            <ImCart className={styles.iconCarrinho} size={35} />{" "}
            <span className={styles.tituloCarrinho}>Seu carrinho</span>
            <button className={styles.buttonQuantidadeCarrinho}>
              {listaCarrinho! && `${listaCarrinho.length}`}
            </button>
          </button>

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="carrinhoDeCompras"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg ">
              <div
                className="modal-content "
                style={{ backgroundColor: "#20170e" }}
              >
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#20170e", height: "40px" }}
                >
                  <h1
                    className="modal-title fs-5"
                    style={{ color: "#f3dfa0" }}
                    id="exampleModalLabel"
                  >
                    Carrinho
                  </h1>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  className="modal-body "
                  style={{ backgroundColor: "#f3dfa0" }}
                >
                  <div
                    className="table-responsive-sm "
                    style={{ backgroundColor: "#f3dfa0" }}
                  >
                    <div
                      className="table-responsive-sm "
                      style={{ backgroundColor: "#f3dfa0" }}
                    >
                      <table
                        className="table table-striped "
                        style={{ backgroundColor: "#f3dfa0" }}
                      >
                        <thead
                          className="table-light "
                          style={{ backgroundColor: "#f3dfa0" }}
                        >
                          <tr
                            className="table-warning"
                            style={{ backgroundColor: "#f3dfa0" }}
                          >
                            <th>Produto</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaCarrinhoSeparada?.length! > 0 &&
                            listaCarrinhoSeparada?.map((item, index) => (
                              <>
                                <tr key={index}>
                                  <td className="align-middle">
                                    {item.produto}
                                  </td>
                                  <td className="align-middle">
                                    {`${
                                      item?.preco! &&
                                      parseFloat(
                                        item?.preco?.toFixed(2)
                                      ).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })
                                    }`}
                                  </td>
                                  <td className="align-middle">
                                    {listaCarrinho! &&
                                      listaCarrinho?.filter(
                                        (lista) => lista.id === item.id
                                      ).length}
                                  </td>
                                  <td className="align-middle">
                                    {listaCarrinho! &&
                                      parseFloat(
                                        (
                                          listaCarrinho?.filter(
                                            (lista) => lista.id === item.id
                                          ).length * item?.preco!
                                        ).toFixed(2)
                                      ).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td></td>
                            <td></td>
                            <td>TOTAL:</td>
                            <td>
                              {parseFloat(
                                valorTotalCompra.toFixed(2)
                              ).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className={`btn ${styles.btnFecharPedido}`}
                    style={{ color: "black" }}
                    data-bs-dismiss="modal"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    className={`btn ${styles.btnFazerPedido}`}
                  >
                    Fazer pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Modal --> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
