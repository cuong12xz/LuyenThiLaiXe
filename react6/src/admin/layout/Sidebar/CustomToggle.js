import React from "react";
import { useAccordionButton } from "react-bootstrap";

export const CustomToggle = ({ eventKey, children }) => {
  
  const decoratedOnClick = useAccordionButton(eventKey);
  function handleClick (e) {  
    e.preventDefault ();  
    console.log ( 'Bạn đã nhấp vào một Liên kết.' );  
}  

  return (
    <a class="dropdown-toggle" onClick={decoratedOnClick}>
      {children}
    </a>
  );
};
