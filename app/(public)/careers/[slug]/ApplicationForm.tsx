"use client"

import { useState, useRef, type ChangeEvent, type DragEvent } from "react"
import { CheckCircle2, Upload, Loader2, AlertCircle, X } from "lucide-react"

const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

interface Props {
  jobTitle: string
  jobSlug: string
}

export default function ApplicationForm({ jobTitle, jobSlug }: Props) {
  // Form fields
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [expectedSalary, setExpectedSalary] = useState("")
  const [honeypot, setHoneypot] = useState("") // spam trap — must stay empty

  // File upload
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Submission state
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  function validateAndSetFile(file: File | null) {
    setFileError("")
    if (!file) { setResumeFile(null); return }
    if (!ALLOWED_MIME.includes(file.type)) {
      setFileError("Please upload a PDF, DOC, or DOCX file.")
      setResumeFile(null)
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("File must be smaller than 5 MB.")
      setResumeFile(null)
      return
    }
    setResumeFile(file)
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    validateAndSetFile(e.target.files?.[0] ?? null)
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0] ?? null
    validateAndSetFile(file)
    // Sync the hidden input so the form sees the file on re-click
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function removeFile() {
    setResumeFile(null)
    setFileError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // Client-side validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setError("Please enter your full name.")
      return
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRe.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    if (!coverLetter.trim() || coverLetter.trim().length < 20) {
      setError("Please write a cover letter (at least 20 characters).")
      return
    }
    if (!resumeFile) {
      setError("Please upload your resume (PDF, DOC, or DOCX).")
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append("jobSlug", jobSlug)
    formData.append("jobTitle", jobTitle)
    formData.append("fullName", fullName.trim())
    formData.append("email", email.trim().toLowerCase())
    formData.append("phone", phone.trim())
    formData.append("location", location.trim())
    formData.append("linkedin", linkedin.trim())
    formData.append("portfolio", portfolio.trim())
    formData.append("coverLetter", coverLetter.trim())
    formData.append("yearsExperience", yearsExperience)
    formData.append("expectedSalary", expectedSalary.trim())
    formData.append("_hp", honeypot)
    formData.append("resume", resumeFile)

    try {
      const res = await fetch("/api/careers/apply", { method: "POST", body: formData })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.")
        setLoading(false)
        return
      }

      setSuccess(true)
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-1">
          Your application for <strong>{jobTitle}</strong> has been submitted successfully.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          We review every application personally and will be in touch within 5 business days.
        </p>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2D2B7F] to-[#4A47C4] px-6 py-5">
        <h2 className="text-white font-bold text-lg">Apply for this Role</h2>
        <p className="text-white/65 text-sm mt-0.5">{jobTitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>

        {/* Honeypot — hidden from real users */}
        <div aria-hidden="true" className="absolute opacity-0 pointer-events-none -z-10 h-0 overflow-hidden">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
          />
        </div>

        {/* Phone + Location */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 555 000 0000"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">LinkedIn Profile</label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Portfolio / Website</label>
          <input
            type="url"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            placeholder="https://yourportfolio.com"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
          />
        </div>

        {/* Years of experience + Expected salary */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Years of Experience</label>
            <select
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all bg-white"
            >
              <option value="">Select</option>
              <option value="Under 1 year">Under 1 year</option>
              <option value="1–2 years">1–2 years</option>
              <option value="2–3 years">2–3 years</option>
              <option value="3–5 years">3–5 years</option>
              <option value="5–8 years">5–8 years</option>
              <option value="8+ years">8+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expected Salary</label>
            <input
              type="text"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              placeholder="e.g. $1,500/month"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
            />
          </div>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Resume / CV <span className="text-red-500">*</span>
          </label>

          {resumeFile ? (
            <div className="flex items-center gap-3 px-4 py-3 bg-[#2D2B7F]/5 border border-[#2D2B7F]/20 rounded-xl">
              <div className="w-8 h-8 bg-[#2D2B7F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Upload className="w-4 h-4 text-[#2D2B7F]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{resumeFile.name}</p>
                <p className="text-xs text-gray-500">{(resumeFile.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-2 px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all select-none ${
                isDragging
                  ? "border-[#2D2B7F] bg-[#2D2B7F]/5 scale-[1.01]"
                  : "border-gray-200 hover:border-[#2D2B7F]/50 hover:bg-gray-50"
              }`}
            >
              <Upload className={`w-5 h-5 transition-colors ${isDragging ? "text-[#2D2B7F]" : "text-gray-400"}`} />
              <span className="text-sm text-gray-500 text-center pointer-events-none">
                <span className="font-semibold text-[#2D2B7F]">Click to upload</span> or drag &amp; drop
              </span>
              <span className="text-xs text-gray-400 pointer-events-none">PDF, DOC, DOCX — max 5 MB</span>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={handleFileChange}
            tabIndex={-1}
          />

          {fileError && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {fileError}
            </p>
          )}
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Cover Letter <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={5}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Tell us why you're a great fit for this role, what excites you about Nolojia, and what makes you stand out..."
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all resize-none"
          />
          <p className="mt-1 text-xs text-gray-400 text-right">{coverLetter.length}/5000</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#2D2B7F] hover:bg-[#232161] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-[#2D2B7F]/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit Application"
          )}
        </button>

        <p className="text-center text-xs text-gray-400 leading-relaxed">
          By submitting you agree that Nolojia may store and process your data to evaluate your application.
          We never share your details with third parties.
        </p>
      </form>
    </div>
  )
}
