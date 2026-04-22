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
          position: "relative",
          overflow: "hidden",
          background: "#1A1714",
        }}
      >
        {/* Atmospheric copper glow — off-center, cinematic */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "70%",
            height: "140%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(184,115,51,0.12) 0%, rgba(184,115,51,0.04) 40%, transparent 70%)",
          }}
        />
        {/* Secondary warm wash — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-5%",
            width: "50%",
            height: "80%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(184,115,51,0.06) 0%, transparent 65%)",
          }}
        />

        {/* Left content column — editorial asymmetry */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 80px",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Top: Wordmark + role label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* sandesh. wordmark */}
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: "#B87333",
                letterSpacing: "-0.01em",
              }}
            >
              sandesh.
            </div>

            {/* Role pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "1px solid rgba(184,115,51,0.25)",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {/* Live dot */}
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  background: "#B87333",
                }}
              />
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(250,247,242,0.6)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                }}
              >
                Open to Remote
              </div>
            </div>
          </div>

          {/* Middle: Name — large, left-aligned, dramatic */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              marginTop: -20,
            }}
          >
            {/* Thin copper rule above name */}
            <div
              style={{
                width: 48,
                height: 2,
                background: "linear-gradient(90deg, #B87333, rgba(184,115,51,0.2))",
                borderRadius: 1,
                marginBottom: 28,
              }}
            />

            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#FAF7F2",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
              }}
            >
              Sandesh
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#FAF7F2",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                marginTop: 4,
              }}
            >
              Hamal Thakuri
            </div>

            {/* Tagline — separated, muted */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginTop: 24,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  color: "#B87333",
                  letterSpacing: "0.04em",
                }}
              >
                Full Stack Developer
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
                  fontSize: 20,
                  fontWeight: 400,
                  color: "rgba(250,247,242,0.35)",
                }}
              >
                5+ Years Remote
              </div>
            </div>
          </div>

          {/* Bottom: Location + Stack + Domain */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Left: tech stack chips */}
            <div style={{ display: "flex", gap: 8 }}>
              {["React", "Next.js", "Node.js", "AWS", "Flutter"].map((t) => (
                <div
                  key={t}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(250,247,242,0.45)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    background: "rgba(184,115,51,0.08)",
                    border: "1px solid rgba(184,115,51,0.12)",
                    borderRadius: 6,
                    padding: "5px 12px",
                  }}
                >
                  {t}
                </div>
              ))}
            </div>

            {/* Right: location + domain */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(250,247,242,0.3)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}
              >
                Pokhara, Nepal
              </div>
              <div
                style={{
                  width: 1,
                  height: 14,
                  background: "rgba(250,247,242,0.12)",
                }}
              />
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(184,115,51,0.6)",
                  letterSpacing: "0.06em",
                }}
              >
                sandesh-hamal.com.np
              </div>
            </div>
          </div>
        </div>

        {/* Right edge copper accent strip — vertical warmth */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 4,
            height: "100%",
            background:
              "linear-gradient(180deg, transparent 10%, rgba(184,115,51,0.4) 40%, rgba(184,115,51,0.5) 60%, rgba(184,115,51,0.4) 80%, transparent 95%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
