import React from "react";

export const YandexMap: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "800px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.935190839253!2d67.14819648771183!3d37.462252087815685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f35450e763064a7%3A0x930623affcb256f1!2sAngor%20tuman%20Axborot-kutubxona%20markazi!5e0!3m2!1sru!2s!4v1736614619352!5m2!1sru!2s"
        width="100%"
        height="800"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
