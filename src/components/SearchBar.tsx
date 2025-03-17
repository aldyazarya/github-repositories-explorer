"use client"

import { useState, type FormEvent, type KeyboardEvent } from "react"
import { useSearchUsersMutation } from "../services/githubApi"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search } from "lucide-react"

interface SearchBarProps {
  onError: (message: string) => void
}

const SearchBar = ({ onError }: SearchBarProps) => {
  const [username, setUsername] = useState("")
  const [searchUsers, { isLoading }] = useSearchUsersMutation()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      onError("Please enter a username")
      return
    }

    try {
      await searchUsers(username).unwrap()
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        onError(`API Error: ${(error.data as any)?.message || "Unknown error"}`)
      } else {
        onError("Failed to search users. Please try again.")
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter username"
          className="bg-slate-700/50 rounded border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-purple-500"
          disabled={isLoading}
          aria-label="GitHub username"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r F from-blue-500 rounded to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </div>
          ) : (
            <div className=" flex items-center text-white font-semibold text-normal">
              <Search className="mr-2 h-5 w-5" />
              Search
            </div>
          )}
        </Button>
      </form>
    </div>
  )
}

export default SearchBar

