import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  uploadBtn: {
    textTransform: "none",
    borderBottom: "1px solid rgba(13, 36, 139, 0.75)",
    borderRadius: 0,
    color: "rgba(13, 36, 139, 0.75)",
    width: "73%",
    paddingLeft: 20,
    fontSize: 18,
    justifyContent: "space-between",
    [theme.breakpoints.down("xl")]: {
      marginLeft: 70,
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: 70,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    },
    paddingRight: 20,
    marginTop: 20,
  },
  uploadBtn2: {
    textTransform: "none",
    borderRadius: 0,
    color: "rgba(13, 36, 139, 0.75)",
    width: "73%",
    paddingLeft: 20,
    fontSize: 12,
    justifyContent: "space-between",
    [theme.breakpoints.down("xl")]: {
      marginLeft: 70,
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: 70,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    },
    paddingRight: 20,
  },
}));
export { useStyles };
