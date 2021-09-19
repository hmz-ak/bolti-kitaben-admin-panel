import { Button, Input, InputLabel, FormHelperText } from "@material-ui/core";
import { ReactComponent as Upload } from "../../assets/upload.svg";
import { ReactComponent as Tick } from "../../assets/Vector.svg";
import { useStyles } from "./styles";

export default function ImageInput({
  nameAttr,
  idAttr,
  uploadText,
  getter,
  setter,
  helperText = "",
}) {
  const classes = useStyles();

  return (
    <>
      <Input
        required
        className={classes.input}
        id={idAttr}
        name={nameAttr}
        onChange={setter}
        type="file"
        inputProps={{
          accept: ".gif, .jpeg, .jpg, .png",
        }}
      />
      <InputLabel htmlFor={idAttr} required error={!getter}>
        <Button
          endIcon={getter ? <Tick /> : <Upload />}
          className={classes.uploadBtn}
          component="span"
        >
          {getter?.name ? getter?.name : `Upload ${uploadText}`}
        </Button>
      </InputLabel>
      {!getter ? (
        <FormHelperText className={classes.uploadBtn2} error>
          Please Upload {uploadText} {helperText ?? ""}
        </FormHelperText>
      ) : null}
    </>
  );
}
