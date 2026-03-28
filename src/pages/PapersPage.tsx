import { motion } from "framer-motion";
import { FileText, Download, Eye, Clock, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const papers = [
  { title: "DBMS End Sem 2024", subject: "DBMS", year: "2024", downloads: 1234, views: 3456 },
  { title: "OS Mid Sem 2024", subject: "OS", year: "2024", downloads: 890, views: 2100 },
  { title: "CN End Sem 2023", subject: "CN", year: "2023", downloads: 678, views: 1890 },
  { title: "AI Final Exam 2024", subject: "AI/ML", year: "2024", downloads: 1500, views: 4200 },
  { title: "DSA Mid Sem 2024", subject: "DSA", year: "2024", downloads: 1100, views: 2800 },
  { title: "Math-III End Sem 2023", subject: "Mathematics", year: "2023", downloads: 560, views: 1400 },
];

const quizzes = [
  { title: "DBMS Quick Quiz", questions: 20, time: "15 min", difficulty: "Medium", attempts: 450 },
  { title: "OS Concepts Test", questions: 30, time: "25 min", difficulty: "Hard", attempts: 320 },
  { title: "CN Fundamentals", questions: 15, time: "10 min", difficulty: "Easy", attempts: 680 },
];

const PapersPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-1">Past Papers & Mock Tests</h1>
        <p className="text-muted-foreground mb-8">Practice with previous year questions</p>
      </motion.div>

      {/* Papers */}
      <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" /> Previous Year Papers
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {papers.map((paper, i) => (
          <motion.div
            key={paper.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-5 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary font-medium">{paper.subject}</span>
              <span className="text-xs text-muted-foreground">{paper.year}</span>
            </div>
            <h3 className="font-semibold mb-4 group-hover:text-primary transition-colors">{paper.title}</h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{paper.views}</span>
              <span className="flex items-center gap-1"><Download className="h-3 w-3" />{paper.downloads}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mock Tests */}
      <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
        <Play className="h-5 w-5 text-accent" /> Mock Tests
      </h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {quizzes.map((quiz, i) => (
          <motion.div
            key={quiz.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="glass rounded-2xl p-6 cursor-pointer group"
          >
            <div className="h-12 w-12 rounded-2xl bg-accent/15 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{quiz.title}</h3>
            <div className="space-y-1 text-xs text-muted-foreground mb-4">
              <p>{quiz.questions} questions · {quiz.time}</p>
              <p>Difficulty: <span className="font-medium text-foreground">{quiz.difficulty}</span></p>
              <p>{quiz.attempts} attempts</p>
            </div>
            <Button variant="hero" size="sm" className="w-full rounded-xl">
              Start Quiz
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PapersPage;
