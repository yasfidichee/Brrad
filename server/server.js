const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ متصل بقاعدة البيانات"))
    .catch(err => console.log("❌ خطأ:", err));

// --- 1. نموذج التلميذ ---
const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    level: String,
    studentCode: String,
    createdAt: { type: Date, default: Date.now }
});
const Student = mongoose.model('Student', StudentSchema);

// --- 2. نموذج الدرس ---
const LessonSchema = new mongoose.Schema({
    subject: String, // فيزياء، كيمياء...
    level: String,
    title: String,
    videoUrl: String,
    content: String,
    exercises: [{
        question: String,
        correctAnswer: String
    }]
});
const Lesson = mongoose.model('Lesson', LessonSchema);

// --- API Routes ---

// تسجيل تلميذ جديد
app.post('/api/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "تم التسجيل بنجاح", student });
});

// جلب دروس حسب المادة والمستوى
app.get('/api/lessons/:subject/:level', async (req, res) => {
    const lessons = await Lesson.find({ 
        subject: req.params.subject, 
        level: req.params.level 
    });
    res.json(lessons);
});

// تسجيل نتيجة تمرين
app.post('/api/results', async (req, res) => {
    // هنا كتسجل النتيجة ديال التلميذ
    res.json({ message: "تم حفظ النتيجة" });
});

app.listen(3000, () => console.log("🚀 السيرفر خدام على المنفذ 3000"));
