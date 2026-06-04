// import type { Project } from '@/types'

// export const PROJECTS: Project[] = [
//   {
//     id: '01',
//     slug: 'petverse',
//     title: 'PetVerse',
//     tagline: 'Emotional infrastructure for pet owners',
//     problem: 'Most pet platforms feel transactional. We engineered emotional infrastructure.',
//     year: 2024,
//     status: 'live',
//     category: 'fullstack',
//     role: 'Lead Engineer + Product',
//     color: '#0A0A0A',
//     accentColor: '#C7FF3F',
//     stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'OpenAI', 'React Native', 'GSAP'],
//     links: { demo: 'https://petverse.app', github: 'https://github.com/rahul/petverse' },
//     metrics: [
//       { label: 'Active Users', value: '12K+', note: 'monthly' },
//       { label: 'Lighthouse Score', value: '99', note: 'performance' },
//       { label: 'API Latency', value: '<80ms', note: 'p95' },
//     ],
//     architecture: [
//       {
//         id: 'fe', label: 'Next.js Frontend', layer: 'frontend',
//         description: 'App Router with streaming, ISR for pet profiles',
//         connections: ['api', 'ai'],
//         tech: ['Next.js 14', 'GSAP', 'Framer Motion', 'Zustand'],
//       },
//       {
//         id: 'api', label: 'Hono API', layer: 'backend',
//         description: 'Edge-deployed REST + WebSocket server',
//         connections: ['db', 'cache', 'ai'],
//         tech: ['Hono', 'Node.js', 'WebSockets'],
//       },
//       {
//         id: 'ai', label: 'AI Layer', layer: 'ai',
//         description: 'Pet health insights + personality matching',
//         connections: ['api'],
//         tech: ['OpenAI GPT-4', 'LangChain', 'Pinecone'],
//       },
//       {
//         id: 'db', label: 'PostgreSQL', layer: 'db',
//         description: 'User data, pets, medical records',
//         connections: [],
//         tech: ['PostgreSQL', 'Prisma'],
//       },
//       {
//         id: 'cache', label: 'Redis', layer: 'db',
//         description: 'Session store, feed caching, rate limiting',
//         connections: [],
//         tech: ['Redis', 'ioredis'],
//       },
//     ],
//     decisions: [
//       {
//         title: 'Why streaming SSR for pet profiles',
//         context: 'Pet profiles have rich media — photos, health records, behavior logs',
//         decision: 'Used Next.js streaming with Suspense boundaries per content block',
//         tradeoffs: 'Slightly more complex state but 3x perceived performance improvement',
//       },
//       {
//         title: 'AI personality matching algorithm',
//         context: 'Users wanted to find pets with compatible personalities',
//         decision: 'Vector embeddings from pet behavior data, cosine similarity matching',
//         tradeoffs: 'High embedding cost offset by cached similarity scores in Redis',
//       },
//     ],
//     scenes: [
//       { id: 's1', type: 'problem',  headline: 'Most pet platforms feel transactional.', body: 'We engineered emotional infrastructure.' },
//       { id: 's2', type: 'experience', headline: 'Experience Layer', body: 'Cinematic pet profiles with motion design.' },
//       { id: 's3', type: 'architecture', headline: 'System Architecture', body: 'Full-stack with AI-powered matching.' },
//       { id: 's4', type: 'decisions', headline: 'Engineering Decisions', body: 'Performance-first architecture choices.' },
//       { id: 's5', type: 'outcome', headline: '12K Monthly Active Users', body: '99 Lighthouse, <80ms API latency.' },
//     ],
//   },
//   {
//     id: '02',
//     slug: 'forge-os',
//     title: 'ForgeOS',
//     tagline: 'Developer productivity operating system',
//     problem: 'Dev tools are fragmented. We built a unified engineering environment.',
//     year: 2024,
//     status: 'live',
//     category: 'systems',
//     role: 'Architect + Frontend Lead',
//     color: '#0A0A0A',
//     accentColor: '#7AE7FF',
//     stack: ['Next.js', 'Hono', 'WebSockets', 'PostgreSQL', 'Redis', 'GSAP', 'Three.js'],
//     links: { demo: 'https://forgeos.dev', github: 'https://github.com/rahul/forgeos' },
//     metrics: [
//       { label: 'Build Time Saved', value: '40%', note: 'avg per project' },
//       { label: 'WebSocket Latency', value: '<10ms', note: 'real-time updates' },
//       { label: 'Bundle Size', value: '180KB', note: 'gzipped' },
//     ],
//     architecture: [
//       {
//         id: 'fe', label: 'Next.js + Three.js', layer: 'frontend',
//         description: 'Spatial UI with 3D workspace visualization',
//         connections: ['ws', 'api'],
//         tech: ['Next.js', 'Three.js', 'R3F', 'GSAP'],
//       },
//       {
//         id: 'ws', label: 'WebSocket Server', layer: 'backend',
//         description: 'Real-time collaboration and live updates',
//         connections: ['cache'],
//         tech: ['Socket.io', 'Node.js'],
//       },
//       {
//         id: 'api', label: 'REST API', layer: 'backend',
//         description: 'Project management, auth, file system',
//         connections: ['db'],
//         tech: ['Hono', 'JWT', 'Zod'],
//       },
//       {
//         id: 'db', label: 'PostgreSQL + Redis', layer: 'db',
//         description: 'Project data + real-time state',
//         connections: [],
//         tech: ['PostgreSQL', 'Redis', 'Drizzle ORM'],
//       },
//     ],
//     decisions: [
//       {
//         title: 'Three.js for workspace visualization',
//         context: 'Traditional 2D project dashboards lost spatial context',
//         decision: 'WebGL-rendered 3D workspace with instanced project nodes',
//         tradeoffs: 'Higher GPU usage, mitigated by LOD and frustum culling',
//       },
//     ],
//     scenes: [
//       { id: 's1', type: 'problem', headline: 'Dev tools are fragmented.', body: 'We built the OS layer they\'re missing.' },
//       { id: 's2', type: 'architecture', headline: 'Spatial Architecture', body: '3D workspace with real-time collaboration.' },
//       { id: 's3', type: 'outcome', headline: '40% Build Time Reduction', body: 'Unified environment, zero context switching.' },
//     ],
//   },
//   {
//     id: '03',
//     slug: 'neural-commerce',
//     title: 'NeuralCommerce',
//     tagline: 'AI-first e-commerce intelligence layer',
//     problem: 'E-commerce analytics are reactive. We made them predictive.',
//     year: 2023,
//     status: 'live',
//     category: 'ai',
//     role: 'Full-Stack + AI Engineer',
//     color: '#0A0A0A',
//     accentColor: '#D6C7B2',
//     stack: ['Next.js', 'Python', 'LangChain', 'Pinecone', 'PostgreSQL', 'Redis'],
//     links: { demo: 'https://neuralcommerce.io' },
//     metrics: [
//       { label: 'Revenue Increase', value: '23%', note: 'via AI recommendations' },
//       { label: 'Query Accuracy', value: '94%', note: 'semantic search' },
//       { label: 'Response Time', value: '<200ms', note: 'AI inference' },
//     ],
//     architecture: [
//       {
//         id: 'fe', label: 'Next.js Dashboard', layer: 'frontend',
//         description: 'Analytics command center with real-time charts',
//         connections: ['api', 'ws'],
//         tech: ['Next.js', 'Recharts', 'Framer Motion'],
//       },
//       {
//         id: 'ai', label: 'AI Pipeline', layer: 'ai',
//         description: 'Predictive analytics + semantic product search',
//         connections: ['vector', 'api'],
//         tech: ['LangChain', 'OpenAI', 'Python FastAPI'],
//       },
//       {
//         id: 'vector', label: 'Pinecone', layer: 'db',
//         description: 'Product embedding store for semantic search',
//         connections: [],
//         tech: ['Pinecone', 'text-embedding-ada-002'],
//       },
//     ],
//     decisions: [
//       {
//         title: 'Hybrid retrieval for product search',
//         context: 'Keyword search missing semantic intent (e.g. "gifts for dad")',
//         decision: 'BM25 + vector search with RRF fusion ranking',
//         tradeoffs: '2x query time, but 40% increase in search-to-purchase rate',
//       },
//     ],
//     scenes: [
//       { id: 's1', type: 'problem', headline: 'Analytics are reactive.', body: 'We made them predictive.' },
//       { id: 's2', type: 'architecture', headline: 'AI-First Pipeline', body: 'Semantic understanding of commerce intent.' },
//       { id: 's3', type: 'outcome', headline: '+23% Revenue Attribution', body: 'Via AI-powered recommendation engine.' },
//     ],
//   },
// ]
import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    id: '01',
    slug: 'queueless',
    title: 'QueueLess',
    tagline: 'Real-time queue management & slot booking platform',
    problem:
      'Physical queues in service-based businesses lack transparency, causing inefficient waiting experiences.',
    year: 2026,
    status: 'live',
    category: 'fullstack',
    role: 'Full Stack Engineer',

    color: '#0A0A0A',
    accentColor: '#C7FF3F',

    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Socket.IO',
      'JWT',
      'Tailwind CSS'
    ],

    links: {
      demo: '#',
      github: 'https://github.com/myscreencode18/QueueLabs'
    },

    metrics: [
      {
        label: 'Real-Time Updates',
        value: '<100ms',
        note: 'Socket.IO event propagation'
      },
      {
        label: 'System Type',
        value: 'Multi-role',
        note: 'customer + business dashboards'
      },
      {
        label: 'Architecture',
        value: 'Event-driven',
        note: 'real-time queue engine'
      }
    ],

    architecture: [
      {
        id: 'fe',
        label: 'React Frontend',
        layer: 'frontend',
        description:
          'Customer booking UI and business dashboard with live queue tracking',
        connections: ['api', 'ws'],
        tech: ['React.js', 'Tailwind CSS']
      },
      {
        id: 'api',
        label: 'Express API',
        layer: 'backend',
        description:
          'Authentication, booking logic, queue state management',
        connections: ['db', 'ws'],
        tech: ['Node.js', 'Express.js', 'JWT']
      },
      {
        id: 'ws',
        label: 'Socket.IO Engine',
        layer: 'backend',
        description:
          'Real-time queue updates and token progression system',
        connections: [],
        tech: ['Socket.IO']
      },
      {
        id: 'db',
        label: 'MongoDB',
        layer: 'db',
        description:
          'Users, businesses, bookings, and queue state storage',
        connections: [],
        tech: ['MongoDB']
      }
    ],

    decisions: [
      {
        title: 'Real-time queue synchronization',
        context:
          'Users needed live updates without manual refresh.',
        decision:
          'Implemented Socket.IO rooms per business for isolated real-time updates.',
        tradeoffs:
          'Increased backend complexity but significantly improved UX responsiveness.'
      },
      {
        title: 'Queue prediction logic',
        context:
          'Users needed visibility into expected waiting times.',
        decision:
          'Used historical booking patterns to estimate queue load trends.',
        tradeoffs:
          'Accuracy depends on data volume per business.'
      }
    ],

    scenes: [
      {
        id: 's1',
        type: 'problem',
        headline: 'Queues lack transparency.',
        body: 'Customers wait without knowing actual wait times.'
      },
      {
        id: 's2',
        type: 'architecture',
        headline: 'Real-Time Queue Engine',
        body: 'Socket-based live synchronization across users.'
      },
      {
        id: 's3',
        type: 'outcome',
        headline: 'Smarter Scheduling',
        body: 'Users can book low-traffic time slots.'
      }
    ]
  },

  {
    id: '02',
    slug: 'autopilot',
    title: 'AutoPilot',
    tagline: 'Personal life administration automation platform',
    problem:
      'Users struggle to manage recurring tasks like bills, renewals, and subscriptions manually.',

    year: 2026,
    status: 'live',
    category: 'systems',
    role: 'Full Stack Engineer',

    color: '#0A0A0A',
    accentColor: '#7AE7FF',

    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'BullMQ',
      'Redis',
      'JWT'
    ],

    links: {
      demo: '#',
      github: 'https://github.com/myscreencode18/AutoPilot'
    },

    metrics: [
      {
        label: 'Background Jobs',
        value: 'BullMQ',
        note: 'scheduled automation'
      },
      {
        label: 'Data Models',
        value: '7+',
        note: 'interconnected schemas'
      },
      {
        label: 'Workflow Type',
        value: 'Approval-based',
        note: 'user-controlled automation'
      }
    ],

    architecture: [
      {
        id: 'fe',
        label: 'React Dashboard',
        layer: 'frontend',
        description:
          'Task tracking, approvals, analytics, and activity feed',
        connections: ['api'],
        tech: ['React.js']
      },
      {
        id: 'api',
        label: 'Automation API',
        layer: 'backend',
        description:
          'Workflow orchestration and rule execution engine',
        connections: ['jobs', 'db'],
        tech: ['Node.js', 'Express.js']
      },
      {
        id: 'jobs',
        label: 'BullMQ Workers',
        layer: 'backend',
        description:
          'Handles scheduled and recurring task execution',
        connections: [],
        tech: ['BullMQ', 'Redis']
      },
      {
        id: 'db',
        label: 'MongoDB',
        layer: 'db',
        description:
          'Tasks, logs, approvals, and automation rules',
        connections: [],
        tech: ['MongoDB']
      }
    ],

    decisions: [
      {
        title: 'Approval-first automation',
        context:
          'Users needed automation but still wanted control.',
        decision:
          'Added approval checkpoints before executing critical tasks.',
        tradeoffs:
          'Slight delay in automation but improved trust and safety.'
      }
    ],

    scenes: [
      {
        id: 's1',
        type: 'problem',
        headline: 'Life admin is repetitive.',
        body: 'Users manually track recurring obligations.'
      },
      {
        id: 's2',
        type: 'architecture',
        headline: 'Automation Engine',
        body: 'Background workers execute scheduled workflows.'
      },
      {
        id: 's3',
        type: 'outcome',
        headline: 'Reduced manual effort',
        body: 'Users manage tasks through automation rules.'
      }
    ]
  },

  {
    id: '03',
    slug: 'proofwork',
    title: 'ProofWork',
    tagline: 'AI-powered developer portfolio verification platform',
    problem:
      'Developer portfolios often lack objective proof of real engineering contributions.',

    year: 2026,
    status: 'live',
    category: 'ai',
    role: 'Full Stack + AI Engineer',

    color: '#0A0A0A',
    accentColor: '#D6C7B2',

    stack: [
      'React.js',
      'Node.js',
      'MongoDB',
      'Redis',
      'OpenAI API',
      'GitHub OAuth',
      'BullMQ'
    ],

    links: {
      demo: '#',
      github: 'https://github.com/myscreencode18/ProofOfWork'
    },

    metrics: [
      {
        label: 'GitHub Integration',
        value: 'OAuth-based',
        note: 'secure repo access'
      },
      {
        label: 'AI Processing',
        value: 'Async',
        note: 'background analysis jobs'
      },
      {
        label: 'Data Handling',
        value: 'Cached',
        note: 'Redis rate-limit optimization'
      }
    ],

    architecture: [
      {
        id: 'oauth',
        label: 'GitHub OAuth',
        layer: 'backend',
        description:
          'Secure authentication and repository access control',
        connections: ['api'],
        tech: ['GitHub OAuth']
      },
      {
        id: 'api',
        label: 'Portfolio Engine',
        layer: 'backend',
        description:
          'Processes contributions and generates developer profiles',
        connections: ['ai', 'db', 'cache'],
        tech: ['Node.js', 'Express.js']
      },
      {
        id: 'ai',
        label: 'AI Layer',
        layer: 'ai',
        description:
          'Generates readable project summaries from commit history',
        connections: [],
        tech: ['OpenAI API']
      },
      {
        id: 'cache',
        label: 'Redis Cache',
        layer: 'db',
        description:
          'Caches GitHub API responses to reduce rate-limit hits',
        connections: [],
        tech: ['Redis']
      }
    ],

    decisions: [
      {
        title: 'Proof scoring system',
        context:
          'GitHub metrics alone don’t represent real engineering depth.',
        decision:
          'Designed scoring based on consistency, complexity, collaboration, and originality.',
        tradeoffs:
          'Requires continuous tuning based on developer behavior patterns.'
      }
    ],

    scenes: [
      {
        id: 's1',
        type: 'problem',
        headline: 'Portfolios lack proof.',
        body: 'GitHub profiles don’t reflect real skill depth.'
      },
      {
        id: 's2',
        type: 'architecture',
        headline: 'AI Verification Layer',
        body: 'Transforms raw GitHub data into structured insights.'
      },
      {
        id: 's3',
        type: 'outcome',
        headline: 'Verified developer profiles',
        body: 'AI-generated narratives backed by real activity.'
      }
    ]
  }
]