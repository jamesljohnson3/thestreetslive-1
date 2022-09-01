import { Widget } from "@uploadcare/react-widget";
import { useEffect, useRef } from "react";
import uploadcare from "uploadcare-widget";

export default function App() {
  useEffect(() => {
    window.UPLOADCARE_PUBLIC_KEY = "6e43ea5777778a2aa66c";
    window.UPLOADCARE_SYSTEM_DIALOG = true;
  }, []);

  const ref = useRef();

  const handleChange = (fileInfo) => {
    const file = uploadcare.fileFrom("uploaded", fileInfo.uuid);
    const dialog = uploadcare.openDialog(file, "preview", {
      crop: "1:1",
      tabs: "file camera"
    });
    dialog.done((res) => {
      res.done((fileInfo) => {
        ref.current.getInput().value = fileInfo.cdnUrl;
      });
    });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Widget ref={ref} publicKey="6e43ea5777778a2aa66c" onChange={handleChange} />
    </div>
  );
}
