import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  
  const notesInitial = [
    {
      "_id": "63fd81213f3fe8dcdceeff15",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:49.726Z",
      "__v": 0
    },
    {
      "_id": "63fd81223f3fe8dcdceeff17",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:50.112Z",
      "__v": 0
    },
    {
      "_id": "63fd81213f3fe8dcdceeff15",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:49.726Z",
      "__v": 0
    },
    {
      "_id": "63fd81223f3fe8dcdceeff17",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:50.112Z",
      "__v": 0
    },
    {
      "_id": "63fd81213f3fe8dcdceeff15",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:49.726Z",
      "__v": 0
    },
    {
      "_id": "63fd81223f3fe8dcdceeff17",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:50.112Z",
      "__v": 0
    },
    {
      "_id": "63fd81213f3fe8dcdceeff15",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:49.726Z",
      "__v": 0
    },
    {
      "_id": "63fd81223f3fe8dcdceeff17",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:50.112Z",
      "__v": 0
    },
    {
      "_id": "63fd81213f3fe8dcdceeff15",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:49.726Z",
      "__v": 0
    },
    {
      "_id": "63fd81223f3fe8dcdceeff17",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:50.112Z",
      "__v": 0
    },
    {
      "_id": "63fd81213f3fe8dcdceeff15",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:49.726Z",
      "__v": 0
    },
    {
      "_id": "63fd81223f3fe8dcdceeff17",
      "user": "63f858f97c4c5a12fb5c9b5b",
      "title": "First note",
      "description": "bruhhhh",
      "tag": "personal",
      "date": "2023-02-28T04:20:50.112Z",
      "__v": 0
    },
  ]

  const [notes, setNotes] = useState(notesInitial)

  return (
    
    <NoteContext.Provider value={{notes, setNotes}}>  
      {props.children}
      </NoteContext.Provider>
  );
};

export default NoteState;
