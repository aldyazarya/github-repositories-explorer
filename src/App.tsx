"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UsersList from "./components/UsersList";
import RepositoriesList from "./components/RepositoriesList";
import type { User } from "./types";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import { GitHubLogo } from "./components/GitHubLogo";

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleError = (message: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col items-center mb-8">
          <GitHubLogo className="w-16 h-16 mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            GitHub Repositories Explorer
          </h1>
          <p className="text-slate-300 mt-2 text-center">
            Search for GitHub users and explore their repositories
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6">
            <SearchBar onError={handleError} />
            <UsersList
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
              onError={handleError}
            />
          </div>

          <div className="bg-slate-800/50 rounded p-4 border border-slate-700 shadow-xl">
            <RepositoriesList
              selectedUser={selectedUser}
              onError={handleError}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
