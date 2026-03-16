import { useState } from "react";
import API from "../services/api";

function CreateUrl({ refreshUrls, showMessage }) {

  const [url, setUrl] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateUrl = async () => {

    if (!url) {
      alert("Please enter URL");
      return;
    }

    try {

      setLoading(true);

      await API.post("/url", {
        originalUrl: url,
        isPrivate: isPrivate
      });

      setUrl("");
      setIsPrivate(false);

      showMessage("Short URL generated successfully", "success");

      refreshUrls();

    } catch {
      showMessage("Failed to generate URL", "error");
    }
    finally {
      setLoading(false);
    }
  };

  return (

    <div className="card">

      <div className="input-row">

        <input
          className="url-input"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          IsPrivate
        </label>

      </div>

      <button
        className="generate-btn"
        onClick={generateUrl}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

    </div>
  );
}

export default CreateUrl;