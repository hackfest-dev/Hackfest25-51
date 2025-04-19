"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar, GraduationCap, Mail, User, FileImage, Award, CalendarIcon, Clock, BarChart, X, CheckCircle2 } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useVericredProgram } from "../vericred/vericred-data-access"
import { Keypair } from "@solana/web3.js"

export default function CertificateForm() {
  const { publicKey } = useWallet();
  const { programId, initialize } = useVericredProgram();

  console.log(publicKey?.toString());
  console.log(programId.toString());

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

  // State to track if full screen preview is open
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

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
      const res = await fetch("/api/pinata", {
        method: "POST",
        body: payload,
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("Error response:", data)
        alert(`Failed to submit form: ${data.error?.message || JSON.stringify(data.error) || "Unknown error"}`)
      } else {
        console.log(data.ipfsHash.toString());
        initialize.mutateAsync({ keypair: Keypair.generate(), CID: data.ipfsHash.toString() });
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      alert("Something went wrong. Check the console for details.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100 py-12 px-4 sm:px-6">
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-sky-200 opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-indigo-900 mb-2">Vericred</h1>
          <p className="text-lg text-indigo-700">Create your verified digital degree with blockchain security</p>
        </div>

        <Card className="mx-auto shadow-2xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white rounded-t-lg py-10 relative">
            <div className="absolute inset-0 bg-[url('/api/placeholder/800/200')] opacity-10 mix-blend-overlay bg-cover"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <GraduationCap className="h-6 w-6 text-indigo-700" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Student Degree</CardTitle>
            <CardDescription className="text-indigo-100 text-lg">
              Enter your academic details below
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-indigo-100">
                  <User className="h-5 w-5 text-indigo-700" />
                  <h2 className="font-semibold text-xl text-indigo-900">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
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
                          className="h-24 w-24 rounded-full bg-white overflow-hidden shadow-lg cursor-pointer 
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
            </form>
          </CardContent>

          <CardFooter className="flex justify-end p-8 border-t border-indigo-100 bg-indigo-50/50 backdrop-blur-sm">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:via-blue-700 hover:to-indigo-800 
              text-white px-10 py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
            >
              Generate Degree
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-indigo-600">Your certificate will be securely stored on the blockchain with IPFS technology</p>
        </div>
      </div>

      {isPreviewOpen && formData.profilePhoto && (
        <div
          className="fixed inset-0 bg-indigo-900/95 z-50 flex items-center justify-center p-4 transition-opacity duration-300 backdrop-blur-sm"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative max-w-3xl max-h-screen w-full bg-white rounded-xl overflow-hidden shadow-2xl">
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
    </div>
  )
}