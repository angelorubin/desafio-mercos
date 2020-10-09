import React from "react";
import {
  Grid,
  Typography,
  InputBase,
  InputAdornment,
  IconButton,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import {
  FaWhatsapp,
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaTruck,
  FaTag,
  FaCreditCard,
} from "react-icons/fa";
import Logo from "assets/images/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
  },
  logo: {
    height: 35,
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

    [theme.breakpoints.down(750)]: {
      minWidth: 200,
    },
  },
  searchIcon: {
    fontSize: 14,
  },
  infobarContainer: {
    minHeight: 60,
    backgroundColor: theme.palette.grey[200],
    margin: "10px 0 0 0",
    padding: "10px 0 10px 0",
    borderTop: `2px solid ${theme.palette.grey[300]}`,
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
  itemsContainer: {
    marginRight: 70,
  },
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
}));

const Navbar = ({ total }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(800));

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item container direction="column" xs={9}>
        <Grid
          item
          container
          direction={matches ? "column" : "row"}
          alignItems={matches ? "center" : "center"}
          className={classes.firstSection}
          spacing={1}
        >
          <Grid
            item
            container
            xs={12}
            sm
            justify={matches ? "center" : "flex-start"}
            spacing={1}
          >
            <Grid item>
              <FaWhatsapp className={classes.firstSectionIcon} />
            </Grid>
            <Grid item>
              <Typography className={classes.firstSectionText}>
                (47) 999-9999
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm
            alignItems={matches ? "center" : "flex-end"}
            direction={matches ? "column" : "row"}
            spacing={1}
          >
            <Grid
              item
              container
              xs={12}
              sm
              alignItems={matches ? "center" : "center"}
              justify={matches ? "center" : "flex-end"}
              spacing={1}
            >
              <Grid item>
                <FaUser className={classes.firstSectionIcon} />
              </Grid>
              <Grid item>
                <Typography className={classes.firstSectionText}>
                  Arethusa
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm
              alignItems={matches ? "center" : "center"}
              justify={matches ? "center" : "flex-end"}
              spacing={1}
            >
              <Grid item>
                <FaMapMarkerAlt style={{ verticalAlign: "middle" }} />
              </Grid>
              <Grid item>
                <Typography className={classes.firstSectionText}>
                  Bom Retiro - Joinville, SC
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justify="center"
          className={classes.secondSection}
          spacing={1}
        >
          <Grid item>
            <img src={Logo} alt="logo" className={classes.logo} />
          </Grid>
        </Grid>
        <Grid item container sm={12} spacing={1}>
          <Grid
            item
            container
            xs={12}
            sm
            direction="row"
            alignItems={matches ? "center" : "flex-start"}
            justify={matches ? "center" : "flex-start"}
            spacing={1}
            className={classes.thirdSection}
          >
            <Grid item>
              <FaBars className={classes.thirdSectionIcons} />
            </Grid>
            <Grid item>
              <Typography className={classes.thirdSectionText}>
                SETORES
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.thirdSectionText}>
                OFERTAS
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justify="center"
            xs={12}
            sm
            spacing={1}
          >
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <InputBase
                    className={classes.searchInput}
                    placeholder="O que você procura?"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          className={classes.searchIcon}
                          aria-label="search"
                        >
                          <FaSearch />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm
            justify={matches ? "center" : "flex-end"}
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <FaShoppingCart className={classes.thirdSectionCartIcon} />
            </Grid>
            <Grid item>
              <Typography className={classes.thirdSectionText}>
                R$ {total}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        justify="center"
        className={classes.infobarContainer}
      >
        <Grid
          item
          container
          xs={9}
          sm={9}
          direction={matches ? "column" : "row"}
          alignItems={matches ? "center" : "center"}
          spacing={2}
        >
          <Grid
            item
            container
            xs
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <FaTruck className={classes.infobarIcons} />
            </Grid>
            <Grid>
              <Typography className={classes.infobarText}>
                Delivery apenas para Joinville
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <FaTag className={classes.infobarIcons} />
            </Grid>
            <Grid item>
              <Typography className={classes.infobarText}>
                Desconto de 10% acima das compras de R$ 200,00
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <FaCreditCard className={classes.infobarIcons} />
            </Grid>
            <Grid item>
              <Typography className={classes.infobarText}>
                Pague em até 12x no cartão
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Navbar;
