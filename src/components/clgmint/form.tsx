"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar, GraduationCap, Mail, User, FileImage, Award, CalendarIcon, Clock, BarChart, X, CheckCircle2, Lock } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useVericredProgram } from "../vericred/vericred-data-access"
import { Keypair } from "@solana/web3.js"
import Degree from "@/components/degree/degree-ui"

export default function CertificateForm() {
  const { publicKey } = useWallet();
  const { programId, initialize } = useVericredProgram();

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    profilePhoto: null as File | null,
    universityName: "",
    degreeName: "",
    graduationYear: "",
    issueDate: "",
    duration: "",
    cgpa: "",
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDegreePreviewOpen, setIsDegreePreviewOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement
    if (name === "profilePhoto" && files) {
      setFormData({ ...formData, profilePhoto: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = new FormData()
    for (const key in formData) {
      const value = (formData as any)[key]
      if (value) {
        payload.append(key, value)
      }
    }

    try {
      setIsSubmitting(true)
      const res = await fetch("/api/pinata", {
        method: "POST",
        body: payload,
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("Error response:", data)
        alert(`Failed to submit form: ${data.error?.message || JSON.stringify(data.error) || "Unknown error"}`)
      } else {
        // Initialize the blockchain certificate
        await initialize.mutateAsync({ keypair: Keypair.generate(), CID: data.ipfsHash.toString() });
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 5000)
      }
    }
    catch (err) {
      console.error("Unexpected error:", err)
      alert("Something went wrong. Check the console for details.")
    }
    finally {
      setIsSubmitting(false)
    }
  }

  // Compute form completion percentage
  const getCompletionPercentage = () => {
    const totalFields = 10; // Including profile photo
    let completedFields = 0;
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value && value !== '') completedFields++;
    });
    
    return Math.round((completedFields / totalFields) * 100);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Error message banner - preserving the original functionality */}
      {!publicKey && (
        <div className="w-full bg-yellow-400 text-black py-2 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span>Error connecting to cluster local</span>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded text-sm">
            Refresh
          </button>
        </div>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-screen-2xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-indigo-900 mb-3">Vericred</h1>
              <p className="text-lg text-indigo-700">Create your verified digital degree with blockchain security</p>
            </div>
            {/* Wallet selection UI has been removed */}
          </div>
          
          {/* Progress indicator */}
          <div className="bg-white rounded-lg shadow-sm border border-indigo-100 p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-indigo-900">Application Progress</h3>
              <span className="text-sm font-bold text-indigo-700">{getCompletionPercentage()}% Complete</span>
            </div>
            <div className="w-full bg-indigo-100 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-indigo-800 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${getCompletionPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>

        <Card className="w-full bg-white shadow-lg border border-indigo-100">
          <CardHeader className="space-y-2 text-center bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white py-10 relative">
            <div className="absolute inset-0 bg-[url('/api/placeholder/800/200')] opacity-10 mix-blend-overlay bg-cover"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <GraduationCap className="h-6 w-6 text-indigo-700" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Student Degree</CardTitle>
            <CardDescription className="text-indigo-100 text-lg">
              Enter your academic details below
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-12 px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-indigo-100">
                  <User className="h-5 w-5 text-indigo-700" />
                  <h2 className="font-semibold text-xl text-indigo-900">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="font-medium text-indigo-900">
                      Full Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        required
                        placeholder="Enter your full name"
                      />
                      <User className="h-4 w-4 text-indigo-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="font-medium text-indigo-900">
                      Student ID
                    </Label>
                    <div className="relative">
                      <Input
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        required
                        placeholder="Enter your student ID"
                      />
                      <Award className="h-4 w-4 text-indigo-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium text-indigo-900">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        required
                        placeholder="Enter your email address"
                      />
                      <Mail className="h-4 w-4 text-indigo-500 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-2 pb-2 border-b border-indigo-100">
                  <GraduationCap className="h-5 w-5 text-indigo-700" />
                  <h2 className="font-semibold text-xl text-indigo-900">Academic Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="universityName" className="font-medium text-indigo-900">
                      University Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="universityName"
                        name="universityName"
                        value={formData.universityName}
                        onChange={handleChange}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        required
                        placeholder="Enter your university name"
                      />
                      <GraduationCap className="h-4 w-4 text-indigo-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degreeName" className="font-medium text-indigo-900">
                      Degree Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="degreeName"
                        name="degreeName"
                        value={formData.degreeName}
                        onChange={handleChange}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        required
                        placeholder="Enter your degree name"
                      />
                      <Award className="h-4 w-4 text-indigo-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="graduationYear" className="font-medium text-indigo-900">
                      Graduation Year
                    </Label>
                    <div className="relative">
                      <Input
                        id="graduationYear"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        required
                        placeholder="YYYY"
                      />
                      <Calendar className="h-4 w-4 text-indigo-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issueDate" className="font-medium text-indigo-900">
                      Issue Date
                    </Label>
                    <div className="relative">
                      <Input
                        id="issueDate"
                        name="issueDate"
                        type="date"
                        value={formData.issueDate}
                        onChange={handleChange}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        required
                      />
                      <CalendarIcon className="h-4 w-4 text-indigo-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="font-medium text-indigo-900">
                      Duration
                    </Label>
                    <div className="relative">
                      <Input
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        required
                        placeholder="e.g. 4 years"
                      />
                      <Clock className="h-4 w-4 text-indigo-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cgpa" className="font-medium text-indigo-900">
                      CGPA
                    </Label>
                    <div className="relative">
                      <Input
                        id="cgpa"
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                        className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10"
                        required
                        placeholder="e.g. 3.8"
                      />
                      <BarChart className="h-4 w-4 text-indigo-500 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-indigo-100 overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
                <div className="bg-indigo-600 text-white px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FileImage className="h-5 w-5 text-indigo-200" />
                    <h2 className="font-medium text-lg">Profile Photo</h2>
                  </div>
                  <p className="text-xs text-indigo-200 mt-1">Upload a professional portrait for your certificate</p>
                </div>

                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                    <div className="flex-1 w-full">
                      <div className="relative">
                        <Input
                          id="profilePhoto"
                          name="profilePhoto"
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                          className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 
                          file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold
                          file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 text-indigo-700"
                          required
                        />
                      </div>
                      {formData.profilePhoto && (
                        <div className="mt-2 bg-indigo-50 p-2 rounded-md border border-indigo-100 flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-indigo-600 mr-2" />
                          <p className="text-sm text-indigo-600 font-medium">{formData.profilePhoto.name}</p>
                        </div>
                      )}
                    </div>

                    {formData.profilePhoto && (
                      <div className="flex-shrink-0">
                        <div
                          className="h-32 w-32 lg:h-40 lg:w-40 rounded-full bg-white overflow-hidden shadow-lg cursor-pointer 
                          border-4 border-white ring-2 ring-indigo-200 hover:ring-indigo-400 transition-all duration-300"
                          onClick={() => setIsPreviewOpen(true)}
                        >
                          <img
                            src={URL.createObjectURL(formData.profilePhoto)}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-center mt-2 text-indigo-600 font-medium">Click to preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Blockchain verification info */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
                <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
                  <div className="rounded-full bg-indigo-100 p-3">
                    <Lock className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-1">Blockchain Verification</h3>
                    <p className="text-indigo-700 text-sm">Your certificate will be securely stored on the Solana blockchain with IPFS technology, making it tamper-proof and easily verifiable by employers and institutions.</p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-between items-center p-6 lg:p-8 border-t border-indigo-100 bg-white">
            <div className="text-sm text-indigo-600">
              {isSuccess && (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Certificate successfully generated and stored on blockchain
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => setIsDegreePreviewOpen(true)}
                className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 
                text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                Preview Degree
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:via-blue-700 hover:to-indigo-800 
                text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium relative"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-pulse">Processing...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  "Generate Degree"
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Lock className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-indigo-900">Secure & Tamper-proof</h3>
            </div>
            <p className="text-indigo-700 text-sm">Your credentials are securely stored on the blockchain, making them impossible to forge or alter.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-indigo-900">Globally Recognized</h3>
            </div>
            <p className="text-indigo-700 text-sm">Digital credentials that can be verified anywhere in the world, anytime.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-indigo-900">Student-Owned</h3>
            </div>
            <p className="text-indigo-700 text-sm">You control your own credentials and can share them with employers and institutions with ease.</p>
          </div>
        </div>

        <footer className="mt-12 text-center border-t border-indigo-100 pt-8 pb-16">
          <div className="flex justify-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
          <h2 className="font-bold text-2xl text-indigo-900 mb-2">Vericred</h2>
          <p className="text-indigo-600 text-sm">Blockchain-verified academic credentials</p>
        </footer>
      </div>

      {isPreviewOpen && formData.profilePhoto && (
        <div
          className="fixed inset-0 bg-indigo-900/95 z-50 flex items-center justify-center p-4 lg:p-8 transition-opacity duration-300 backdrop-blur-sm"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 z-10">
              <button
                className="rounded-full bg-white/90 p-2 shadow-lg hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPreviewOpen(false)
                }}
              >
                <X className="h-6 w-6 text-indigo-900" />
              </button>
            </div>

            <div className="p-2 h-full">
              <img
                src={URL.createObjectURL(formData.profilePhoto)}
                alt="Full Preview"
                className="w-full h-auto object-contain rounded"
              />
            </div>

            <div className="p-6 bg-white border-t border-indigo-100">
              <h3 className="font-semibold text-lg text-indigo-900">{formData.profilePhoto.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                <p className="text-sm text-indigo-700">
                  {(formData.profilePhoto.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDegreePreviewOpen && (
        <div
          className="fixed inset-0 bg-indigo-900/95 z-50 flex items-center justify-center p-4 lg:p-8 transition-opacity duration-300 backdrop-blur-sm"
          onClick={() => setIsDegreePreviewOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 z-10">
              <button
                className="rounded-full bg-white/90 p-2 shadow-lg hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDegreePreviewOpen(false);
                }}
              >
                <X className="h-6 w-6 text-indigo-900" />
              </button>
            </div>

            <div className="p-6 overflow-auto">
              <Degree
                fullName={formData.fullName || "Your Name"}
                studentId={formData.studentId || "ID12345"}
                email={formData.email || "student@example.com"}
                universityName={formData.universityName || "University Name"}
                degreeName={formData.degreeName || "Bachelor of Science"}
                graduationYear={formData.graduationYear || "2025"}
                issueDate={formData.issueDate || "2025-04-20"}
                duration={formData.duration || "4 years"}
                cgpa={formData.cgpa || "3.8"}
                profilePhoto={formData.profilePhoto}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}