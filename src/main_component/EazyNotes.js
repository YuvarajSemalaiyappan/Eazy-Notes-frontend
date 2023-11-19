import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import Navbar from "./Navbar";
import "./EazyNotes.css";

function EazyNotes() {
  const UserContextData = useContext(UserContext);

  // this.state = {
  //    dt : UserContextData.notes,
  //   disabled: [],
  // };

  const [dt, setDt] = useState(UserContextData.notes);


  // const dt = UserContextData.notes

  const onNotesChange =(str , i) => { 
    const data = [...UserContextData.notes]
    data[i] = str;
    setDt( data );
    UserContextData.setNotes(dt)
   }
   const onNotesDelete =(i) => { 
    const data = [...UserContextData.notes]
    data.splice(i,1);
    setDt( data );
    UserContextData.setNotes(dt)
   }
  //  const handleRef = (r, index) => {
    
  //   ref[index] = r

  //   setRef(ref)
  // }

  return (
    <main>
      <Navbar />

      {dt.map ((x, i) => (
        <section className="notes" key={i}>
        <textarea
          className="input"
          // ref={(newText) => handleRef(newText, i)}
          value={x}
          
          onChange={(e) => onNotesChange(e.target.value, i)}

        >

        </textarea>
        <button 
          onClick={()=>{onNotesDelete(i)}}
              className="btn btn-outline-danger m-2"
              
             
            >
              Delete
            </button>

       
      </section>
      ))}

     
    
    </main>
  );
}

export default EazyNotes;
