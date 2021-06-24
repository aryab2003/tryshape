import React, { useRef } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";


const CircleVertice = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px;
  padding: 0px;
  clip-path: circle(50% at 50% 50%);
  background-color: black;
  position: absolute;
`;

const DraggableVertice = (props) => {
    let x = parseFloat(props.x) * 280.0 / 100.0;
    let y = parseFloat(props.y) * 280.0 / 100.0; 

    const show = props.focusNumber === props.number;
    const target = useRef(null);

    function handleDrag(e, data) {
        props.handleChange(e, data, props.number);
    }

    function handleDelete(e) {
        props.handleChange(e, null, props.number);
        props.setFocusNumber(-1);
    }

    return(
        <>
            <Draggable 
                bounds="parent" 
                handle=".handle" 
                position={{x: x, y: y}} 
                grid={[2.8, 2.8]} 
                onDrag={(e, data) => {handleDrag(e, data); props.setFocusNumber(-1)}}>
                    <CircleVertice 
                        className="handle" 
                        onClick={() => {
                            if (show === false) {
                                props.setFocusNumber(props.number);
                            } else {
                                props.setFocusNumber(-1);
                            }
                        }} 
                        ref={target} />
            </Draggable>

            <Overlay target={target.current} show={show} placement="right">
                <Tooltip>
                    <p id={"deleteButton" + props.number} onMouseUp={handleDelete}>X</p>
                </Tooltip>
            </Overlay>
        </>
    );
    
}

export default DraggableVertice;