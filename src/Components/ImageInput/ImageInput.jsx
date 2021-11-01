import { Button, Input, InputLabel, FormHelperText } from "@material-ui/core";
import { ReactComponent as Upload } from "../../assets/upload.svg";
import { ReactComponent as Tick } from "../../assets/Vector.svg";
import { useStyles } from "./styles";

export default function ImageInput({
  inputType,
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
        inputProps={inputType === 'AUDIO' ?{ accept: 'audio/mpeg, audio/mp3' }:{ accept: 'image/png, image/jpeg, image/jpg, image/gif' }}
        
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
