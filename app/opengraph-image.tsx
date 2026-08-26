import { ImageResponse } from "next/og"
import { SITE_NAME } from "@/lib/seo/config"

export const runtime = "edge"
export const alt = "Nolojia — AI that works for your business"
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
          background: "linear-gradient(135deg, #08080F 0%, #0D0D1A 45%, #16162B 100%)",
          padding: "88px 96px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -60,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(90,108,255,0.22) 0%, rgba(90,108,255,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 44 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(145deg, #4F5BD5, #6E7BFF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="34" viewBox="0 0 36 40" fill="none">
              <rect x="0" y="0" width="7" height="40" rx="2" fill="white" />
              <rect x="29" y="0" width="7" height="40" rx="2" fill="white" />
              <path d="M7 1.5 L29 38.5" stroke="white" strokeWidth="7.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontSize: 34, fontWeight: 700, color: "white", letterSpacing: -1 }}>
            {SITE_NAME}
          </span>
        </div>

        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: -3,
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          AI that works for your business.
        </div>

        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.62)", maxWidth: 820, lineHeight: 1.4 }}>
          AI assistants, intelligent automation and digital business systems.
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 52 }}>
          {["AI Assistants", "Automation", "Business Systems", "Human Support"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 100,
                padding: "12px 22px",
                fontSize: 20,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
