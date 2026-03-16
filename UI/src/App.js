import { useState } from "react";
import CreateUrl from "./components/CreateUrl";
import UrlList from "./components/UrlList";
import "./styles/style.css";

function App() {

  const [refresh, setRefresh] = useState(false);

  const [showRibbon, setShowRibbon] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const refreshUrls = () => {
    setRefresh(!refresh);
  };

  const showMessage = (msg, msgType) => {

    setMessage(msg);
    setType(msgType);
    setShowRibbon(true);

    setTimeout(() => {
      setShowRibbon(false);
    }, 3000);
  };

  return (
    <div className="container">

      {showRibbon && (
        <div className={`ribbon ${type}`}>
          {message}
        </div>
      )}

      <h1>Tiny URL</h1>

      <CreateUrl refreshUrls={refreshUrls} showMessage={showMessage} />

      <UrlList refresh={refresh} showMessage={showMessage} />

    </div>
  );
}

export default App;