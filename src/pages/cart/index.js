import React, { useState, useEffect } from "react";
import {
  TextareaAutosize,
  DialogContentText,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ListItem from "pages/cart/list-item";
import { formatTwoDecimalPlaces } from "utils";
import { useHistory } from "react-router-dom";
import { fetchDiscountPolicies } from "services/cart";
import { fetchItems } from "services/cart";
import Navbar from "pages/navbar";
import CustomDialog from "components/dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    minHeight: "100vh",
  },
  logo: {
    height: 35,
  },
  navbarContainer: {
    color: theme.palette.black,
    fontFamily: "Roboto",
    fontWeight: "Regular",
    borderBottom: ` 1px solid ${theme.palette.grey[300]}`,
  },
  contentContainer: {
    minWidth: "100%",
    minHeight: "100vh",
  },
  firstSection: {
    marginTop: 20,
    marginBottom: 15,
  },
  firstSectionIcon: {
    fontSize: 12,
    color: theme.palette.common.black,
    verticalAlign: "middle",
  },
  firstSectionText: {
    fontFamily: "Roboto, Sans-Serif",
    fontWeight: "500",
    fontSize: 12,
    color: theme.palette.dark,
    verticalAlign: "middle",
  },
  secondSection: {
    margin: "10px 0 10px 0",
  },
  thirdSection: {
    margin: "20px 0 20px 0",
  },
  thirdSectionIcons: {
    color: theme.palette.common.black,
    verticalAlign: "middle",
  },
  thirdSectionText: {
    fontFamily: "Roboto, Sans-Serif",
    fontSize: 14,
    letterSpacing: 0.1,
    fontWeight: "bold",
  },
  thirdSectionCartIcon: {
    color: theme.palette.error.main,
    verticalAlign: "middle",
    fontWeight: 500,
    fontSize: 16,
  },
  searchInput: {
    borderBottom: `1px solid ${theme.palette.common.black}`,
    fontSize: 14,
    minWidth: 300,

    [theme.breakpoints.down(800)]: {
      minWidth: 200,
    },
  },
  searchIcon: {
    fontSize: 14,
  },
  infobarContainer: {
    minHeight: 60,
    backgroundColor: theme.palette.grey[100],
  },
  infobarIcons: {
    color: theme.palette.grey[700],
    fontSize: 16,
    verticalAlign: "middle",
  },
  infobarText: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 500,
    fontSize: 12,
  },
  cartTitleContainer: {
    backgroundColor: theme.palette.grayUltraLight,
  },
  cartTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 32,
    letterSpacing: 1.5,
    color: theme.palette.dark,
    margin: "30px 0 30px 0",
    fontWeight: "bold",
  },
  checkoutButton: {
    minHeight: 50,
    border: "none",
    fontFamily: "Roboto, sans-serif",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "none",
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.dark,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  resumoPedidoContainer: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: "none",
    boxShadow: "none",
    height: 300,
    margin: "0 0 0 70px",
    [theme.breakpoints.down(800)]: {
      margin: "0 0 30px 0",
      maxHeight: 300,
    },
  },
  resumoPedidoHeader: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.1,
    textTransform: "uppercase",
  },
  resumoPedidoTotal: {
    fontFamily: "Roboto, Sans-Serif",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemsContainer: {},
  note: {
    width: "100%",
  },
  dialogCancelButton: {
    minHeight: 50,
    border: "none",
    fontFamily: "Roboto, sans-serif",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "none",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.dark,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  dialogAddButton: {
    minHeight: 50,
    border: "none",
    fontFamily: "Roboto, sans-serif",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "none",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  appbar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  addButton: {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.success.contrastText,
    textTransform: "none",
  },
  deleteButton: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
    textTransform: "none",
  },
  cancelButton: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
    textTransform: "none",
  },
  addNoteTextarea: {
    width: "100%",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(800));

  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [valorMinimo, setValorMinimo] = useState(0);
  const [quantidadeItensMinima, setQuantidadeItensMinima] = useState(0);

  const [openAddNote, setOpenAddNote] = useState(false);
  const [addNoteId, setAddNoteId] = useState(0);
  const [addNoteTextarea, setAddNoteTextarea] = useState("");

  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(0);

  const [itens, setItens] = useState(0);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [descontos, setDescontos] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Buscabdo todos os itens do carrinho na API
    fetchItems().then((itens) => {
      return setItensCarrinho(itens.data);
    });

    // Buscando as politicas de desconto na API
    fetchDiscountPolicies().then((policies) => {
      return policies.data.map((policies) => {
        if (policies.tipo === "valor_minimo") {
          return setValorMinimo(policies.valor);
        }

        if (policies.tipo === "quantidade_itens_minima") {
          return setQuantidadeItensMinima(policies.valor);
        }
        return null;
      });
    });
  }, []);

  useEffect(() => {
    setTotalProdutos(productCalculator(itensCarrinho));
    setItens(itemCounter(itensCarrinho));
  }, [itensCarrinho]);

  useEffect(() => {
    calculadorDescontos();
  });

  useEffect(() => {
    calculadorTotal();
  });

  const handleClickCheckout = () => {
    history.push("checkout", {
      itens: itensCarrinho,
      total,
    });
  };

  const itemCounter = (filteredItems) => {
    return filteredItems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantidade,
      0
    );
  };

  const productCalculator = (filteredItems) => {
    const totalProdutos = filteredItems.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.valor_unitario * currentValue.quantidade,
      0
    );
    return formatTwoDecimalPlaces(totalProdutos);
  };

  const calculadorDescontos = () => {
    if (
      Number(totalProdutos) >= valorMinimo &&
      itens >= quantidadeItensMinima
    ) {
      setDescontos(formatTwoDecimalPlaces((30 / 100) * Number(totalProdutos)));
    }

    if (Number(totalProdutos) >= valorMinimo && itens < quantidadeItensMinima) {
      setDescontos(formatTwoDecimalPlaces((10 / 100) * Number(totalProdutos)));
    }

    if (itens >= quantidadeItensMinima && Number(totalProdutos) < valorMinimo) {
      setDescontos(formatTwoDecimalPlaces((20 / 100) * Number(totalProdutos)));
    }

    if (Number(totalProdutos) < valorMinimo && itens < quantidadeItensMinima) {
      setDescontos(formatTwoDecimalPlaces(0));
    }
  };

  const calculadorTotal = () => {
    if (
      Number(totalProdutos) >= valorMinimo &&
      itens >= quantidadeItensMinima
    ) {
      setTotal(
        formatTwoDecimalPlaces(
          Number(totalProdutos) - (30 / 100) * Number(totalProdutos)
        )
      );
    }

    if (Number(totalProdutos) >= valorMinimo && itens < quantidadeItensMinima) {
      setTotal(
        formatTwoDecimalPlaces(
          Number(totalProdutos) - (10 / 100) * Number(totalProdutos)
        )
      );
    }

    if (itens >= quantidadeItensMinima && Number(totalProdutos) < valorMinimo) {
      setTotal(
        formatTwoDecimalPlaces(
          Number(totalProdutos) - (20 / 100) * Number(totalProdutos)
        )
      );
    }

    if (Number(totalProdutos) < valorMinimo && itens < quantidadeItensMinima) {
      setTotal(formatTwoDecimalPlaces(Number(totalProdutos)));
    }
  };

  const handleClickQuantityButton = (e) => {
    const id = Number(e.currentTarget.id);
    const name = e.currentTarget.name;

    const filtered = itensCarrinho.map((item) => {
      if (item.id === id && name === "minus" && item.quantidade > 0) {
        item.quantidade = --item.quantidade;
      }
      if (item.id === id && name === "plus") {
        item.quantidade = ++item.quantidade;
      }
      return item;
    });

    setItensCarrinho(filtered);
    setItens(itemCounter(filtered));
    setTotalProdutos(productCalculator(filtered));

    calculadorDescontos();
    calculadorTotal();
  };

  /**
   * Manipula o evento click do botão "adicionar observação"
   * da listagem de itens
   */
  const handleClickAddNote = (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    setOpenAddNote(!openAddNote);
    setAddNoteId(id);
  };

  /**
   * Manipula o evento click do botão "adicionar"
   * da caixa de dialogo
   */
  const handleClickAddNoteDialog = (e) => {
    const name = e.currentTarget.name;
    if (name === "cancel") {
      setOpenAddNote(!openAddNote);
    }
    if (name === "add") {
      itensCarrinho.map((item) =>
        item.id === Number(addNoteId)
          ? (item.observacao = addNoteTextarea)
          : null
      );
      setOpenAddNote(!openAddNote);
    }
  };

  const handleCloseAddNoteDialog = () => {
    setOpenAddNote(!openAddNote);
  };

  const handleChangeTextareaDialog = (e) => {
    setAddNoteTextarea(e.currentTarget.value);
  };

  /**
   * Manipula o evento click do ícone "deletar"
   * da listagem de itens
   */
  const handleClickDeleteItem = (e) => {
    const id = Number(e.currentTarget.id);
    setDeleteItemId(id);
    setOpenDeleteItem(!openDeleteItem);
  };

  const handleClickDeleteItemDialog = (e) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const id = deleteItemId;

    if (name === "del") {
      const filtered = itensCarrinho.filter((item) => item.id !== id);
      setItensCarrinho(filtered);
      setItens(itemCounter(filtered));
      setTotalProdutos(productCalculator(filtered));
      calculadorDescontos();
      setOpenDeleteItem(!openDeleteItem);
    }

    if (name === "cancel") {
      setOpenDeleteItem(!openDeleteItem);
    }
  };

  const handleCloseDeleteItemDialog = () => {
    setOpenDeleteItem(!openDeleteItem);
  };

  return (
    <div className={classes.root}>
      {/* Caixa de Dialogo para Adicionar Item no Carrinho */}
      <CustomDialog
        fullWidth
        openDialog={openAddNote}
        closeDialog={handleCloseAddNoteDialog}
        title="Observação"
      >
        <DialogTitle id="dialog-title">Observação</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            rowsMin={3}
            defaultValue={addNoteTextarea}
            onChange={handleChangeTextareaDialog}
            placeholder="coloque sua observação aqui"
            className={classes.addNoteTextarea}
          />
        </DialogContent>
        <DialogActions>
          <Button
            name="add"
            onClick={handleClickAddNoteDialog}
            className={classes.addButton}
          >
            Adicionar
          </Button>
          <Button
            name="cancel"
            onClick={handleClickAddNoteDialog}
            className={classes.cancelButton}
          >
            Cancelar
          </Button>
        </DialogActions>
      </CustomDialog>

      {/* Caixa de Dialogo para Remover Item do Carrinho */}
      <CustomDialog
        fullWidth
        openDialog={openDeleteItem}
        closeDialog={handleCloseDeleteItemDialog}
        title="Exclusão"
      >
        <DialogTitle id="dialog-title">Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.deleteItemText}>
            Deseja mesmo excluir este item do carrinho?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            name="del"
            onClick={handleClickDeleteItemDialog}
            className={classes.deleteButton}
          >
            Excluir
          </Button>
          <Button
            name="cancel"
            onClick={handleClickDeleteItemDialog}
            className={classes.addButton}
          >
            Cancelar
          </Button>
        </DialogActions>
      </CustomDialog>

      <Grid container direction="column">
        <Grid
          item
          container
          justify="center"
          className={classes.navbarContainer}
        >
          <Navbar total={total} />
        </Grid>
        <Grid item className={classes.contentContainer}>
          <Grid container direction="column" alignItems="center">
            <Grid item container justify="center">
              <Grid item>
                <Typography className={classes.cartTitle}>Carrinho</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={9}
              sm={9}
              direction={matches ? "column-reverse" : "row"}
              alignItems={matches ? "center" : "flex-start"}
              spacing={1}
            >
              <Grid item container xs sm>
                {itensCarrinho.length > 0 ? (
                  itensCarrinho.map((item) => {
                    return (
                      <ListItem
                        key={item.id}
                        {...item}
                        onClick={{
                          handleClickQuantityButton,
                          handleClickAddNote,
                          handleClickDeleteItem,
                        }}
                      />
                    );
                  })
                ) : (
                  <h3>Nenhum item no carrinho</h3>
                )}
              </Grid>
              <Grid item container xs sm>
                <Card className={classes.resumoPedidoContainer}>
                  <CardHeader
                    title="Resumo do Pedido"
                    disableTypography
                    className={classes.resumoPedidoHeader}
                  />
                  <Divider />
                  <CardContent>
                    <Grid container justify="center" spacing={2}>
                      <Grid item container justify="space-between">
                        <Grid item>Itens</Grid>
                        <Grid item>{itens}</Grid>
                      </Grid>
                      <Grid item container justify="space-between">
                        <Grid item>Total em produtos</Grid>
                        <Grid item>R$ {totalProdutos}</Grid>
                      </Grid>
                      <Grid item container justify="space-between">
                        <Grid item>Descontos</Grid>
                        <Grid item>R$ {descontos}</Grid>
                      </Grid>
                      <Grid item container justify="space-between">
                        <Grid item className={classes.resumoPedidoTotal}>
                          Total
                        </Grid>
                        <Grid item className={classes.resumoPedidoTotal}>
                          R$ {total}
                        </Grid>
                      </Grid>
                      <Grid item xs>
                        <Button
                          fullWidth
                          onClick={handleClickCheckout}
                          className={classes.checkoutButton}
                        >
                          Finalizar a compra
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;

