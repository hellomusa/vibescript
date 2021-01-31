import "./Layout.css";
import Form from "./Form";
import MyFooter from "./MyFooter";
import TextLoop from "react-text-loop";

const Layout = () => {
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
                  Login With Discord
                </a>
              </div>

            </div>
          </div>
          <Form />
        </div>
      </header>
      <MyFooter />
    </div>
  )
}

export default Layout;