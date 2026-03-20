import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingSpinnerProps {
  size?: "small" | "default" | "large";
  fullscreen?: boolean;
  message?: string;
}

export default function LoadingSpinner({
  size = "large",
  fullscreen = false,
  message = "Loading...",
}: LoadingSpinnerProps) {
  const antIcon = <LoadingOutlined style={{ fontSize: size === "large" ? 48 : 24 }} spin />;

  if (fullscreen) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: "16px",
        }}
      >
        <Spin indicator={antIcon} />
        {message && <p style={{ color: "#999" }}>{message}</p>}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        minHeight: "200px",
        gap: "16px",
      }}
    >
      <Spin size={size} indicator={antIcon} />
      {message && <p style={{ color: "#999" }}>{message}</p>}
    </div>
  );
}
