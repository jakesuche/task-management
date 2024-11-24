// stores/confirmationStore.ts
import { defineStore } from 'pinia'

interface ConfirmDialog {
  visible: boolean
  header: string
  message: string
  acceptLabel: string
  rejectLabel: string
  acceptClass: string
  onAccept?: () => void
  onReject?: () => void
}

const defaultDialog: ConfirmDialog = {
  visible: false,
  header: 'Confirm',
  message: 'Are you sure?',
  acceptLabel: 'Yes',
  rejectLabel: 'No',
  acceptClass: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
}

export const useConfirmation = defineStore('confirmation', {
  state: () => ({
    dialog: { ...defaultDialog },
  }),

  actions: {
    show(options: Partial<ConfirmDialog>) {
      this.dialog = {
        ...defaultDialog,
        ...options,
        visible: true,
      }
    },

    accept() {
      if (this.dialog.onAccept) {
        this.dialog.onAccept()
      }
      this.dialog.visible = false
    },

    reject() {
      if (this.dialog.onReject) {
        this.dialog.onReject()
      }
      this.dialog.visible = false
    },

    reset() {
      this.dialog = { ...defaultDialog }
    },
  },
})
