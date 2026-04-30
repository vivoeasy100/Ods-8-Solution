import { useAuth } from "@workspace/replit-auth-web";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export function AuthHeader() {
  const { user, isLoading, isAuthenticated, login, logout } = useAuth();

  if (isLoading) {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />;
  }

  if (!isAuthenticated || !user) {
    return (
      <Button size="sm" onClick={login} variant="outline" className="text-xs">
        Entrar
      </Button>
    );
  }

  const initials = [user.firstName, user.lastName]
    .filter(Boolean)
    .map((n) => n![0])
    .join("")
    .toUpperCase() || "U";

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || "Usuario";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50">
          <Avatar className="h-8 w-8">
            {user.profileImageUrl && <AvatarImage src={user.profileImageUrl} alt={displayName} />}
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            {user.email && (
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/curriculos" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            Meu Curriculo
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
