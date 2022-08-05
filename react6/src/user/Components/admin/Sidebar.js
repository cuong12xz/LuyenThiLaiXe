import React from "react";
import { Accordion } from "react-bootstrap";
import "./Sidebar.css";
export default function Sidebar() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div class="custom-menu">
            <button type="button" id="sidebarCollapse" class="btn btn-primary">
              <i class="fa fa-bars"></i>
              <span class="sr-only">Toggle Menu</span>
            </button>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div class="p-4 pt-5">
            <h1>
              <a href="index.html" class="logo">
                Splash
              </a>
            </h1>
            <ul class="list-unstyled components mb-5">
              <li class="active">
                <a
                  href="#homeSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle"
                >
                  Home
                </a>
                <ul class="collapse list-unstyled" id="homeSubmenu">
                  <li>
                    <a href="#">Home 1</a>
                  </li>
                  <li>
                    <a href="#">Home 2</a>
                  </li>
                  <li>
                    <a href="#">Home 3</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a
                  href="#pageSubmenu"
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle"
                >
                  Pages
                </a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
                  <li>
                    <a href="#">Page 1</a>
                  </li>
                  <li>
                    <a href="#">Page 2</a>
                  </li>
                  <li>
                    <a href="#">Page 3</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>

            <div class="mb-5">
              <h3 class="h6">Subscribe for newsletter</h3>
              <form action="#" class="colorlib-subscribe-form">
                <div class="form-group d-flex">
                  <div class="icon">
                    <span class="icon-paper-plane"></span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Email Address"
                  />
                </div>
              </form>
            </div>

            <div class="footer"></div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
