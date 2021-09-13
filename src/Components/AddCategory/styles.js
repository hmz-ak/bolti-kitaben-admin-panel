import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 40,
    border: "1px solid black",
    padding: 70,
    borderRadius: 50,
  },
  textFieldStyle: {
    width: "70%",
    marginBottom: 20,
  },
}));
export { useStyles };
