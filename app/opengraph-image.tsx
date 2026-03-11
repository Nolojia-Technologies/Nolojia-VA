import { ImageResponse } from "next/og"
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo/config"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0920 0%, #0F0E2E 40%, #1A1849 70%, #2D2B7F 100%)",
          padding: "80px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: 100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,71,196,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: 200,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(119,115,231,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 50,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "linear-gradient(145deg, #2D2B7F, #4A47C4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(153,150,237,0.3)",
            }}
          >
            <svg width="36" height="40" viewBox="0 0 36 40" fill="none">
              <rect x="0" y="0" width="7" height="40" rx="2" fill="white" />
              <rect x="29" y="0" width="7" height="40" rx="2" fill="white" />
              <path
                d="M7 1.5 L29 38.5"
                stroke="url(#ogDiag)"
                strokeWidth="7.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="ogDiag" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="#BBB9F3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Wordmark */}
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "white",
              letterSpacing: -1,
              fontFamily: "sans-serif",
            }}
          >
            {SITE_NAME}
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 820,
            fontFamily: "sans-serif",
            marginBottom: 28,
          }}
        >
          AI-Powered Virtual Assistants for Modern Business
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(153,150,237,0.9)",
            fontFamily: "sans-serif",
            fontWeight: 400,
            marginBottom: 56,
          }}
        >
          Admin · Creative · Growth — All Under One Roof
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 100,
            padding: "14px 28px",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#9996ED",
            }}
          />
          <span
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.8)",
              fontFamily: "sans-serif",
            }}
          >
            Book a free 30-minute discovery call · nolojia.com
          </span>
        </div>

        {/* Right side decoration — stats */}
        <div
          style={{
            position: "absolute",
            right: 100,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {[
            { value: "500+", label: "Founders Helped" },
            { value: "20+", label: "Hours Saved/Week" },
            { value: "4.9★", label: "Client Rating" },
          ].map(({ value, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(153,150,237,0.2)",
                borderRadius: 16,
                padding: "20px 28px",
                minWidth: 160,
              }}
            >
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: "white",
                  fontFamily: "sans-serif",
                  lineHeight: 1.1,
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "sans-serif",
                  marginTop: 4,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
