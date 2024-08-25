import "./videos.css";

export default function Videos() {
  return (
    <div className="home">
      <h1>Bem-vindo ao Videos</h1>
      <div className="video-container__div" style={{ display: "flex" }}>
        <div className="video-item__div">
          <h2>Vídeo 1</h2>
        </div>
        <div className="video-item__div" style={{ flexGrow: 1 }}>
          <h2>Vídeo 2</h2>
        </div>
        <div className="video-item__div" style={{ flexShrink: 2 }}>
          <h2>Vídeo 3</h2>
        </div>
      </div>
    </div>
  );
}
