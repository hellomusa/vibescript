import React from 'react';
import ReactTypeformEmbed from './ReactTypeformEmbed';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  render() {
    return (
      <div className="Form">
        <ReactTypeformEmbed
          popup
          autoOpen={false}
          url="https://demo.typeform.com/to/njdbt5"
          hideHeaders
          hideFooter
          buttonText="Go!"
          style={{ top: 100 }}
          ref={tf => {
            this.typeformEmbed = tf;
          }}
        />
        <button className="btn" onClick={this.openForm} style={{ cursor: 'pointer' }}>
          Click to open the popup!
        </button>
      </div>
    );
  }
}

export default Form;