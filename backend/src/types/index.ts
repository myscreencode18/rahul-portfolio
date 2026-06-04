export interface ApiResponse<T = unknown> {
  success: boolean
  data?:   T
  error?:  string
  details?: unknown
}

export interface PaginationParams {
  page:  number
  limit: number
}

export interface RecruiterSession {
  id:                string
  sessionId:         string
  sectionsViewed:    string[]
  projectsViewed:    string[]
  messagesExchanged: number
  intent:            'hiring' | 'freelance' | 'collaboration' | 'unknown'
  totalTimeMs:       number
  lastActive:        Date
  createdAt:         Date
}
