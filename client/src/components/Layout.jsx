import "./Layout.css";
import Form from './Form';

const Header = () => {
  return (
    <div>
      <header id="home" className="App-header">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">

              <h1 class="name">VibeScript</h1>
              <div class="school">
                <a href="#">Log In With Discord</a>
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