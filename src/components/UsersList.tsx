"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import type { User } from "../types"
import { ChevronDown, ChevronUp, UserIcon } from "lucide-react"
import { useGetUserDetailsMutation } from "../services/githubApi"
import { Skeleton } from "./ui/skeleton"

interface UsersListProps {
  selectedUser: User | null
  onSelectUser: (user: User) => void
  onError: (message: string) => void
}

const UsersList = ({ selectedUser, onSelectUser, onError }: UsersListProps) => {
  const { users, searchTerm, status } = useSelector((state: RootState) => state.users)
  const [getUserDetails, { isLoading: isLoadingUserDetails }] = useGetUserDetailsMutation()

  const handleSelectUser = async (user: User) => {
    if (selectedUser?.login === user.login) {
      onSelectUser(user)
      return
    }

    try {
      const userDetails = await getUserDetails(user.login).unwrap()
      onSelectUser({
        ...user,
        ...userDetails,
      })
    } catch (error) {
      onError("Failed to fetch user details")
    }
  }

  useEffect(() => {
    if (users.length === 1) {
      handleSelectUser(users[0])
    }
  }, [users])

  if (status === "loading") {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-full bg-slate-700" />
        <Skeleton className="h-12 w-full bg-slate-700" />
        <Skeleton className="h-12 w-full bg-slate-700" />
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="text-center p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
        <p>Failed to fetch users. Please try again.</p>
      </div>
    )
  }

  if (users.length === 0 && searchTerm) {
    return (
      <div className="text-center p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
        <p>No users found for "{searchTerm}"</p>
      </div>
    )
  }

  if (!searchTerm) {
    return null
  }

  return (
    <div className="space-y-2">
      <h2 className="text-sm text-slate-300">{users.length > 0 ? `Showing users for "${searchTerm}"` : ""}</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => handleSelectUser(user)}
            className={`w-full rounded flex items-center justify-between p-3  transition-colors ${
              selectedUser?.login === user.login
                ? "bg-blue-600/30 border border-blue-500/50"
                : "bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url || "/placeholder.svg"}
                    alt={`${user.login}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
              </div>
              <span className="font-medium">{user.login}</span>
            </div>
            {selectedUser?.login === user.login ? (
              <ChevronUp className="w-5 h-5 text-blue-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default UsersList

