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
  const [firstAddress, setFirstAddress] = useState([0, 0, 0, 0]);
  const [lastAddress, setLastAddress] = useState("");
  const [broadcastAddress, setBroadcastAddress] = useState([0, 0, 0, 0]);
  const [nextNetwork, setNextNetwork] = useState([0, 0, 0, 0]);
  const [availableHosts, setAvailableHosts] = useState("");
  const [numberSubnets, setNumberSubnets] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    const newSubnetMask = getSubnetMask();
    setSubnetMask(newSubnetMask);

    const newNetworkAddress = getNetworkAddress(newSubnetMask);
    setNetworkAddress(newNetworkAddress);

    let newFirstAddress = [...newNetworkAddress];
    newFirstAddress[3] = newFirstAddress[3] + 1;
    setFirstAddress(newFirstAddress);

    const newNextNetworkAddress = getNextNetworkAddress(
      newNetworkAddress,
      newSubnetMask
    );
    setNextNetwork(newNextNetworkAddress);

    const broadcastAddress = getBroadcastAddress(newNextNetworkAddress);
    setBroadcastAddress(broadcastAddress);

    // setAddressClass("A");
    // setFirstAddress(ipAddress);
    // setLastAddress(ipAddress);
    // setNextNetwork(ipAddress);
    // setBroadcastAddress(ipAddress);
    // setAvailableHosts(512);
    // setNumberSubnets(256);
  };

  const getNetworkAddress = (subnetMask) => {
    let newNetworkAddress = [...ipAddress];
    for (let i = 0; i < subnetMask.length; i++) {
      newNetworkAddress[i] = newNetworkAddress[i] & subnetMask[i];
    }
    return newNetworkAddress;
  };

  const getNextNetworkAddress = (networkAddress) => {
    const increase = Math.pow(2, 8 - (slashValue % 8));
    const changedQuartet = Math.ceil(slashValue / 8) - 1;
    let newNextNetwork = [...networkAddress];
    newNextNetwork[changedQuartet] = newNextNetwork[changedQuartet] + increase;
    return newNextNetwork;
  };

  const getBroadcastAddress = (nextNetwork) => {
    let broadcastAddress = [...nextNetwork];
    for (let i = 3; i >= 0; i--) {
      broadcastAddress[i] = broadcastAddress[i] - 1;
      if (broadcastAddress[i] > 0) {
        break;
      } else {
        broadcastAddress[i] = 0;
      }
    }
    return broadcastAddress;
  };

  const getSubnetMask = () => {
    const fullOctets = Math.floor(slashValue / 8);
    const remainingBits = slashValue % 8;
    const partialOctet =
      ("0b" + "1".repeat(remainingBits)) << (8 - remainingBits);
    let newSubnetMask = [];
    for (let i = 0; i < fullOctets; i++) {
      newSubnetMask.push(255);
    }
    newSubnetMask.push(partialOctet);
    return newSubnetMask;
  };

  const updateIpAddress = (e, quartetIndex) => {
    let newIpAddress = [...ipAddress];
    newIpAddress[quartetIndex] = parseInt(e.currentTarget.value);
    setIpAddress(newIpAddress);
  };

  const updateSlashValue = (e) => {
    const newSlashValue = parseInt(e.currentTarget.value.replace("/", ""));
    setSlashValue(newSlashValue);
  };

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
              <td>{firstAddress.join(".")}</td>
            </tr>
            <tr className="table-primary">
              <th scope="row">LAST HOST ADDRESS</th>
              <td>{lastAddress}</td>
            </tr>
            <tr className="table-default">
              <th scope="row">BROADCAST ADDRESS</th>
              <td>{broadcastAddress.join(".")}</td>
            </tr>
            <tr className="table-primary">
              <th scope="row">NEXT NETWORK</th>
              <td>{nextNetwork.join(".")}</td>
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
