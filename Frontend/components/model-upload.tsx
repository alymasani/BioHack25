"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ModelUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [modelType, setModelType] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    if (!modelType) {
      toast({
        title: "No model type selected",
        description: "Please select a model type",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded and is being processed.`,
      })
      setFile(null)
      setModelType("")
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Model</CardTitle>
        <CardDescription>Upload a trained model or dataset for analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="model-type">Model Type</Label>
          <Select value={modelType} onValueChange={setModelType}>
            <SelectTrigger>
              <SelectValue placeholder="Select model type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="random-forest">Random Forest</SelectItem>
              <SelectItem value="logistic-regression">Logistic Regression</SelectItem>
              <SelectItem value="svm">Support Vector Machine</SelectItem>
              <SelectItem value="neural-network">Neural Network</SelectItem>
              <SelectItem value="dataset">Dataset Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload File</Label>
          <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              {file ? file.name : "Drag and drop your file here or click to browse"}
            </p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pkl,.h5,.csv,.json"
            />
            <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
              <FileUp className="h-4 w-4 mr-2" />
              Browse Files
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Supported formats: .pkl, .h5, .csv, .json</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleUpload} disabled={!file || !modelType || isUploading}>
          {isUploading ? "Uploading..." : "Upload Model"}
        </Button>
      </CardFooter>
    </Card>
  )
}

