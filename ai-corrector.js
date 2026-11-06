// خاصك تجيب API Key من platform.openai.com
const OPENAI_API_KEY = "AQ.Ab8RN6K-xUILgVAXAj1n0eIBCnP24yvSw6m5qZReWbXafivFfg"; // حط المفتاح ديالك هنا

async function correctExercise(studentAnswer, correctAnswer, questionText) {
    const prompt = `
    أنت أستاذ مغربي. عندك السؤال التالي: "${questionText}"
    الجواب الصحيح هو: "${correctAnswer}"
    جواب التلميذ هو: "${studentAnswer}"
    قيم جواب التلميذ. واش صحيح ولا غالط؟ علاش؟ عطي ملاحظة قصيرة بالدارجة المغربية.
    `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.5
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        return "وقع خطأ في التصحيح الآلي، المرجو المحاولة لاحقاً.";
    }
}

// تعديل دالة checkAnswer في script.js
async function checkAnswer() {
    const studentAns = document.querySelector('.exercise-box input').value;
    const feedback = document.getElementById('feedback');
    
    feedback.innerText = "جاري التصحيح... ⏳";
    
    // جواب صحيح مبدئي (تقدر تجيبه من قاعدة البيانات)
    const correctAns = "10 م/ث"; 
    const question = "احسب السرعة المتوسطة لجسم يقطع مسافة 100 متر في 10 ثواني.";
    
    const result = await correctExercise(studentAns, correctAns, question);
    feedback.innerText = result;
}
