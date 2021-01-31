import React, { useEffect } from "react";
import * as typeformEmbed from "@typeform/embed";
import axios from 'axios';

const Form = () => {

  const submitForm = (formID) => {
    axios.post(`http://localhost:5000/api/form/${formID}`, {
    })
    .then((res) => {
      console.log(`Succesfully submitted form: ${res}`);
    })
    .catch((err) => {
      console.log(`Error on form submit: ${err}`);
    })
  };

  useEffect(() => {
    const popup1 = typeformEmbed.makePopup(
      "https://lxp8ldrqhk5.typeform.com/to/GMdc1yP5",
      {
        mode: "popup",
        autoClose: 3000,
        hideHeaders: true,
        hideFooters: true,
        onSubmit: function(event) {
          submitForm(event.response_id);
        }
      }
    )
    document.getElementById("bt-popup").addEventListener("click", function() {
      popup1.open();
    });

    document.getElementById("random").addEventListener("click", function() {
      fetch('http://localhost:5000/api/icebreaker')
      .then(res => console.log(res))
    });
  });
  
  return (
    <div>
      <button id="bt-popup" class="my-button">Popup</button>
      <button id="random">Click me</button>
    </div>
  );
}

export default Form;