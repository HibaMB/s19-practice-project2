import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ ref, children, className = "" }) {
  const refDialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      refDialog.current.showModal();
    },
    close: () => {
      refDialog.current.close();
    },
  }));

  return createPortal(
    <dialog ref={refDialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

///we can show or hide modal dialog from outside using useImperativeHandle and forwardRef
//we create open and close methods that can be called from outside
//we pass ref from parent component to access these methods
//we use useRef to get reference to dialog element
//we use useImperativeHandle to expose open and close methods to parent component
//we call showModal and close methods of dialog element to show and hide modal
//this way we can control modal dialog from outside component
