function Hero() {
  return (
    <div className="flex flex-col items-center px-6 mt-16 text-center">

      <div
        className="
        bg-[#F6C6D7]
        px-4
        py-2
        rounded-full
        text-sm
        font-medium
        mb-6
        "
      >
        AI Powered Resume Analysis
      </div>

      <h1
        className="
        text-5xl
        md:text-7xl
        font-bold
        text-black
        mb-6
        "
      >
        CareerPilot AI
      </h1>

      <p
        className="
        text-gray-600
        text-lg
        max-w-2xl
        mb-8
        "
      >
        Upload your resume and receive AI-powered career insights,
        skill-gap analysis, job role recommendations,
        and personalized project suggestions.
      </p>

      <div className="bg-[#F3DB77] px-4 py-2 rounded-full text-sm font-medium">
  Upload • Analyze • Improve
</div>

    </div>
  );
}

export default Hero;