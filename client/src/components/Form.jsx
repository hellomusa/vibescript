import React, { useState, useEffect } from "react";
import * as typeformEmbed from "@typeform/embed";
import axios from 'axios';

const Form = ({isLoggedIn}) => {

  const [isPartnerLoading, setIsPartnerLoading] = useState(null);

  const submitForm = (response_id) => {
    axios.post(`http://localhost:5000/api/form/${response_id}`, {
    })
    .then((res) => {
      console.log(`Succesfully submitted form: ${res}`);
      setIsPartnerLoading(true);
    })
    .catch((err) => {
      console.log(`Error on form submit: ${err}`);
    })
  };

  const fetchPartner = () => {
    try {
      const resp = axios.get('http://localhost:5000/api/partner');
      if (resp.status === 200) {
        setIsPartnerLoading(false);
      }
    } catch (err) {
      console.log('err');
    }
  }

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
          fetchPartner();
        }
      }
    )
    if (isLoggedIn && isPartnerLoading == null) {
      document.getElementById("bt-popup").addEventListener("click", function() {
        popup1.open();
      });
    }

    // document.getElementById("random").addEventListener("click", function() {
    //   fetch('http://localhost:5000/api/icebreaker')
    //   .then(res => res.json())
    //   .then(resJson => {
    //     console.log(resJson);
    //   })
    // });

  });
  
  return (
    <div>
      {isLoggedIn && isPartnerLoading == null &&
          <button id="bt-popup" class="my-button">Continue</button>
      }
      {isPartnerLoading &&
        <>Loading...</>
      }
      {isPartnerLoading === false &&
        <a href="https://discord.gg/bpNJY4Pj">Go meet your partner!</a>
      }
      {/* <button id="random">Click me (temporary)</button> */}
    </div>
  );
}

export default Form;