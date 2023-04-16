import React, { useContext, useEffect } from "react";
import NoteContext from "./context/notes/NoteContext";
const About = () => {
  const a = useContext(NoteContext);
  
  return( 
  <div>
    This is About page
    </div>

  )
};

export default About;
