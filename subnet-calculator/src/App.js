// import logo from "./logo.svg";
import "./bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container">
        <h1>Logo will go here</h1>
        <form>
          <div className="col-10 mx-auto">
            <div className="row">

              <div className="d-flex row">
                <div className="col-8">
                  <div
                    className="form-group mx-1"
                    style={{ display: "inline-block", width: '20%' }}
                  >
                    <input type="text" className="form-control" id="inputDefault" />
                  </div>
                  .
                  <div
                    className="form-group mx-1"
                    style={{ display: "inline-block", width: '20%' }}
                  >
                    <input type="text" className="form-control" id="inputDefault" />
                  </div>
                  .
                  <div
                    className="form-group mx-1"
                    style={{ display: "inline-block", width: '20%' }}
                  >
                    <input type="text" className="form-control" id="inputDefault" />
                  </div>
                  .
                  <div
                    className="form-group mx-1"
                    style={{ display: "inline-block", width: '20%' }}
                  >
                    <input type="text" className="form-control" id="inputDefault" />
                  </div>
                </div>

                <div className="col-2">
                  <div className="form-group">
                    <select className="form-select w-100" id="exampleSelect1">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>

                <div className="col-2">
                  <button className="btn btn-primary w-100">Do</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
