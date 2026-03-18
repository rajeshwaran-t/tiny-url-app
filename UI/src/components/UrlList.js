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

    const shortUrl = `https://tinyurl-api-new-csfkcgdfdhakh5ab.centralindia-01.azurewebsites.net/r/${code}`;

    await navigator.clipboard.writeText(shortUrl);

    showMessage("URL copied successfully", "success");
  };

  const filtered = urls.filter(x =>
    x.originalUrl.toLowerCase().includes(search.toLowerCase())
  );

  const openShortUrl = (code) => {

    window.open(`https://tinyurl-api-new-csfkcgdfdhakh5ab.centralindia-01.azurewebsites.net/r/${code}`, "_blank");

    setTimeout(() => {
      loadUrls();
    }, 1000);
  };

  return (

    <div className="list-container">


      <h2>Public URLs</h2>

      <div className="search-wrapper">
        <input
          className="search"
          placeholder="Search URLs..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.map(url => (

        <div className="url-card" key={url.id}>

          <div className="url-left">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openShortUrl(url.shortCode);
              }}
            >
              https://tinyurl-api-new-csfkcgdfdhakh5ab.centralindia-01.azurewebsites.net/{url.shortCode}
            </a>

            <p>{url.originalUrl}</p>
          </div>

          {/* ✅ NEW WRAPPER */}
          <div className="url-bottom">

            <div className="url-middle">
              <button
                className="primary-btn"
                onClick={() => copyUrl(url.shortCode)}
              >
                Copy
              </button>
            </div>

            <div className="url-actions">
              <div className="click-count">
                {url.clickCount} clicks
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteUrl(url.id)}
                disabled={deleteLoadingId === url.id}
              >
                {deleteLoadingId === url.id ? "Deleting..." : "Delete"}
              </button>
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default UrlList;