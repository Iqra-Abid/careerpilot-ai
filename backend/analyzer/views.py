import os
import tempfile
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from django.http import JsonResponse
from pypdf import PdfReader
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

@csrf_exempt


def analyze_resume(request):

    try:

        uploaded_file = request.FILES.get("resume")

        if not uploaded_file:
            return JsonResponse({
                "analysis": "No resume uploaded."
            })

        with tempfile.NamedTemporaryFile(delete=False) as temp_file:

            for chunk in uploaded_file.chunks():
                temp_file.write(chunk)

            temp_path = temp_file.name

        reader = PdfReader(temp_path)

        resume_text = ""

        for page in reader.pages:

            text = page.extract_text()

            if text:
                resume_text += text + "\n"

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": f"""
You are an expert career coach and resume reviewer.

Carefully analyze the resume below.

Base your feedback ONLY on the skills, projects,
experience and education present in the resume.

Do not give generic advice.

Mention specific technologies, projects,
strengths and missing skills found in the resume.

Resume:

{resume_text}

Provide:

1. Resume Score out of 100

2. Most Suitable Career Roles

3. Key Strengths

4. Missing Skills

5. Recommended Projects

6. Resume Improvement Suggestions
"""
                }
            ]
        )

        analysis = completion.choices[0].message.content

        return JsonResponse({
            "analysis": analysis
        })

    except Exception as e:

        return JsonResponse({
            "analysis": f"ERROR: {str(e)}"
        })