import React, { useEffect } from 'react';
import * as typeformEmbed from '@typeform/embed';

const Form = () => {

  useEffect(() => {
    const popup1 = typeformEmbed.makePopup(
      'https://lxp8ldrqhk5.typeform.com/to/GMdc1yP5',
      {
        mode: 'popup',
        autoClose: 3000,
        hideHeaders: true,
        hideFooters: true,
        onSubmit: function() {
          console.log('typeform success');
        }
      }
    )
    document.getElementById('bt-popup').addEventListener('click', function() {
      popup1.open();
    });
  });
  
  return (
    <div>
      <button id="bt-popup" class="my-button">Popup</button>
    </div>
  );
}

export default Form;