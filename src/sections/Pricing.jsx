import * as React from "react";

export default function MyComponent() {
  return (
    <>
      <main className="main">
        <div className="div">
          <div className="div-2" />
        </div>
        <header className="header">
          <div className="div-3">
            <h1 className="h1">
              <p>My Site 👩🏽‍💻</p>
            </h1>
            <span className="span">Unlimited Now</span>
            <div className="div-4">
              <p className="p">Build beyond your expectations.</p>
              <div className="div-5">
                <a className="a">Get Started</a>
                <a className="a-2">Live Demo</a>
              </div>
            </div>
          </div>
          <div className="div-6">
            <div className="div-7">Apps made for Creators and Sellers</div>
          </div>
        </header>
      </main>
      <style jsx>{`
        .main {
          color: rgb(31, 41, 55);
          flex-direction: column;
          display: flex;
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
        }
        @media (max-width: 991px) {
          .main {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .main {
            display: none;
          }
        }
        .div {
          width: 100%;
        }
        .div-2 {
          width: 75%;
          margin-left: auto;
          margin-right: auto;
          flex-direction: column;
          display: flex;
          position: relative;
        }
        @media (max-width: 991px) {
          .div-2 {
            width: auto;
            margin-left: 0px;
            margin-right: 0px;
          }
        }
        .header {
          background-color: rgb(255, 255, 255);
          min-height: calc(100vh - 6rem);
        }
        .div-3 {
          padding-left: 2rem;
          padding-right: 2rem;
          max-width: 56rem;
          padding-bottom: 4rem;
          padding-top: 4rem;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-3 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        @media (max-width: 640px) {
          .div-3 {
            padding-left: 3.5rem;
            padding-right: 3.5rem;
          }
        }
        .h1 {
          font-size: 6rem;
          line-height: 1;
          text-align: center;
          font-weight: 700;
          color: rgb(31, 41, 55);
          font-family: "Play", sans-serif;
        }
        @media (max-width: 991px) {
          .h1 {
            line-height: 1.375;
            font-size: 2.25rem;
          }
        }
        .span {
          color: rgb(37, 99, 235);
          display: block;
          margin-left: auto;
          margin-right: auto;
          font-size: 66px;
          font-weight: 600;
          font-family: "Play", sans-serif;
        }
        .div-4 {
          max-width: 36rem;
          margin-left: auto;
          margin-right: auto;
        }
        .p {
          font-size: 1.875rem;
          line-height: 2.25rem;
          margin-top: 40px;
          text-align: center;
          color: rgb(107, 114, 128);
          font-family: "Play", sans-serif;
        }
        @media (max-width: 991px) {
          .p {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }
        .div-5 {
          margin-bottom: 0px;
          margin-top: 20px;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        .a {
          box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
            rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
            rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
          color: rgb(255, 255, 255);
          text-align: center;
          padding-left: 2.5rem;
          padding-right: 2.5rem;
          padding-bottom: 0.75rem;
          padding-top: 0.75rem;
          background-color: rgb(37, 99, 235);
          border-radius: 0.25rem;
          border-top-left-radius: 0.25rem;
        }
        .a-2 {
          margin-left: 20px;
          margin-right: 0px;
          box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
            rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
            rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
          color: rgb(37, 99, 235);
          text-align: center;
          padding-left: 2.5rem;
          padding-right: 2.5rem;
          padding-bottom: 0.75rem;
          padding-top: 0.75rem;
          border-radius: 0.25rem;
          border-top-left-radius: 0.25rem;
        }
        .div-6 {
          justify-content: center;
          width: 100%;
          display: flex;
        }
        .div-7 {
          margin-top: 1rem;
          width: 100%;
          text-transform: uppercase;
          font-family: "Play", sans-serif;
          text-align: center;
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: rgb(75, 85, 99);
        }
      `}</style>
    </>
  );
}