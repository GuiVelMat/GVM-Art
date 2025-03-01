import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { fetchWrapper } from "@/utils/fetch"
import type { ProfileItem } from "@/types/Profile"
import type { $Enums } from "@prisma/client"

interface UsersState {
    users: ProfileItem[]
    loading: boolean
    error?: string
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: undefined,
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetchWrapper(`/api/users`, "GET")
    return response
})

export const updateUserStatus = createAsyncThunk(
    "users/updateStatus",
    async ({ userId, status }: { userId: number; status: $Enums.status }) => {
        const response = await fetchWrapper("/api/user/admin", "PUT", { id: userId, status })

        if (!response.ok) {
            throw new Error("Error al actualizar el estado del usuario")
        }

        return { id: userId, status }
    },
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        pageUnloaded: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Casos para updateUserStatus
            .addCase(updateUserStatus.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(updateUserStatus.fulfilled, (state, action) => {
                const { id, status } = action.payload
                // Actualiza el estado del usuario en el array de usuarios
                state.users = state.users.map((user) => (user.id === id ? { ...user, user: { ...user.user, status } } : user))
                state.loading = false
            })
            .addCase(updateUserStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Error al actualizar el estado"
            })
    },
})

export const { pageUnloaded } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users.users
export const selectLoading = (state: RootState) => state.product.loading
export const selectError = (state: RootState) => state.product.error

export default usersSlice.reducer

