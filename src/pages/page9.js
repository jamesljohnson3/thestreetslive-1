import { useRef } from "react";
import { Widget } from "@uploadcare/react-widget";

export default function IndexPage() {
  const widgetApi = useRef();

  return (
    <div>
      <button
        onClick={() => {
          const dialog = widgetApi.current.openDialog();
          console.log(dialog);
          dialog.switchTab("url");
        }}
      >
        Open url tab
      </button>

      <Widget
        ref={widgetApi}
        publicKey="6e43ea5777778a2aa66c"
        preloader={null}
        imagesOnly
        multiple
      />
      {/* The "choose Images" button shouldnt be displayed! */}
    </div>
  );
}
