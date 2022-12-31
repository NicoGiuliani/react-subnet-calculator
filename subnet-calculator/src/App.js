// import logo from "./logo.svg";
import "./bootstrap.min.css";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [ipAddress, setIpAddress] = useState([0, 0, 0, 0]);
  const [slashValue, setSlashValue] = useState(24);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("whatever");
  };

  const updateIpAddress = (e, quartetIndex) => {
    let newIpAddress = [...ipAddress];
    newIpAddress[quartetIndex] = parseInt(e.currentTarget.value);
    setIpAddress(newIpAddress);
    console.log(newIpAddress);
  };

  const updateSlashValue = (e) => {
    const newSlashValue = parseInt(e.currentTarget.value.replace("/", ""));
    setSlashValue(newSlashValue);
    console.log(newSlashValue);
  };

  return (
    <div className="container text-center" style={{ minWidth: "450px" }}>
      <h1>Subnet Calculator</h1>
      <div className="row">
        <div className="col-8 d-flex justify-content-around">
          <div
            className="form-group mx-1"
            style={{ display: "inline-block", width: "20%" }}
          >
            <input
              type="text"
              className="form-control"
              onChange={(e) => updateIpAddress(e, 0)}
            />
          </div>
          <strong style={{ lineHeight: "3em" }} className="flex-end">
            .
          </strong>
          <div
            className="form-group mx-1"
            style={{ display: "inline-block", width: "20%" }}
          >
            <input
              type="text"
              className="form-control"
              onChange={(e) => updateIpAddress(e, 1)}
            />
          </div>
          <strong style={{ lineHeight: "3em" }} className="flex-end">
            .
          </strong>
          <div
            className="form-group mx-1"
            style={{ display: "inline-block", width: "20%" }}
          >
            <input
              type="text"
              className="form-control"
              onChange={(e) => updateIpAddress(e, 2)}
            />
          </div>
          <strong style={{ lineHeight: "3em" }} className="flex-end">
            .
          </strong>
          <div
            className="form-group mx-1"
            style={{ display: "inline-block", width: "20%" }}
          >
            <input
              type="text"
              className="form-control"
              onChange={(e) => updateIpAddress(e, 3)}
            />
          </div>
        </div>
        <div className="col-2 px-0">
          <div className="form-group">
            <select
              className="form-select w-100"
              id="exampleSelect1"
              onChange={(e) => updateSlashValue(e)}
            >
              <option>/24</option>
              <option>/25</option>
              <option>/26</option>
              <option>/27</option>
              <option>/28</option>
              <option>/28</option>
              <option>/24</option>
              <option>/25</option>
              <option>/26</option>
              <option>/27</option>
              <option>/28</option>
              <option>/28</option>
              <option>/24</option>
              <option>/25</option>
              <option>/26</option>
              <option>/27</option>
              <option>/28</option>
              <option>/28</option>
              <option>/24</option>
              <option>/25</option>
              <option>/26</option>
              <option>/27</option>
              <option>/28</option>
              <option>/28</option>
              <option>/24</option>
              <option>/25</option>
              <option>/26</option>
              <option>/27</option>
              <option>/28</option>
              <option>/28</option>
              <option>/24</option>
              <option>/25</option>
              <option>/26</option>
              <option>/27</option>
              <option>/28</option>
              <option>/28</option>
            </select>
          </div>
        </div>
        <div className="col-2">
          <button
            onClick={(e) => handleClick(e)}
            className="btn btn-primary w-100"
          >
            Do
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
