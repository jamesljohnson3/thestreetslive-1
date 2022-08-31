export default function MyComponent(props) {
    return (
      <>
        <div className="div">
          <div background="white" className="div-2">
            Sign up
          </div>
          <div background="white" className="div-3">
            <div className="div-4" />
            <div className="div-5">
              <div className="div-6" />
              <p className="p">Markus Wilson</p>
            </div>
          </div>
        </div>
        <style jsx>{`
          .div {
            padding-bottom: 80px;
            padding-top: 80px;
          }
          .div-2 {
            border-bottom: 1px solid rgb(247, 248, 249);
            border-bottom-color: rgb(247, 248, 249);
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-color: rgb(247, 248, 249);
            border-left: 1px solid rgb(247, 248, 249);
            border-left-color: rgb(247, 248, 249);
            border-left-style: solid;
            border-left-width: 1px;
            border-radius: 12px;
            border-right: 1px solid rgb(247, 248, 249);
            border-right-color: rgb(247, 248, 249);
            border-right-style: solid;
            border-right-width: 1px;
            border-style: solid;
            border-top: 1px solid rgb(247, 248, 249);
            border-top-color: rgb(247, 248, 249);
            border-top-left-radius: 12px;
            border-top-style: solid;
            border-top-width: 1px;
            border-width: 1px;
            box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
              rgba(8, 11, 14, 0.1) 0px 16px 16px -1px;
            margin-bottom: 64px;
            overflow: hidden;
            overflow-x: hidden;
            overflow-y: hidden;
            padding-bottom: 32px;
            padding-left: 32px;
            padding-right: 32px;
            padding-top: 32px;
            font-size: 32px;
            line-height: 48px;
            text-align: center;
          }
          .div-3 {
            border-radius: 12px;
            border-top-left-radius: 12px;
            box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
              rgba(8, 11, 14, 0.1) 0px 16px 16px -1px;
            overflow: hidden;
            overflow-x: hidden;
            overflow-y: hidden;
          }
          .div-4 {
            background-image: url("https://images.unsplash.com/photo-1578759654457-296f642ee2b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1611&q=80");
            background-position: center center;
            background-size: cover;
            height: 275px;
          }
          .div-5 {
            display: flex;
            margin-bottom: 24px;
            margin-left: 24px;
            margin-right: 24px;
            margin-top: 24px;
          }
          .div-6 {
            background-image: url("data:image/png;base64,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");
            background-position: center center;
            background-size: cover;
            border-radius: 1000rem;
            border-top-left-radius: 1000rem;
            height: 32px;
            width: 32px;
          }
          .p {
            font-weight: 600;
            margin-left: 16px;
            line-height: 32px;
          }
        `}</style>
      </>
    );
  }
  