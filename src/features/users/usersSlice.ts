import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../../types"

interface UsersState {
  users: User[]
  searchTerm: string
  status: "idle" | "loading" | "succeeded" | "failed"
}

const initialState: UsersState = {
  users: [],
  searchTerm: "",
  status: "idle",
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setStatus: (state, action: PayloadAction<UsersState["status"]>) => {
      state.status = action.payload
    },
  },
})

export const { setUsers, setSearchTerm, setStatus } = usersSlice.actions
export default usersSlice.reducer

