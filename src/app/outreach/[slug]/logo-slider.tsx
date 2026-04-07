"use client";

const CLIENTS = [
  "ENEL",
  "TIRRENO POWER",
  "ENI",
  "SAIPEM",
  "EDISON",
  "TERNA",
  "ENEL",
  "TIRRENO POWER",
  "ENI",
  "SAIPEM",
  "EDISON",
  "TERNA",
];

export default function LogoSlider() {
  return (
    <div className="ni-slider-wrap">
      <div className="ni-slider-label">Tra i clienti che hanno scelto N.E.T. Impianti</div>
      <div className="ni-slider-track">
        <div className="ni-slider-inner">
          {CLIENTS.map((name, i) => (
            <span key={i} className="ni-slider-item">{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
