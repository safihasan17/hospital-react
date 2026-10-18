import React from "react";

type BootstrapVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface LoaderProps {
  /** Spinner size in px (default: 40) */
  size?: number;
  /** Bootstrap color variant (default: "primary") */
  variant?: BootstrapVariant;
  /** Use "grow" for the pulsing spinner (default: "border") */
  type?: "border" | "grow";
  /** Optional text shown below the spinner */
  text?: string;
  /** Cover the whole screen with an overlay (default: false) */
  fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 40,
  variant = "primary",
  type = "border",
  text,
  fullscreen = false,
}) => {
  const content = (
    <div className="d-flex flex-column align-items-center gap-2">
      <div
        className={`spinner-${type} text-${variant}`}
        role="status"
        style={{ width: size, height: size }}
      >
        <span className="visually-hidden">{text || "Loading..."}</span>
      </div>
      {text && <p className="mb-0 text-muted small">{text}</p>}
    </div>
  );

  if (fullscreen) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75"
        style={{ zIndex: 9999 }}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;