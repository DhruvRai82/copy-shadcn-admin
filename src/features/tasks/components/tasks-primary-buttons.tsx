import { Download, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTasks } from './tasks-provider'
import { taskSchema } from './tasks-schema'
import api from '@/lib/api-client'

export function TasksPrimaryButtons() {
  const { setOpen } = useTasks()

  const handleExport = async () => {
    try {
      const response = await api.get('/admin/tasks');
      const tasks = response.data;

      if (!tasks || tasks.length === 0) {
        alert('No tasks to export');
        return;
      }

      const headers = ['id', 'title', 'status', 'label', 'priority', 'created_at'];
      const csvContent = [
        headers.join(','),
        ...tasks.map((task: any) =>
          headers.map(header => JSON.stringify(task[header] || '')).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tasks-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (e) {
      console.error('Export failed', e);
      alert('Failed to export tasks');
    }
  }

  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={handleExport}
      >
        <span>Export</span> <Download size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>Create</span> <Plus size={18} />
      </Button>
    </div>
  )
}
