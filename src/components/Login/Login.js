import React, {
  useState,
  useEffect,  
  useRef,
} from "react";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';

import OutboxIcon from "@mui/icons-material/Outbox";

import classes from "./Login.module.css";
import warning from "./warning.svg";

import Card from "../UI/Card/Card";
// import upload from './upload.svg';

import RadioButton from "../UI/RadioButton/RadioButton";
// import useInput from "../../hooks/use-inputs";
import { useDispatch, useSelector } from "react-redux";
import { formActions, spaceActions, urlActions } from "../../store/space-slice";
import RadioCard from "../UI/RadioCard/RadioCard";

const isNotEmpty = (value) => value.trim() !== "";

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const dispatch = useDispatch();
  

  const spaceValue = useSelector(state => state.space.inputValue);
  const spaceIsValid = useSelector(state => state.space.isValid);
  const spaceError = useSelector(state => state.space.hasError);
  
  const urlValue = useSelector(state => state.url.inputValue);
  const urlIsValid = useSelector(state => state.url.isValid);
  const urlError = useSelector(state => state.url.hasError);
  
  const imageSpace = useSelector((state) => state.form.image);
  const peopleNumber = useSelector((state) => state.form.people);  
  const privacy = useSelector((state) => state.form.privacy);  

  const [selectedValue, setSelectedValue] = useState("#39B0FF");

  const uploadInputRef = useRef(null);

  const controlProps = (item) => ({
    color: item,
    fontSize: 28,
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button",
    inputProps: { "aria-label": item },
  });

  const controlCardPro = (item) => ({
    color: item,
    // fontSize: 60,
    checked: privacy === item,
    onChange: handlePrivacyChange,
    value: item,
    name: "color-radio-button",
    inputProps: { "aria-label": item },
  });

  useEffect(() => {
    console.log({formIsValid: {spaceIsValid, urlIsValid}});
    setFormIsValid(spaceIsValid && urlIsValid);
  }, [spaceIsValid, urlIsValid]);

  const spaceChangeHandler = event => {
      dispatch(spaceActions.valueChangeHandler(event.target.value));
  };

  const spaceBlurHandler = event => {
      dispatch(dispatch(spaceActions.inputBlurHandler()));
  };

  const urlChangeHandler = event => {
      dispatch(urlActions.valueChangeHandler(event.target.value));
  };

  const urlBlurHandler = event => {
      dispatch(dispatch(urlActions.inputBlurHandler()));
  };

  const reset = ()=> {
      dispatch(dispatch(spaceActions.reset()));
  };

  const peopleNumberHandler = (event, people) => {
    if (people !== null) {
      dispatch(formActions.onPeopleNumberHandler(people))      
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handlePrivacyChange = (event) => {    
    dispatch(formActions.onPrivacyChangeHandler(event.target.value))
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      dispatch(formActions.onImageChangeHandler(URL.createObjectURL(img)));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    console.log({result: {imageSpace, spaceValue, urlValue,peopleNumber, privacy, selectedValue}})
    // console.log({ s: spaceError, u: urlError });
    // resetSpace();
    // resetUrl();
    // dispatch(spaceActions.reset())
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <section className={classes.header}>
          <h1 className={classes.title}>Configuración</h1>
          <p className={classes.title}>Logo del espacio</p>

          <div className={classes["container-upload"]}>
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onImageChange}
            />
            {!imageSpace && (
              <div className={classes["container-logo"]}>
                <span className={classes.logo}>B</span>
              </div>
            )}
            {imageSpace && (
              <div className={classes["container-logo"]}>
                <img
                  alt="not fount"
                  width={"67px"}
                  height={"67px"}
                  src={imageSpace}
                />
              </div>
            )}
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<OutboxIcon />}
              onClick={() =>
                uploadInputRef.current && uploadInputRef.current.click()
              }
            >
              Subir logo
            </Button>
          </div>
        </section>

        <section className={classes.info}>
          <img src={warning} alt="logo" />
          <div className={classes.warning}>
            <p>Este logo identificará tu espacio entre el resto.</p>
            <p>
              Preferiblemente sube una imagen .png igual o superior a 65px a
              72ppp con fondo trasparente.
            </p>
          </div>
        </section>

        <div className={`${classes.control} ${spaceError ? classes.invalid : ""}`} >
          <label htmlFor="space">Nombre del espacio</label>
          <TextField
            id="space"
            type="text"
            placeholder="Ep: Mi espacio de trabajo"
            variant="outlined"
            fullWidth
            value={spaceValue}
            onChange={spaceChangeHandler}
            onBlur={spaceBlurHandler}
          />
        </div>
        <div
          className={`${classes.control} ${urlError ? classes.invalid : ""}`}
        >
          <label htmlFor="url">URL del espacio (direccion web)</label>
          <TextField
            type="text"
            id="url"
            variant="outlined"
            fullWidth
            placeholder="Ep: mi.dominio"
            value={urlValue}
            onChange={urlChangeHandler}
            onBlur={urlBlurHandler}
            
            InputProps={{
              endAdornment: 
              <InputAdornment position="end">
                .dofleine.com
              </InputAdornment>
            }}
          />
        </div>

        <section className={classes.info}>
          <img src={warning} alt="logo" />
          <div className={classes.warning}>
            <p>
              Puedes cambiar la URL de tu espacio (dirección web) en cualquier
              momento, pero por cortesía hacia tus compañeros de trabajo y otros
              usuarios de Plankton, porfavor no lo hagas muy seguido :)
            </p>
            <p>
              Nota: Si cambias la URL de tu espacio, Plankton automáticamente
              redireccionará desde la antigua dirección hacia la nueva. En
              cualquier caso, deberías asegurarte que tus compañeros sepan
              acerca del cambio porque la dirección anterior pasará a estar
              libre y puede ser usada por otro espacio en el futuro.
            </p>
          </div>
        </section>

        <section>
          <span>¿Cuántas personas trabajarán contigo, incluyéndote a ti?</span>
          <div className={classes.peopleNumber}>
            <ToggleButtonGroup color="primary" value={peopleNumber} exclusive onChange={peopleNumberHandler} fullWidth={false}>
              <ToggleButton
                style={{
                  outlineWidth: "1px",
                  outlineStyle: "solid",
                  margin: "2px",
                }}
                value="Sólo yo"
              >
                Sólo yo
              </ToggleButton>
              <ToggleButton
                style={{
                  outlineWidth: "1px",
                  outlineStyle: "solid",
                  margin: "2px",
                }}
                value="2-10"
              >
                2-10
              </ToggleButton>
              <ToggleButton
                style={{
                  outlineWidth: "1px",
                  outlineStyle: "solid",
                  margin: "2px",
                }}
                value="11-15"
              >
                11-15
              </ToggleButton>
              <ToggleButton
                style={{
                  outlineWidth: "1px",
                  outlineStyle: "solid",
                  margin: "2px",
                }}
                value="26-50"
              >
                26-50
              </ToggleButton>
              <ToggleButton
                style={{
                  outlineWidth: "1px",
                  outlineStyle: "solid",
                  margin: "2px",
                }}
                value="51-100"
              >
                51-100
              </ToggleButton>
              <ToggleButton
                style={{
                  outlineWidth: "1px",
                  outlineStyle: "solid",
                  margin: "2px",
                }}
                value="500+"
              >
                500+
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <section className={classes.info}>
            <img src={warning} alt="logo" />
            <div className={classes.warning}>
              <p>
                Preferiblemente sube una imagen .png igual o superior a 65px a
                72ppp con fondo transparente.
              </p>
            </div>
          </section>
        </section>

        <section className={classes.theme}>
          <h3>Color del tema</h3>
          <div className={classes.picker}>
            <RadioButton {...controlProps("#39B0FF")} />
            <RadioButton {...controlProps("#04B58B")} />
            <RadioButton {...controlProps("#3E9C4B")} />
            <RadioButton {...controlProps("#B6BC00")} />
            <RadioButton {...controlProps("#E59100")} />
            <RadioButton {...controlProps("#E55C00")} />
            <RadioButton {...controlProps("#EE1F50")} />
            <RadioButton {...controlProps("#D6198A")} />
            <RadioButton {...controlProps("#B321F1")} />
            <RadioButton {...controlProps("SketchPicker")} />
          </div>
        </section>

        <section className={classes.theme}>
          <h3>Privacidad del espacio</h3>
          <div className={classes.privacy}>
            <RadioCard
              {...controlCardPro("Privado")}
              description="El contenido será visible sólo para tí y los miembros de tu Organización."
            />
            <RadioCard
              {...controlCardPro("Público")}
              description="Cualquiera con el vínculo podrá ver la actividad de tu Organización"
            />
          </div>
        </section>
        <div className={classes.actions}>
          <Button
            disabled={!formIsValid}
            type="submit"
            variant="contained"
            size="large"
            sx={{
              fontSize: 14,
              height: 5,
              padding: 3.2,
              textTransform: "none",
              marginRight: 2,
            }}
          >
            Guardar cambios
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            size="large"
            sx={{
              fontSize: 14,
              height: 5,
              padding: 3.2,
              textTransform: "none",
              marginRight: 2,
            }}
          >
            Descartar
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
