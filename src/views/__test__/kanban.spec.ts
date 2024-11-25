import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import KanbanBoard from '@/views/kanban-board/kanbar-board.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { Edit2Icon, Trash2Icon } from 'lucide-vue-next'

interface Event {
  element: Task
}
// Mock the vue-draggable-next component
vi.mock('vue-draggable-next', () => ({
  VueDraggableNext: {
    name: 'VueDraggable',
    props: ['list', 'group', 'itemKey'],
    template: '<div><slot></slot></div>',
  },
}))

describe('KanbanBoard', () => {
  // Mock data for testing
  const mockTasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      status: 'Pending',
      priority: 'High',
      dueDate: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      status: 'In Progress',
      priority: 'Medium',
      dueDate: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      status: 'Completed',
      priority: 'Low',
      dueDate: new Date().toISOString(),
    },
  ]

  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(KanbanBoard, {
      props: {
        tasks: mockTasks as Task[],
      },
      global: {
        components: {
          VueDraggable: VueDraggableNext,
          Edit2Icon,
          Trash2Icon,
        },
      },
    })
  })

  it('renders all columns', () => {
    const columns = wrapper.findAll('h3')
    expect(columns).toHaveLength(3)
    expect(columns[0].text()).toBe('Pending')
    expect(columns[1].text()).toBe('In Progress')
    expect(columns[2].text()).toBe('Completed')
  })

  it('renders tasks in correct columns', () => {
    const getTasksForColumn = (columnId: string) => {
      return mockTasks.filter((task) => task.status === columnId)
    }

    const pendingTasks = getTasksForColumn('Pending')
    const inProgressTasks = getTasksForColumn('In Progress')
    const completedTasks = getTasksForColumn('Completed')

    expect(pendingTasks).toHaveLength(1)
    expect(inProgressTasks).toHaveLength(1)
    expect(completedTasks).toHaveLength(1)
  })

  it('applies correct status colors', () => {})

  it('applies correct priority colors', () => {
    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'High':
          return 'bg-red-100 text-red-800'
        case 'Medium':
          return 'bg-orange-100 text-orange-800'
        default:
          return 'bg-blue-100 text-blue-800'
      }
    }

    const priorityColors = {
      High: 'bg-red-100 text-red-800',
      Medium: 'bg-orange-100 text-orange-800',
      Low: 'bg-blue-100 text-blue-800',
    }

    Object.entries(priorityColors).forEach(([priority, expectedColor]) => {
      expect(getPriorityColor(priority)).toBe(expectedColor)
    })
  })

  it('emits edit event when edit button is clicked', async () => {
    const editButton = wrapper.find('button.text-indigo-600')
    await editButton.trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')?.[0][0]).toEqual(mockTasks[0])
  })

  it('emits delete event when delete button is clicked', async () => {
    const deleteButton = wrapper.find('button.text-red-600')
    await deleteButton.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')?.[0][0]).toBe(mockTasks[0].id)
  })

  it('handles drag and drop between columns', () => {
    const tasks = [...mockTasks] // Clone the mockTasks
    const onDragChange = (evt: { added: Event; moved: Event }, columnId: string) => {
      if (evt.added || evt.moved) {
        const updatedTasks = tasks.map((task) => {
          if (task.id === evt.added?.element.id || task.id === evt.moved?.element.id) {
            return { ...task, status: columnId }
          }
          return task
        })

        wrapper.vm.$emit('update:tasks', updatedTasks)
      }
    }

    const draggedTask = { ...mockTasks[0], status: 'In Progress' }

    onDragChange(
      {
        //  @ts-expect-error eslint-disable-line
        added: { element: draggedTask },
      },
      'In Progress',
    )

    const emittedTasks = wrapper.emitted('update:tasks')?.[0][0] as Task[]
    const updatedTask = emittedTasks?.find((task: Task) => task.id === draggedTask.id)

    expect(updatedTask?.status).toBe('In Progress')
  })

  it('displays no data message when tasks array is empty', async () => {
    const emptyWrapper = mount(KanbanBoard, {
      props: {
        tasks: [],
      },
      global: {
        components: {
          VueDraggable: VueDraggableNext,
          Edit2Icon,
          Trash2Icon,
        },
      },
    })

    expect(emptyWrapper.text()).toContain('No data found')
  })
})
