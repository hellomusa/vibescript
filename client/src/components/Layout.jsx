import "./Layout.css";
import Form from "./Form";

import TextLoop from "react-text-loop";
import Footer from "rc-footer";
import MyFooter from "./MyFooter";

const Header = () => {
  return (
    <div>
      <header id="home" className="App-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">

              <h1 class="name"><i>Vibe</i><span style={{color: "#23272a"}}>Script</span></h1>

              <h2>
                <TextLoop
                  interval={1400}
                  springConfig={{ stiffness: 180, damping: 8}}
                >
                  <span class="verb">Code</span>
                  <span class="verb">Become friends</span>
                  <span class="verb">Vibe</span>
                </TextLoop>{" "}
                with other programmers.
              </h2>

              <br />
              <br />
              <div class="blue-btn">
                <a class="first-link" href="">
                  Get Started
                </a>
                <a href="/login">
                  Sign In With Discord
                </a>
              </div>

            </div>
          </div>
          {/* <Form /> */}
        </div>
      </header>
      <MyFooter />
    </div>
  )
}

export default Header;