import React from "react";
import { useFormik } from "formik";
import {
  Grid,
  Button,
  Card,
  TextField,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { object, string } from "yup";
import { useLocation } from "react-router-dom";
import { postItems } from "services/checkout";
import Navbar from "pages/navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.white,
    minHeight: "100vh",
  },
  logo: {
    height: 40,
  },
  headerContainer: {
    color: theme.palette.blackDark,
    backgroundColor: theme.palette.white,
    fontFamily: "Roboto",
    fontWeight: "Regular",
    borderBottom: ` 1px solid ${theme.palette.grayMedium}`,
  },
  firstSection: {
    marginTop: 20,
    marginBottom: 15,
  },
  firstSectionIcon: {
    color: theme.palette.dark,
    verticalAlign: "middle",
  },
  firstSectionText: {
    color: theme.palette.dark,
    verticalAlign: "middle",
    fontSize: 12,
  },
  secondSection: {
    margin: "10px 0 10px 0",
  },
  thirdSection: {
    margin: "20px 0 20px 0",
  },
  thirdSectionIcons: {
    color: theme.palette.dark,
    verticalAlign: "middle",
  },
  thirdSectionText: {
    fontFamily: "Roboto, sans",
    fontSize: 14,
    letterSpacing: 0.1,
    fontWeight: "bold",
  },
  thirdSectionCartIcon: {
    color: theme.palette.red,
    verticalAlign: "middle",
    fontSize: 16,
  },
  searchInput: {
    minWidth: 200,
  },
  searchIcon: {
    fontSize: 14,
  },
  contentContainer: {
    minWidth: "100%",
    minHeight: "100vh",
    backgroundColor: theme.palette.common.white,
  },
  infobarContainer: {
    minHeight: 60,
    backgroundColor: theme.palette.grey[100],
  },
  infobarIcons: {
    fontSize: 15,
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
  checkoutContainer: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: "none",
    boxShadow: "none",
  },
  checkoutTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 32,
    letterSpacing: 1.5,
    color: theme.palette.dark,
    margin: "30px 0 30px 0",
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    color: theme.palette.grayLight,
  },
  formTitle: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.1,
    textTransform: "uppercase",
  },
  itemsContainer: {
    marginRight: 70,
  },
  addressContainer: {
    margin: "0 0 30px 0",
    boxShadow: "none",
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}));

const CheckoutSchema = object().shape({
  rua: string().required("campo obrigatório"),
  bairro: string().required("campo obrigatório"),
  numero: string().required("campo obrigatório"),
  numeroCartao: string().required("campo obrigatório"),
  cvc: string().required("campo obrigatório"),
});

const Checkout = () => {
  const classes = useStyles();
  const location = useLocation();
  const { total, itens } = location.state;

  const formik = useFormik({
    initialValues: {
      rua: "",
      bairro: "",
      numero: "",
      numeroCartao: "",
      cvc: "",
    },
    validationSchema: CheckoutSchema,
    onSubmit: (values, { resetForm }) => {
      const { rua, bairro, numero, numeroCartao, cvc } = values;

      const data = {
        itens,
        endereco: {
          rua,
          bairro,
          numero,
        },
        cartao: {
          numero: numeroCartao,
          cvc,
        },
      };

      postItems(data).then((response) => {
        console.log(response.data);
        resetForm();
      });
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
  } = formik;

  return (
    <div className={classes.root}>
      <Grid container direction="row">
        <Grid
          item
          container
          justify="center"
          className={classes.headerContainer}
        >
          <Navbar total={total} />
        </Grid>
        <Grid item className={classes.contentContainer}>
          <Grid container direction="column" alignItems="center">
            <Grid item container justify="center">
              <Grid item>
                <Typography className={classes.checkoutTitle}>
                  Checkout
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justify="center">
              {/* Checkout Form */}
              <Grid container justify="center">
                <Grid item xs={9} sm={9}>
                  <form onSubmit={handleSubmit}>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      spacing={2}
                    >
                      <Grid item xs>
                        <Card>
                          <CardHeader
                            title="Endereço"
                            disableTypography
                            className={classes.formTitle}
                          />
                          <Divider className={classes.divider} />
                          <CardContent>
                            <Grid container direction="column" spacing={1}>
                              <Grid item>
                                <TextField
                                  fullWidth
                                  label="Rua"
                                  id="rua"
                                  name="rua"
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.rua}
                                  helperText={errors.rua}
                                  error={
                                    touched.rua && errors.rua ? true : null
                                  }
                                />
                              </Grid>
                              <Grid item>
                                <TextField
                                  fullWidth
                                  label="Bairro"
                                  id="bairro"
                                  name="bairro"
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.bairro}
                                  helperText={errors.bairro}
                                  error={
                                    touched.bairro && errors.bairro
                                      ? true
                                      : null
                                  }
                                />
                              </Grid>
                              <Grid item>
                                <TextField
                                  fullWidth
                                  label="Número"
                                  id="numero"
                                  name="numero"
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.numero}
                                  helperText={errors.numero}
                                  error={
                                    touched.numero && errors.numero
                                      ? true
                                      : null
                                  }
                                />
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs>
                        <Card>
                          <CardHeader
                            title="Informações do cartão"
                            disableTypography
                            className={classes.formTitle}
                          />
                          <Divider className={classes.divider} />
                          <CardContent>
                            <Grid container direction="column" spacing={1}>
                              <Grid item>
                                <TextField
                                  fullWidth
                                  label="Número do cartão"
                                  id="numeroCartao"
                                  name="numeroCartao"
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.numeroCartao}
                                  helperText={errors.numeroCartao}
                                  error={
                                    touched.numeroCartao && errors.numeroCartao
                                      ? true
                                      : null
                                  }
                                />
                              </Grid>
                              <Grid item>
                                <TextField
                                  fullWidth
                                  label="CVC"
                                  id="cvc"
                                  name="cvc"
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.cvc}
                                  helperText={errors.cvc}
                                  error={
                                    touched.cvc && errors.cvc ? true : null
                                  }
                                />
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs>
                        <Button
                          type="submit"
                          fullWidth
                          className={classes.checkoutButton}
                        >
                          Finalizar o checkout
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
