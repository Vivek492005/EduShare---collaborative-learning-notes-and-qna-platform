import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const LoginPage = () => {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.15),transparent),radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.15),transparent)]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-10 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 gradient-primary opacity-50" />
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 glow-sm"
          >
            <span className="text-primary-foreground text-3xl font-bold">E</span>
          </motion.div>

          <h1 className="text-4xl font-display font-bold mb-3 tracking-tight">Welcome to <span className="gradient-text">EduShare</span></h1>
          <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
            Your premium gateway to collaborative learning and expert Q&A.
          </p>

          <Button 
            onClick={handleGoogleSignIn}
            size="lg"
            className="w-full h-14 rounded-2xl gradient-primary text-lg font-semibold hover:glow transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <LogIn className="h-5 w-5" />
            Sign in with Google
          </Button>

          <p className="mt-8 text-sm text-muted-foreground">
            By signing in, you agree to our Terms of Service.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
