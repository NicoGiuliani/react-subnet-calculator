// import logo from "./logo.svg";
import "./bootstrap.min.css";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [ipAddress, setIpAddress] = useState([0, 0, 0, 0]);
  const [ipAddressBinary, setIpAddressBinary] = useState(["", "", "", ""]);
  const [slashValue, setSlashValue] = useState(24);
  const [networkAddress, setNetworkAddress] = useState([0, 0, 0, 0]);
  const [subnetMask, setSubnetMask] = useState([0, 0, 0, 0]);
  const [addressClass, setAddressClass] = useState("");
  const [firstAddress, setFirstAddress] = useState("");
  const [lastAddress, setLastAddress] = useState("");
  const [broadcastAddress, setBroadcastAddress] = useState("");
  const [nextNetwork, setNextNetwork] = useState("");
  const [availableHosts, setAvailableHosts] = useState("");
  const [numberSubnets, setNumberSubnets] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    // update binary ip address
    updateIpAddressBinary();
    getSubnetMask();

    // call all these somewhere else ???
    setNetworkAddress(getNetworkAddress());
    setAddressClass("A");
    setFirstAddress(ipAddress);
    setLastAddress(ipAddress);
    setNextNetwork(ipAddress);
    setBroadcastAddress(ipAddress);
    setAvailableHosts(512);
    setNumberSubnets(256);
  };

  const getNetworkAddress = () => {
    console.log(ipAddress);
    console.log(slashValue);
    let newNetworkAddress = [...ipAddress];
    newNetworkAddress[3] = 0;
    return newNetworkAddress;
  };

  const getSubnetMask = () => {
    // convert int to array of length four
    // 24 / 8 = 3 (done, first 3 set to 255, last one to 0) 255.255.255.0
    // 26 / 8 = 3.25 (3 set to 255, 1/4 of the remaining to 1s) 255.255.255.(1100 0000)
    // complete octets = slashValue // 8
    // remaining bits = slashValue % 8
    const fullOctets = Math.floor(slashValue / 8);
    const remainingBits = slashValue % 8;
    const partialOctet = ("1" * remainingBits) << (8 - remainingBits);
    // console.log("partial: " + partialOctet);
    let newSubnetMask = [];
    for (let i = 0; i < fullOctets; i++) {
      newSubnetMask.push(255);
    }
    newSubnetMask.push(partialOctet);
    setSubnetMask(newSubnetMask);
    console.log(newSubnetMask);
    // console.log(fullOctets);
    // console.log(remainingBits);
  };

  const updateIpAddressBinary = () => {
    let binaryString = "";
    for (let i = 0; i < ipAddress.length; i++) {
      let decimalValue = ipAddress[i];
      while (decimalValue > 0) {
        if (decimalValue & 1) {
          binaryString = "1" + binaryString;
        } else {
          binaryString = "0" + binaryString;
        }
        decimalValue = decimalValue >> 1;
      }
      const newIpAddressBinary = [...ipAddressBinary];
      newIpAddressBinary[i] = binaryString;
      setIpAddressBinary(newIpAddressBinary);
      binaryString = "";
    }
  };

  const updateIpAddress = (e, quartetIndex) => {
    let newIpAddress = [...ipAddress];
    newIpAddress[quartetIndex] = parseInt(e.currentTarget.value);
    setIpAddress(newIpAddress);
    // console.log(newIpAddress);
  };

  const updateSlashValue = (e) => {
    const newSlashValue = parseInt(e.currentTarget.value.replace("/", ""));
    setSlashValue(newSlashValue);
    console.log(newSlashValue);
  };

  // view
  return (
    <div className="container text-center mt-2" style={{ minWidth: "450px" }}>
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
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" className="col-6"></th>
              <th scope="col" className="col-6"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-primary">
              <th scope="row">NETWORK ADDRESS</th>
              <td>{networkAddress.join(".")}</td>
            </tr>
            <tr className="table-default">
              <th scope="row">FIRST ADDRESS</th>
              <td>{firstAddress}</td>
            </tr>
            <tr className="table-primary">
              <th scope="row">LAST HOST ADDRESS</th>
              <td>{lastAddress}</td>
            </tr>
            <tr className="table-default">
              <th scope="row">BROADCAST ADDRESS</th>
              <td>{broadcastAddress}</td>
            </tr>
            <tr className="table-primary">
              <th scope="row">NEXT NETWORK</th>
              <td>{nextNetwork}</td>
            </tr>
            <tr className="table-default">
              <th scope="row">NUMBER OF AVAILABLE HOST ADDRESSES</th>
              <td>{availableHosts}</td>
            </tr>
            <tr className="table-primary">
              <th scope="row">CLASS</th>
              <td>{addressClass}</td>
            </tr>
            <tr className="table-default">
              <th scope="row">NUMBER OF SUBNETS</th>
              <td>{numberSubnets}</td>
            </tr>
            <tr className="table-primary">
              <th scope="row">SUBNET MASK</th>
              <td>{subnetMask.join(".")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
