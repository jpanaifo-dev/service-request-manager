import { create } from 'zustand'
import { IOffices } from '@/types'
import { IOfficeFormData } from '@/schemas'

interface OfficesState {
  offices: IOffices[]
  searchTerm: string
  sortBy: 'name' | 'code' | 'email'
  sortOrder: 'asc' | 'desc'
  isModalOpen: boolean
  editingOffice: IOffices | null

  // Actions
  setOffices: (offices: IOffices[]) => void
  addOffice: (office: IOfficeFormData) => void
  updateOffice: (id: number, office: IOfficeFormData) => void
  deleteOffice: (id: number) => void
  setSearchTerm: (term: string) => void
  setSortBy: (sortBy: 'name' | 'code' | 'email') => void
  setSortOrder: (order: 'asc' | 'desc') => void
  openModal: (office?: IOffices) => void
  closeModal: () => void

  // Computed
  filteredOffices: () => IOffices[]
}

export const useOfficesStore = create<OfficesState>((set, get) => ({
  offices: [],
  searchTerm: '',
  sortBy: 'name',
  sortOrder: 'asc',
  isModalOpen: false,
  editingOffice: null,

  setOffices: (offices) => set({ offices }),

  addOffice: (office) =>
    set((state) => {
      const newId = Math.max(...state.offices.map((o) => o.id), 0) + 1
      const newOffice: IOffices = { id: newId, ...office }
      return { offices: [...state.offices, newOffice] }
    }),

  updateOffice: (id, office) =>
    set((state) => ({
      offices: state.offices.map((o) =>
        o.id === id ? { ...o, ...office } : o
      ),
    })),

  deleteOffice: (id) =>
    set((state) => ({
      offices: state.offices.filter((o) => o.id !== id),
    })),

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),

  openModal: (office) =>
    set({
      isModalOpen: true,
      editingOffice: office || null,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      editingOffice: null,
    }),

  filteredOffices: () => {
    const { offices, searchTerm, sortBy, sortOrder } = get()

    const filtered = offices.filter(
      (office) =>
        office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        office.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        office.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        office.phone.includes(searchTerm)
    )

    filtered.sort((a, b) => {
      const aValue = a[sortBy].toLowerCase()
      const bValue = b[sortBy].toLowerCase()

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  },
}))
