import * as React from "react";

export default function MyComponent() {
  return (
    <>
      <div className="div" lockAspectRatio={false}>
        <picture>
          <source srcSet="" type="image/webp" />
          <img
            loading="lazy"
            src="https://beta.unlimitednow.site/images/uploads/Banking-app.gif"
            className="image"
          />
        </picture>
        <div className="builder-image-sizer image-sizer" />
      </div>
     <style jsx>{`
        .div {
          display: flex;
          flex-direction: column;
          position: relative;
          margin-top: 20px;
          width: auto;
          min-height: 20px;
          min-width: 653px;
          overflow: hidden;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
          align-self: center;
        }
        @media (max-width: 991px) {
          .div {
            min-width: 469px;
            max-width: 667px;
          }
        }
        @media (max-width: 640px) {
          .div {
            min-width: 255px;
            width: 100vw;
            margin-left: calc(50% - 50vw);
          }
        }
        .image {
          object-fit: cover;
          object-position: center;
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
        }
        .image-sizer {
          width: 100%;
          padding-top: 75%;
          pointer-events: none;
          font-size: 0;
        }
      `}</style>
    </>
  );
}