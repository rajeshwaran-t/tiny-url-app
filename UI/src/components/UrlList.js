import { useEffect, useState } from "react";
import API from "../services/api";

function UrlList({ refresh, showMessage }) {

  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");

  const loadUrls = async () => {

    const res = await API.get("/url");
    setUrls(res.data);
  };

  useEffect(() => {
    loadUrls();
  }, [refresh]);

  const deleteUrl = async (id) => {

    try {

      setDeleteLoadingId(id);

      await API.delete(`/url/${id}`);

      showMessage("URL deleted successfully", "success");

      setTimeout(() => {
        loadUrls();
      }, 300);

    } catch {
      showMessage("Delete failed", "error");
    }
    finally {
      setDeleteLoadingId(null);
    }
  };

  const copyUrl = async (code) => {

    const shortUrl = `https://localhost:7176/r/${code}`;

    await navigator.clipboard.writeText(shortUrl);

    showMessage("URL copied successfully", "success");
  };

  const filtered = urls.filter(x =>
    x.originalUrl.toLowerCase().includes(search.toLowerCase())
  );

  const openShortUrl = (code) => {

    window.open(`https://localhost:7176/r/${code}`, "_blank");

    setTimeout(() => {
      loadUrls();
    }, 1000);
  };

  return (

    <div className="list-container">


      <h2>Public URLs</h2>

      <input
        className="search"
        placeholder="Search URLs..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.map(url => (

        <div className="url-card" key={url.id}>

          <div className="url-left">

            <div className="url-row">

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openShortUrl(url.shortCode);
                }}
              >
                https://localhost:7176/{url.shortCode}
              </a>

              {/* <button
                className="icon-copy"
                onClick={() => copyUrl(url.shortCode)}
                title="Copy URL"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="black"
                >
                  <path d="M19 21H9a2 2 0 0 1-2-2V7h2v12h10v2zm3-4H13a2 2 0 0 1-2-2V3a2 2 0 0 1 
        2-2h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm0-14h-9v12h9V3z"/>
                </svg>
              </button> */}

              <button
                className="primary-btn"
                onClick={() => copyUrl(url.shortCode)}
              >
                Copy
              </button>

            </div>

            <p>{url.originalUrl}</p>

          </div>

          <div className="url-actions">

            <span>{url.clickCount} clicks</span>

            <button
              className="delete-btn"
              onClick={() => deleteUrl(url.id)}
              disabled={deleteLoadingId === url.id}
            >
              {deleteLoadingId === url.id ? "Deleting..." : "Delete"}
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

export default UrlList;