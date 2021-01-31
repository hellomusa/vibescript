import 'rc-footer/assets/index.css';
import React, { useState } from 'react';
import Footer from 'rc-footer';

export default function App() {
  return (
    <div>
      <Footer
        theme='dark'
        columns={[
          {
            title: '👪 The Team',
            items: [
              {
                title: 'Musa Ali',
                url: 'https://www.linkedin.com/in/musa-ali-cu/',
                openExternal: true,
              },
              {
                title: 'Jothika Sundaram',
                url: 'https://www.linkedin.com/in/jothika-sundaram/',
                openExternal: true,
              },
              {
                title: 'Samee Shahood',
                url: 'https://www.linkedin.com/in/samee-shahood/',
                openExternal: true,
              },
              {
                title: 'Hamza Sohail',
                url: 'https://www.linkedin.com/in/hamza-sohail/',
                openExternal: true,
              }
            ],
          },
        ]}
        bottom="Helping programmers vibe. Made with ❤️ by 💎 Hands"
      />
    </div>
  );
}