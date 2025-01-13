import React from "react";

export const YandexMap: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "800px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.700525733367!2d67.02991307632635!3d37.65624411897838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f355f135de70163%3A0x753f2c48a26df1ec!2sSherobod%20tumani%20axborot%20kutubxona%20markazi!5e0!3m2!1sen!2s!4v1732282731913!5m2!1sen!2s"
        width="100%"
        height="800"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: "0px" }}
      ></iframe>
    </div>
  );
};
