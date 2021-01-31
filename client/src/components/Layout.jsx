import { useState, useEffect } from "react";
import "./Layout.css";
import Form from "./Form";
import MyFooter from "./MyFooter";
import TextLoop from "react-text-loop";

const Layout = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleClick = () => {
    setLoggedIn(true);
  }

  return (
    <div>
      <header id="home" className="App-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">

              <h1 class="name">{"<"}<i style={{color: "#009ACD"}}>Vibe</i>Script{" />"}</h1>

              <h2>
                <TextLoop
                  interval={1400}
                  fade={false}
                  mask={true}
                 > 
                  <span class="verb">Vibe</span>
                  <span class="verb">Figure out how to center a {"<"}div{">"}</span>
                  <span class="verb">Collaborate</span>
                  <span class="verb">Make virtual coffee</span>
                  <span class="verb">Meme</span>
                  <span class="verb">Sh*t-talk JavaScript</span>
                  <span class="verb">Listen to music</span>
                  <span class="verb">Discuss the stock market</span>
                  <span class="verb">Become friends</span>
                  </TextLoop>{" "}
                with other programmers.
              </h2>

              <br />
              <br />
              {!isLoggedIn && 
                <div class="blue-btn">
                  <a class="first-link">
                    Get Started
                  </a>
                  <a href="api/login"
                    target="_blank"
                    onClick={handleClick}>
                    Login With Discord
                  </a>
              </div>
              }
              
            </div>
          </div>
          <Form isLoggedIn={isLoggedIn}/>
        </div>
      </header>
      <MyFooter />
    </div>
  )
}

export default Layout;