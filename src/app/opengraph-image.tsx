import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sandesh Hamal Thakuri — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(145deg, #1A1714 0%, #2C2826 40%, #1A1714 100%)",
          position: "relative",
        }}
      >
        {/* Warm radial glow */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "25%",
            width: "50%",
            height: "70%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(184,115,51,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Copper accent line */}
        <div
          style={{
            width: 60,
            height: 3,
            borderRadius: 2,
            background: "#B87333",
            marginBottom: 32,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#FAF7F2",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Sandesh Hamal Thakuri
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: "#B87333",
            marginTop: 20,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          Full Stack Developer
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(250,247,242,0.5)",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          5+ years building production apps for US companies. React, Next.js, AWS.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "rgba(250,247,242,0.35)",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
            }}
          >
            Pokhara, Nepal
          </div>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              background: "rgba(184,115,51,0.4)",
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: "rgba(250,247,242,0.35)",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
            }}
          >
            sandesh-hamal.com.np
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
