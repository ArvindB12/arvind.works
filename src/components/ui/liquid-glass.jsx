import { useState } from "react";

export const GlassFilter = () => (
  <svg style={{ display: "none" }}>
    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
      <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lightingColor="white" result="specLight">
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
      <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);

const GlassEffect = ({ children, className = "", style = {}, href, target = "_blank", onClick }) => {
  const [hovered, setHovered] = useState(false);

  const outerStyle = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    fontWeight: 600,
    overflow: "hidden",
    cursor: "none",
    transition: "all 0.7s cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    borderRadius: hovered ? "2rem" : "1.5rem",
    padding: hovered ? "1.15rem 2.75rem" : "1rem 2.5rem",
    boxShadow: "0 6px 6px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1)",
    ...style,
  };

  const content = (
    <div
      style={outerStyle}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Backdrop blur + distortion layer */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, overflow: "hidden",
        borderRadius: "inherit",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        filter: "url(#glass-distortion)",
        isolation: "isolate",
      }} />
      {/* White tint layer */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10,
        borderRadius: "inherit",
        background: "rgba(255,255,255,0.22)",
      }} />
      {/* Inner highlight ring */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 20,
        borderRadius: "1.5rem", overflow: "hidden",
        boxShadow: "inset 2px 2px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 1px 1px rgba(255,255,255,0.5)",
      }} />
      {/* Content */}
      <div style={{
        position: "relative", zIndex: 30,
        transition: "all 0.7s cubic-bezier(0.175, 0.885, 0.32, 2.2)",
        transform: hovered ? "scale(0.96)" : "scale(1)",
        color: "white",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        {children}
      </div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" style={{ textDecoration: "none", cursor: "none" }}>
      {content}
    </a>
  ) : content;
};

export const GlassButton = ({ children, href, onClick, target }) => (
  <GlassEffect href={href} target={target} onClick={onClick}>
    {children}
  </GlassEffect>
);
