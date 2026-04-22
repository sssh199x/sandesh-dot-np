import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Sandesh Hamal Thakuri — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Load avatar from disk → base64 data URI (PNG — Satori doesn't support WebP)
  const avatarBuffer = await readFile(
    join(process.cwd(), "public/images/me/me-avatar-og.png")
  );
  const avatarBase64 = `data:image/png;base64,${avatarBuffer.toString("base64")}`;

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
        {/* Warm atmospheric glow — upper right */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-5%",
            width: "65%",
            height: "130%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(184,115,51,0.14) 0%, rgba(184,115,51,0.04) 45%, transparent 70%)",
          }}
        />
        {/* Subtle warm wash — bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "-40%",
            left: "10%",
            width: "60%",
            height: "70%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(184,115,51,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Main layout */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 72px",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Top row: Avatar + wordmark | status pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Left: Avatar + wordmark */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Avatar with copper ring */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  border: "2px solid rgba(184,115,51,0.35)",
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={avatarBase64}
                  width={44}
                  height={44}
                  style={{
                    borderRadius: 22,
                    objectFit: "cover",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#B87333",
                    letterSpacing: "-0.01em",
                  }}
                >
                  sandesh.
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "rgba(250,247,242,0.35)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  sandesh-hamal.com.np
                </div>
              </div>
            </div>

            {/* Right: Status pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "1px solid rgba(184,115,51,0.2)",
                borderRadius: 999,
                padding: "7px 18px",
              }}
            >
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
                  fontSize: 12,
                  fontWeight: 500,
                  color: "rgba(250,247,242,0.55)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                }}
              >
                Open to Remote
              </div>
            </div>
          </div>

          {/* Center: Name block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Copper rule */}
            <div
              style={{
                width: 40,
                height: 2,
                background:
                  "linear-gradient(90deg, #B87333, rgba(184,115,51,0.15))",
                borderRadius: 1,
                marginBottom: 24,
              }}
            />

            <div
              style={{
                fontSize: 68,
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
                fontSize: 68,
                fontWeight: 700,
                color: "#FAF7F2",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                marginTop: 2,
              }}
            >
              Hamal Thakuri
            </div>

            {/* Role + experience */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 22,
              }}
            >
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 400,
                  color: "#B87333",
                  letterSpacing: "0.03em",
                }}
              >
                Full Stack Developer
              </div>
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(184,115,51,0.35)",
                }}
              />
              <div
                style={{
                  fontSize: 19,
                  fontWeight: 400,
                  color: "rgba(250,247,242,0.3)",
                }}
              >
                5+ Years Remote · AWS Educator
              </div>
            </div>
          </div>

          {/* Bottom: Tech chips | Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Tech stack */}
            <div style={{ display: "flex", gap: 7 }}>
              {["React", "Next.js", "Node.js", "Spring Boot", "AWS", "Flutter"].map(
                (t) => (
                  <div
                    key={t}
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "rgba(250,247,242,0.4)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase" as const,
                      background: "rgba(184,115,51,0.07)",
                      border: "1px solid rgba(184,115,51,0.1)",
                      borderRadius: 5,
                      padding: "4px 10px",
                    }}
                  >
                    {t}
                  </div>
                )
              )}
            </div>

            {/* Location */}
            <div
              style={{
                fontSize: 12,
                color: "rgba(250,247,242,0.25)",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
              }}
            >
              Pokhara, Nepal
            </div>
          </div>
        </div>

        {/* Right edge copper accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 3,
            height: "100%",
            background:
              "linear-gradient(180deg, transparent 15%, rgba(184,115,51,0.35) 40%, rgba(184,115,51,0.45) 60%, rgba(184,115,51,0.35) 75%, transparent 90%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
