export interface User {
  id: number
  login: string
  avatar_url: string
  html_url: string
  name?: string
  bio?: string
  public_repos?: number
  followers?: number
  following?: number
}

export interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  default_branch: string
}

