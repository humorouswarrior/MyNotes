import React from 'react'

const Alert = (props) => {

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        if(word === 'danger'){
            word = "error";
        }
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

  return (

      <div style = {{height: '60px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">       
        <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
        </div>}
      </div>
   
    // the "props.alert &&" syntax works as follows. If props.alert is null then nothing happens. the statements after it are ignored. Otherwise they are executed. 
    //This shit can also be implemented using conventional if else 
  )
}

export default Alert