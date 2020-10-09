import React from "react";
import {
  Grid,
  ButtonBase,
  Typography,
  Button,
  ButtonGroup,
  makeStyles,
  Link,
} from "@material-ui/core";
import { FaTrash, FaRegCommentAlt } from "react-icons/fa";
import { formatTwoDecimalPlaces } from "utils";
// import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    padding: "10px 0 15px 0",
  },
  itemImage: {},
  itemName: {
    fontFamily: "Roboto, Sans-Serif",
    fontSize: 14,
    textTransform: "lowercase",
    "&::first-letter": {
      textTransform: "uppercase",
    },
  },
  itemSku: { fontFamily: "Roboto, Sans-Serif", fontSize: 12 },
  itemValue: {
    fontFamily: "Roboto, Sans-Serif",
    fontWeight: 500,
    fontSize: 14,
  },
  itemIcon: {
    color: theme.palette.error.main,
    verticalAlign: "middle",
  },
  itemAdd: {
    fontFamily: "Roboto, Sans-Serif",
    fontSize: 12,
    fontWeight: 500,
    color: theme.palette.error.main,
  },
  buttonPlus: {
    color: theme.palette.error.main,
    fontSize: 18,
  },
  buttonMinus: {
    color: theme.palette.common.black,
    fontSize: 18,
  },
}));

const ListItem = (props) => {
  const classes = useStyles();

  const {
    id,
    nome,
    quantidade,
    sku,
    url_imagem,
    valor_unitario,
    onClick,
  } = props;

  const {
    handleClickQuantityButton,
    handleClickAddNote,
    handleClickDeleteItem,
  } = onClick;

  return (
    <Grid item container alignItems="center" className={classes.root}>
      <Grid item container xs={2} justify="center">
        <Grid item>
          <img src={url_imagem} width="60" alt={nome} />
        </Grid>
      </Grid>
      <Grid item container xs={10} spacing={1}>
        <Grid item container alignItems="center">
          <Grid item container xs>
            <Typography className={classes.itemName}>{nome} - Marca</Typography>
          </Grid>
          <Grid item container xs justify="flex-end">
            <Grid item>
              <ButtonGroup
                size="small"
                aria-label="outlined primary button group"
              >
                <Button
                  id={id}
                  name="minus"
                  className={classes.buttonMinus}
                  onClick={handleClickQuantityButton}
                >
                  -
                </Button>
                <Button>{quantidade}</Button>
                <Button
                  id={id}
                  name="plus"
                  className={classes.buttonPlus}
                  onClick={handleClickQuantityButton}
                >
                  +
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid item container xs justify="flex-end">
            <Grid item className={classes.itemValue}>
              R$ {formatTwoDecimalPlaces(valor_unitario)}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justify="space-between">
          <Grid item>
            <Typography className={classes.itemSku}>SKU - {sku}</Typography>
          </Grid>
        </Grid>
        <Grid item container justify="space-between">
          <Grid item container xs spacing={1}>
            <Grid item>
              <FaRegCommentAlt className={classes.itemIcon} />
            </Grid>
            <Grid item>
              <Link
                href="#"
                className={classes.itemAdd}
                onClick={handleClickAddNote}
                id={id}
              >
                Adicionar observação
              </Link>
            </Grid>
          </Grid>
          <Grid item>
            <ButtonBase id={id} onClick={handleClickDeleteItem}>
              <FaTrash className={classes.itemIcon} />
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListItem;
