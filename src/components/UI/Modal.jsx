import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  const refDialog = useRef();

  useEffect(() => {
    const modal = refDialog.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={refDialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

//we can show or hide modal dialog using open prop
//we use useRef to get reference to dialog element
//we use useEffect to watch for changes in open prop
//when open changes, we call showModal or close methods of dialog element
//this way we can control modal dialog visibility using open prop