/**
  <Dialog
    open={dialogDeleteItem}
    fullWidth
    maxWidth={"xs"}
    onClose={handleClickDeleteItem}
  >
    <DialogTitle>Deletar</DialogTitle>
    <DialogActions>
      <Grid container>
        <Grid item container justify="flex-end" xs spacing={2}>
          <Grid item>
            <Button
              id="remove"
              className={""}
              onClick={handleClickDialogDeleteItem}
            >
              Remover
            </Button>
          </Grid>
          <Grid item>
            <Button
              id="cancel"
              className={""}
              onClick={handleClickDialogDeleteItem}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DialogActions>
  </Dialog>
  <Dialog open={open} fullWidth maxWidth={"xs"} onClose={handleCloseDialog}>
    <DialogTitle>Observação</DialogTitle>
    <DialogContent>
      <TextareaAutosize
        rowsMin={10}
        className={classes.note}
        onBlur={handleChangeDialogTextarea}
        placeholder="digite a observação aqui"
      />
    </DialogContent>
    <DialogActions>
      <Grid container>
        <Grid item container justify="flex-end" xs spacing={2}>
          <Grid item>
            <Button
              className={classes.dialogAddButton}
              onClick={handleAddNote}
            >
              Adicionar
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.dialogCancelButton}
              onClick={handleCloseDialog}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DialogActions>
  </Dialog>


  const handleCloseDialog = () => {
    // setOpen(!open);
  };

  const handleAddNote = (e) => {
    e.preventDefault();

    itensCarrinho.map((item, index, array) =>
      item.id === Number(itemId) ? (item.observacao = note) : null
    );

    // return setOpen(!open);
  };

  const handleClickDialog = (e) => {
    e.preventDefault();
    // setOpen(!open);
    setItemId(e.currentTarget.id);
  };
  */
