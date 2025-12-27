import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { TasksImportDialog } from './tasks-import-dialog'
import { TasksMutateDrawer } from './tasks-mutate-drawer'
import { useTasks } from './tasks-provider'
import api from '@/lib/api-client'

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks()
  return (
    <>
      <TasksMutateDrawer
        key='task-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <TasksImportDialog
        key='tasks-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <TasksMutateDrawer
            key={`task-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <DeleteTaskDialog
            key='task-delete'
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            setOpen={setOpen}
          />
        </>
      )}
    </>
  )
}

function DeleteTaskDialog({ open, onOpenChange, currentRow, setOpen }: any) {
  const queryClient = useQueryClient()
  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/admin/tasks/${currentRow.id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Task deleted successfully')
      setOpen(null)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete task')
    }
  })

  return (
    <ConfirmDialog
      destructive
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={() => deleteTask()}
      className='max-w-md'
      title={`Delete this task: ${currentRow.id} ?`}
      desc={
        <>
          You are about to delete a task with the ID{' '}
          <strong>{currentRow.id}</strong>. <br />
          This action cannot be undone.
        </>
      }
      confirmText={isPending ? 'Deleting...' : 'Delete'}
    />
  )
}

