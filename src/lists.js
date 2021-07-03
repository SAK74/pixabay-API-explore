import React from "react"

 export function  Lista(props) {
   return(
     <div>
       <h3>{props.title}</h3>
       <ul>
         {props.children}
         <br></br>
         {props.children}
       </ul>
       <footer>Sergiej & Co</footer>
     </div>
   )
}

export  const Gudzik = React.forwardRef((props, ref) => (
  <button ref={ref}>{props.name}</button>
)
);