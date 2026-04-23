import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #120f1f 0%, #1d1733 55%, #2d1d0f 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 360,
            width: 360,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 80,
            background: "#fbbf24",
            boxShadow: "0 30px 90px rgba(251, 191, 36, 0.35)",
            color: "#111111",
            fontSize: 220,
            fontWeight: 700,
          }}
        >
          تعلیم
        </div>
      </div>
    ),
    size
  );
}
