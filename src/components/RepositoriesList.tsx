"use client"

import { useEffect, useState } from "react"
import { useGetUserRepositoriesMutation } from "../services/githubApi"
import type { User, Repository } from "../types"
import { Star, GitFork, Code, Calendar, ExternalLink } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { Badge } from "./ui/badge"

interface RepositoriesListProps {
  selectedUser: User | null
  onError: (message: string) => void
}

const RepositoriesList = ({ selectedUser, onError }: RepositoriesListProps) => {
  const [getUserRepositories, { data: repositories, isLoading, isError }] = useGetUserRepositoriesMutation()
  const [visibleCount, setVisibleCount] = useState(5)

  useEffect(() => {
    if (selectedUser) {
      getUserRepositories(selectedUser.login)
        .unwrap()
        .catch(() => {
          onError("Failed to fetch repositories")
        })
    }
  }, [selectedUser, getUserRepositories])

  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6">
        <GitFork className="w-12 h-12 text-slate-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No User Selected</h2>
        <p className="text-slate-400">Search for a GitHub user and select them to view their repositories</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-40 bg-slate-700" />
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full bg-slate-700" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
        <p>Failed to fetch repositories. Please try again.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full overflow-hidden  bg-slate-700 flex-shrink-0">
          {selectedUser.avatar_url && (
            <img
              src={selectedUser.avatar_url || "/placeholder.svg"}
              alt={`${selectedUser.login}'s avatar`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">{selectedUser.login}</h2>
          {selectedUser.name && <p className="text-slate-300 text-sm">{selectedUser.name}</p>}
        </div>
      </div>

      {repositories && repositories.length > 0 ? (
        <div className="space-y-4">
          {repositories.slice(0, visibleCount).map((repo: Repository) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
          {visibleCount < repositories.length && (
            <button
              onClick={() => setVisibleCount(visibleCount + 5)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Show More
            </button>
          )}
        </div>
      ) : (
        <div className="text-center p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
          <Code className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p>No repositories found for this user</p>
        </div>
      )}
    </div>
  )
}

const RepositoryCard = ({ repository }: { repository: Repository }) => {
  const formattedDate = new Date(repository.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="p-4 rounded bg-slate-800/70 border border-slate-700  hover:border-slate-600 transition-all">
      <div className="flex justify-between items-start mb-2">
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
        >
          {repository.name}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-4 h-4" />
          <span className="font-medium">{repository.stargazers_count}</span>
        </div>
      </div>

      {repository.description && <p className="text-slate-300 text-sm mb-3">{repository.description}</p>}

      <div className="flex flex-wrap gap-2 mb-3">
        {repository.language && (
          <Badge variant="outline" className="bg-slate-700/50 text-xs">
            {repository.language}
          </Badge>
        )}
        {repository.fork && (
          <Badge variant="outline" className="bg-slate-700/50 text-xs">
            <GitFork className="w-3 h-3 mr-1" />
            Fork
          </Badge>
        )}
      </div>

      <div className="flex items-center text-xs text-slate-400">
        <Calendar className="w-3 h-3 mr-1" />
        <span>Updated {formattedDate}</span>
      </div>
    </div>
  )
}

export default RepositoriesList

