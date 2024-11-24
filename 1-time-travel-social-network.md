# The Scenario: Time-Travel Social Network

## Design a distributed system for a social network where:

- Users can post messages that appear in the past or future
- Messages can influence other messages in the timeline
- System must maintain causality despite time-travel elements
- Must handle paradoxes and conflicts

### Requirements:

#### 1. System Architecture

- Design data structures to handle temporal relationships
- Explain conflict resolution mechanisms
- Detail consistency management approach
- Describe scaling strategy

#### 2. Edge Cases Analysis

- Identify potential paradoxes
- Design solutions for circular dependencies
- Handle message causality violations
- Manage temporal access control

#### 3. Performance Considerations

- Analyze time complexity of operations
- Discuss space-time tradeoffs
- Propose optimization strategies
- Consider distributed system challenges

## Approach

### 1. System Architecture

### Overview:

- Client-Server Model: Users interact through a frontend connected to backend services.

- Event-Driven Architecture: Messages are treated as events that can occur in the past, present, or future.

- Microservices:

  - Message Service: Handles posting and retrieving messages.
  - Causality Service: Ensures temporal relationships and causality.
  - Conflict Resolution Service: Resolves time-travel-induced conflicts.
  - Metadata Service: Stores information like timestamps, dependencies, and user data.

- Technology Stack:

  - Frontend: React.js (for interactive UI).
  - Backend: Node.js with Express or Nest.js (to manage requests and event processing).
  - Database:
    - Primary: Event store using Cassandra (distributed database ideal for high-write scenarios).
    - Secondary: Neo4j (graph database to store temporal relationships).
  - Communication: gRPC or REST API for microservices communication.
  - Message Queue: Kafka for event-driven processing.
  - Load Balancer: The Load Balancer is responsible for distributing incoming traffic across multiple instances of the API Gateway. This ensures high availability, prevents bottlenecks, and enables scalability by balancing the load evenly.

- Key Components:
  - Temporal Processor: Receives new messages, determines their timeline, and adjusts the timeline graph.
  - Consistency Manager: Ensures causality and resolves conflicts across distributed systems.
  - Conflict Resolver: Employs resolution algorithms to manage paradoxes and conflicting changes.

### i. Data Structures to Handle Temporal Relationships

- Timeline Graph:

  - Nodes: Represent messages.
  - Edges: Directed edges to represent causality between messages.
  - Timestamps: Each node has a logical timestamp, vector clock, or Lamport clock to track its place in time.

    ```json
    {
    	"id": "msg123",
    	"content": "Happy New Year!",
    	"vectorClock": {
    		"Alice": 5,
    		"Bob": 3,
    		"Carol": 0
    	},
    	"timestamp": "2023-12-31T23:59:59Z",
    	"dependencies": ["msg122"]
    }
    ```

- Dependency List:

  - Each message stores a list of dependent messages to maintain causality.
  - For example, `Message B` depends on `Message A`:
    - `B.dependencies = [A]`.

- Conflict Log:

  - A separate log to store conflicting messages with their timestamps and metadata for later resolution.

### ii. Conflict Resolution Mechanisms

- Conflict Detection:

  - Compare logical timestamps or vector clocks.
  - Identify violations like:
    - Two conflicting messages with the same timestamp.
    - Circular dependencies in the timeline graph.

- Resolution Strategies:

  - Merge Conflicts: Combine content (e.g., merge replies).
  - Prioritize Messages:

    - Use user-defined priorities.
    - Resolve using logical timestamps (e.g., latest wins).

  - Notify Users: Let users manually choose resolutions for complex conflicts.

- Paradox Management:
  - Implement a rollback mechanism to "erase" causality-violating messages and recompute dependencies.

### iii. Consistency Management Approach

- Causal Consistency:

  - Messages are displayed to users only after all dependencies have been resolved.
  - Achieved using vector clocks.

- Eventual Consistency:

  - In case of network partitions, allow nodes to process events independently and sync them later using conflict resolution mechanisms.

- Transactional Updates:
  - Use two-phase commit protocols or distributed consensus algorithms (e.g., Paxos, Raft) to ensure atomicity of timeline updates.

### iv. Scaling Strategy

- Horizontal Scaling:

  - Use consistent hashing to distribute messages across nodes.
  - Each node is responsible for a subset of the timeline graph.

- Partitioning:

  - Partition messages by user ID or time ranges.
  - Example: All messages from 2023 are handled by a specific shard.

- Replication:

  - Use multi-region replicas for read-heavy operations.
  - Employ write-ahead logs for crash recovery.

- Caching:

  - Use Redis for frequently accessed messages and temporal data.

- Traffic Distribution:
  - Use Load Balancer distribute user requests across multiple instances of the API Gateway.
  - This ensures that no single instance is overwhelmed, thereby improving system resilience and availability.

### 2. Edge Cases Analysis

### i. Paradoxes

- Example: Message A in the future influences Message B in the past.
  - Solution:
    - Mark Message B as "tentative" until Message A’s timestamp is reached.
    - Recompute the timeline graph to propagate changes.

### ii. Circular Dependencies

- Example: Message A → Message B → Message A.
  - Solution:
    - Detect cycles using depth-first search (DFS) on the timeline graph.
    - Break cycles by prioritizing one message based on user-defined rules.

### iii. Causality Violations

- Example: Message is posted before its dependencies.
  - Solution: Delay the message's visibility until all dependencies are resolved.

### iv. Temporal Access Control

- Example: User tries to delete a past message affecting future messages.
  - Solution: Implement "locks" to prevent deletion of causality-critical messages.

### 3. Performance Considerations

### i. Time Complexity

- Posting a message:

  - Dependency resolution: O(d), where d is the number of dependencies.
  - Timeline graph update: O(log⁡n), where n is the total messages.

- Conflict resolution:

  - Merge conflicts: O(m), where m is the number of conflicting messages.

- Causality checks:
  - Cycle detection: O(V+E), where V is messages, and E is dependencies.

### ii. Space-Time Tradeoffs

- Storing vector clocks for every message increases space usage but ensures better consistency checks.
- Tradeoff between storing entire timeline history vs. pruning older messages.

### iii. Optimization Strategies

- Batch Processing:

  - Group related messages for efficient processing.

- Indexing:

  - Index messages by timestamps and dependencies for faster lookup.

- Lazy Conflict Resolution:
  - Resolve conflicts only when accessed rather than immediately.

### iv. Distributed Challenges

- Clock Synchronization:

  - Use hybrid logical clocks (combining physical and logical clocks) to manage timestamps.

- Network Partitions:
  - Employ gossip protocols for eventual consistency across nodes.
