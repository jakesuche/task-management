type Status = 'Pending' | 'In Progress' | 'Completed'
type Priority = 'Low' | 'Medium' | 'High'

interface Comment {
  id: string
  content: string
  authorName: string
  authorAvatar: string
  createdAt: string
}

interface Subtask {
  id: string
  title: string
  completed: boolean
}

interface Task {
  id: number
  title: string
  description?: string
  status: Status
  priority: Priority
  dueDate: string
  assignee?: {
    name: string
    avatar: string
  }
  subTasks?: Subtask[]
  comments?: Comment[]
  labels?: string[]
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}
