import "./bootstrap.min.css";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [ipAddress, setIpAddress] = useState([0, 0, 0, 0]);
  const [slashValue, setSlashValue] = useState(24);
  const [networkAddress, setNetworkAddress] = useState([0, 0, 0, 0]);
  const [subnetMask, setSubnetMask] = useState([0, 0, 0, 0]);
  const [wildcardMask, setWildcardMask] = useState([0, 0, 0, 0]);
  const [addressClass, setAddressClass] = useState("");
  const [firstAddress, setFirstAddress] = useState([0, 0, 0, 0]);
  const [lastAddress, setLastAddress] = useState([0, 0, 0, 0]);
  const [broadcastAddress, setBroadcastAddress] = useState([0, 0, 0, 0]);
  const [nextNetwork, setNextNetwork] = useState([0, 0, 0, 0]);
  const [availableHosts, setAvailableHosts] = useState(0);
  const [numberSubnets, setNumberSubnets] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();

    const newSubnetMask = getSubnetMask();
    setSubnetMask(newSubnetMask);

    const newWildcardMask = getWildcardMask(newSubnetMask);
    setWildcardMask(newWildcardMask);

    const newNetworkAddress = getNetworkAddress(newSubnetMask);
    setNetworkAddress(newNetworkAddress);

    const newNextNetworkAddress = getNextNetworkAddress(
      newNetworkAddress,
      newSubnetMask
    );
    setNextNetwork(newNextNetworkAddress);

    const newFirstAddress = incrementIpAddress(newNetworkAddress);
    setFirstAddress(newFirstAddress);

    const newBroadcastAddress = decrementIpAddress(newNextNetworkAddress);
    setBroadcastAddress(newBroadcastAddress);

    const newLastAddress = decrementIpAddress(newBroadcastAddress);
    setLastAddress(newLastAddress);

    const newAvailableHosts = getAvailableHosts();
    setAvailableHosts(newAvailableHosts);

    const newAddressClass = getAddressClass();
    setAddressClass(newAddressClass);

    const newNumberSubnets = getNumberSubnets(newAddressClass);
    setNumberSubnets(newNumberSubnets);
  };

  const getNetworkAddress = (subnetMask) => {
    let newNetworkAddress = [...ipAddress];
    for (let i = 0; i < subnetMask.length; i++) {
      newNetworkAddress[i] = newNetworkAddress[i] & subnetMask[i];
    }
    return newNetworkAddress;
  };

  const incrementIpAddress = (networkAddress) => {
    let newIpAddress = [...networkAddress];
    for (let i = 3; i >= 0; i--) {
      newIpAddress[i] = newIpAddress[i] + 1;
      if (newIpAddress[i] === 256) {
        newIpAddress[i] = 0;
      } else {
        break;
      }
    }
    return newIpAddress;
  };

  const incrementOctet = (networkAddress, octetIndex, increase) => {
    let newIpAddress = [...networkAddress];
    let carryOver = 0;
    for (let i = octetIndex; i >= 0; i--) {
      newIpAddress[i] = newIpAddress[i] + increase + carryOver;
      increase = 0;
      if (newIpAddress[i] >= 256) {
        carryOver = newIpAddress[i] - 255;
        newIpAddress[i] = 0;
      } else {
        break;
      }
    }
    return newIpAddress;
  };

  const decrementIpAddress = (networkAddress) => {
    let newIpAddress = [...networkAddress];
    for (let i = 3; i >= 0; i--) {
      newIpAddress[i] = newIpAddress[i] - 1;
      if (newIpAddress[i] === -1) {
        newIpAddress[i] = 255;
      } else {
        break;
      }
    }
    return newIpAddress;
  };

  const getNextNetworkAddress = (networkAddress) => {
    const increase = slashValue % 8 > 0 ? Math.pow(2, 8 - (slashValue % 8)) : 1;
    const changedOctet = Math.ceil(slashValue / 8) - 1;
    let newNextNetwork = [...networkAddress];
    newNextNetwork = incrementOctet(newNextNetwork, changedOctet, increase); //newNextNetwork[changedQuartet] + increase;
    return newNextNetwork;
  };

  const getSubnetMask = () => {
    const fullOctets = Math.floor(slashValue / 8);
    const remainingBits = slashValue % 8;
    const partialOctet =
      ("0b" + "1".repeat(remainingBits)) << (8 - remainingBits);
    let newSubnetMask = [0, 0, 0, 0];
    let i = 0;
    while (i < fullOctets) {
      newSubnetMask[i] = 255;
      i++;
    }
    newSubnetMask[i] = partialOctet;
    return newSubnetMask;
  };

  const getWildcardMask = (subnetMask) => {
    const newWildcardMask = [...subnetMask];
    for (let i = 0; i < subnetMask.length; i++) {
      newWildcardMask[i] = 255 - newWildcardMask[i];
    }
    return newWildcardMask;
  };

  const getAvailableHosts = () => {
    return Math.pow(2, 32 - slashValue) - 2;
  };

  const getNumberSubnets = (addressClass) => {
    const classMap = {
      A: 8,
      B: 16,
      C: 24,
      D: 0,
      E: 0,
    };

    if (slashValue <= classMap[addressClass]) {
      return 0;
    }

    const exp = slashValue - classMap[addressClass];
    return Math.pow(2, exp);
  };

  const getAddressClass = () => {
    const classes = ["A", "B", "C", "D", "E"];
    const classIds = [0, 128, 192, 224, 240];
    for (let i = 0; i < classIds.length; i++) {
      if ((ipAddress[0] & classIds[i]) !== classIds[i]) {
        return classes[i - 1];
      }
    }
    return 'E';
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
    <div
      className="container text-center mt-3 border border-dark rounded"
      style={{ minWidth: "450px" }}
    >
      <h1 className="my-3">Subnet Calculator</h1>
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
              defaultValue="/24"
            >
              <option>/1</option>
              <option>/2</option>
              <option>/3</option>
              <option>/4</option>
              <option>/5</option>
              <option>/6</option>
              <option>/7</option>
              <option>/8</option>
              <option>/9</option>
              <option>/10</option>
              <option>/11</option>
              <option>/12</option>
              <option>/13</option>
              <option>/14</option>
              <option>/15</option>
              <option>/16</option>
              <option>/17</option>
              <option>/18</option>
              <option>/19</option>
              <option>/20</option>
              <option>/21</option>
              <option>/22</option>
              <option>/23</option>
              <option>/24</option>
              <option>/25</option>
              <option>/26</option>
              <option>/27</option>
              <option>/28</option>
              <option>/29</option>
              <option>/30</option>
              <option>/31</option>
              <option>/32</option>
            </select>
          </div>
        </div>
        <div className="col-2">
          <button
            onClick={(e) => handleClick(e)}
            className="btn btn-primary w-100"
          >
            Go
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
              <td>{lastAddress.join(".")}</td>
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
              <th scope="row">AVAILABLE HOST ADDRESSES</th>
              <td>{availableHosts.toLocaleString("en-US")}</td>
            </tr>
            <tr className="table-primary">
              <th scope="row">CLASS</th>
              <td>{addressClass}</td>
            </tr>
            <tr className="table-default">
              <th scope="row">SUBNET MASK</th>
              <td>{subnetMask.join(".")}</td>
            </tr>
            <tr className="table-primary">
              <th scope="row">WILDCARD MASK</th>
              <td>{wildcardMask.join(".")}</td>
            </tr>
            <tr className="table-default">
              <th scope="row">NUMBER OF SUBNETS</th>
              <td>{numberSubnets.toLocaleString("en-US")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
