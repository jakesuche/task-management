import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'


// Define the schema for a subtask
const SubTaskSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  completed: z.boolean().optional(), // Fixed key name
})

// Define the schema for a comment
const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  authorName: z.string(),
  authorAvatar: z.string(),
  createdAt: z.string(),
})

// Define the schema for an attachment
const AttachmentSchema = z.object({
  name: z.string(),
  url: z.string(),
  type: z.string(),
})

// Define the schema for the assignee
const AssigneeSchema = z.object({
  name: z.string(), // Fixed key name
  avatar: z.string(),
})

// Define the main task schema
export const Schema = z.object({
  id: z.number().or(z.string()).optional(),
  title: z.string().min(1, { message: 'title is required' }),
  description: z.string().min(1, { message: 'descript is required' }),
  status: z.string().min(1, { message: 'priority is required' }),
  priority: z.string().min(1, { message: 'priority is required' }),
  dueDate: z.string().min(1, { message: 'time is required' }),
  assignee: AssigneeSchema.optional(),
  subTasks: z.array(SubTaskSchema).optional().default([]),
  comments: z.array(CommentSchema).optional().default([]),
  labels: z.array(z.string()).optional().default([]),
  attachments: z.array(AttachmentSchema).default([]),
})


export type TaskSchemaProps = z.infer<typeof Schema>


export const TaskSchema = toTypedSchema(Schema)



// Example usage:
export const initialTask = {
  id: '',
  title: '',
  description: '',
  status: '',
  priority: '',
  dueDate: '',
  assignee: {
    name: 'Alex Johnson',
    avatar: '/placeholder.svg?height=32&width=32',
  },
  subTasks: [
    {
      id: 'st1',
      title: 'Design mockups',
      completed: true,
    },
    {
      id: 'st2',
      title: 'Implement responsive layout',
      completed: false,
    },
  ],
  comments: [
    {
      id: 'c1',
      content: "Let's focus on mobile-first design",
      authorName: 'Sarah Chen',
      authorAvatar: '/placeholder.svg?height=32&width=32',
      createdAt: '2024-11-20T12:00:00Z',
    },
  ],
  labels: ['Design', 'Frontend'],
  attachments: [
    {
      name: 'mockup.fig',
      url: '#',
      type: 'figma',
    },
  ],
}


