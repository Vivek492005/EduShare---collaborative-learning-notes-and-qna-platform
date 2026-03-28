import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";
import { Search, Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full selection:bg-primary/20">
        <div className="hidden md:block">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.03),transparent)]">
          <header className="h-16 flex items-center justify-between border-b border-border/50 px-6 glass-strong sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hidden md:flex hover:bg-primary/10 rounded-xl" />
              <div className="md:hidden flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center glow-sm">
                  <span className="text-primary-foreground text-xs font-bold">E</span>
                </div>
                <span className="font-display font-bold text-lg gradient-text">EduShare</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search smarter with EduShare..."
                  className="w-full h-11 pl-11 pr-4 rounded-2xl bg-muted/30 border border-border/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-muted/50 transition-all placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-xl relative hover:bg-primary/10 transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full gradient-primary animate-pulse" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-primary/10 transition-colors"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold cursor-pointer hover:scale-105 active:scale-95 transition-all glow-sm overflow-hidden">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || ""} className="h-full w-full object-cover" />
                      ) : (
                        user.displayName?.charAt(0) || "U"
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass rounded-2xl p-2 mt-2">
                    <DropdownMenuLabel className="font-display">My Account</DropdownMenuLabel>
                    <div className="px-2 pb-2">
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-primary/10">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-primary/10">Settings</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem 
                      className="rounded-xl cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                      onClick={logout}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="hero" size="sm" className="rounded-xl px-6" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
            </div>
          </header>

          <main className="flex-1 overflow-auto pb-20 md:pb-0">
            {children}
          </main>

          <MobileNav />
        </div>
      </div>
    </SidebarProvider>
  );
}
