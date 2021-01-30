import "./Layout.css";
import Form from './Form';

const Header = () => {
  return (
    <div>
      <header id="home" className="App-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">

              <h1 class="name"><i>Vibe</i>Script</h1>
              <h2>A place where you can find other programmers to <i style={{color: '#009ACD'}}>vibe</i> with</h2>

              <div class="blue-btn">
                <a class="first-link" href="">
                  Get Started
                </a>
                <a href="">
                  Sign In With Discord
                </a>
              </div>

            </div>
          </div>
          <Form />
        </div>
      </header>
    </div>
  )
}

export default Header;