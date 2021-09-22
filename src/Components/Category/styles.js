import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 40,
    borderRadius: 50,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  textField: { width: "70%", marginBottom: 20 },
  formControl: {
    marginBottom: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));
export { useStyles };
