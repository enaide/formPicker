import React from "react";
import { SketchPicker } from "react-color";
import Radio from "@mui/material/Radio";
import reactCSS from "reactcss";
import { useState, useEffect } from "react";

const RadioButton = (props) => {
  const [state, setState] = useState({ displayColorPicker: false, color: "#48b5fe"});
  const [activeColor, setActiveColor] = useState(false);
  const { name, fontSize, color, checked, onChange } = props;

  // useEffect(()=>{
  //   if(activeColor){
  //     console.log('update custom color');
  //   }
  //   if(checked){
  //     console.log('quit custom color');
  //     setActiveColor(false);
  //   }
  // }, [activeColor, checked])

  const styles = reactCSS({
    'default': {
      color: {
        top: '10px',
        left: '10px',
        position: 'inherit',
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        background: '#FFFF',
        color: '#00000'
      },
      swatch: {
        width: '46px',
        minWidth: '46px',
        height: '46px',        
        borderRadius: '50%',
        opacity: '1',
        display: "inline-block",
        background: state.color,
        position: 'relative',
        // top: '35px',
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
        right: '-20%',
        // left: '32%' ,
        top: '50%'       
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  const clickHandler = () => {    
    setState({ ...state, displayColorPicker: !state.displayColorPicker });
  };

  const changeHandler = (color) => {      
    const e = {      
        target: {
          value: color.hex
        }      
    }; 
    setState({ ...state, color: color.hex });      
    onChange(e);
    setActiveColor(true);
  };

  const closeHandler = () => {    
    setState({ ...state, displayColorPicker: false });        
  };
  
  // const swatch = <div style={ styles.color } />
  console.log({ac: checked});
  return color === "SketchPicker" ? (
    <React.Fragment>
      <div style={styles.swatch} onClick={clickHandler}>        
        {checked &&<div style={ styles.color } />}
      </div>
      {state.displayColorPicker ? (
        <div style={styles.popover}>
        <div style={styles.cover} onClick={closeHandler}>
        </div>
        <SketchPicker color={state.color} onChange={changeHandler} />
      </div>
      ) : null}
    </React.Fragment>
  ) : (
    <Radio
      name={name}
      value={color}
      checked={checked}
      onChange={onChange}
      sx={{
        color: color,
        background: color,
        "&.Mui-checked": {
          color: color, // #FCB900
          background: "#fff", // #9900EF
        },
        "& .MuiSvgIcon-root": {
          fontSize: fontSize,
        },
      }}
    />
  );
};

export default RadioButton;
