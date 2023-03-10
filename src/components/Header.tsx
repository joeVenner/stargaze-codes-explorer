import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import { Login } from "./Login";
import { UserAddress } from "./UserAddress";

export function Header(): JSX.Element {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark main-navbar">
      <Link className="navbar-brand site-title" to={`/`}>
        <img src='/logo.svg' alt="logo" width={124}/>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={`/codes`}>Codes</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={`/contract/tools`}>Tools</Link>
          </li>
        </ul>
        <div className="form-inline my-2">
          {/* {settings.backend.keplrChainInfo && (<span className="badge network-badge">{settings.backend.keplrChainInfo?.chainId}</span>)} */}
          <UserAddress />
          <ul className="login-container">
            <li className="nav-item dropdown">
              <Login />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
