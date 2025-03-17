import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { User, Repository } from "../types"
import { setUsers, setSearchTerm, setStatus } from "../features/users/usersSlice"

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
  endpoints: (builder) => ({
    searchUsers: builder.mutation<{ items: User[] }, string>({
      query: (username) => ({
        url: `/search/users`,
        params: {
          q: username,
          per_page: 5,
        },
      }),
      async onQueryStarted(username, { dispatch, queryFulfilled }) {
        dispatch(setStatus("loading"))
        dispatch(setSearchTerm(username))

        try {
          const { data } = await queryFulfilled
          dispatch(setUsers(data.items))
          dispatch(setStatus("succeeded"))
        } catch (error) {
          dispatch(setStatus("failed"))
        }
      },
    }),
    getUserDetails: builder.mutation<User, string>({
      query: (username) => `/users/${username}`,
    }),
    getUserRepositories: builder.mutation<Repository[], string>({
      query: (username) => `/users/${username}/repos?sort=updated&direction=desc`,
    }),
  }),
})

export const { useSearchUsersMutation, useGetUserDetailsMutation, useGetUserRepositoriesMutation } = githubApi

