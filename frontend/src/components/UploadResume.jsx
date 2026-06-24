import { useState } from "react";

function UploadResume() {
  const [fileName, setFileName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
      setResumeFile(file);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      alert("Please upload a resume first!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const response = await fetch(
        "http://127.0.0.1:8000/api/analyze/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResult({
        analysis: data.analysis,
      });
    } catch (error) {
      console.error(error);

      setResult({
        analysis: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-200 text-center">

        <h2 className="text-4xl font-bold text-black mb-4">
          Upload Your Resume
        </h2>

        <p className="text-gray-600 mb-8">
          Get AI-powered career insights, skill-gap analysis,
          and personalized recommendations.
        </p>

        <label
          htmlFor="resume-upload"
          className="
            block
            border-2
            border-dashed
            border-pink-300
            rounded-3xl
            p-12
            cursor-pointer
            hover:border-pink-500
            transition
          "
        >
          <p className="text-xl font-semibold text-black">
             📄 Click to Upload
          </p>

          <p className="text-gray-500 mt-2">
            Upload your PDF resume for AI analysis
          </p>
        </label>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {fileName && (
          <p className="text-green-600 mt-6 font-medium">
            ✅ Resume Uploaded: {fileName}
          </p>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="
            mt-8
            bg-black
            text-white
            px-8
            py-4
            rounded-full
            font-semibold
            hover:scale-105
            transition
          "
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {loading && (
          <p className="mt-4 text-pink-500 font-medium">
            🤖 AI is analyzing your resume...
          </p>
        )}

        {result && (
          <div className="mt-10 bg-[#faedf2] rounded-3xl p-8 text-left shadow-md">

            <h3 className="text-2xl font-bold text-black mb-4">
              AI Analysis
            </h3>

            <pre className="whitespace-pre-wrap text-black leading-7 font-sans">
              {result.analysis}
            </pre>

          </div>
        )}

      </div>
    </div>
  );
}

export default UploadResume;