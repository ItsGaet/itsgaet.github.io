export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  body: string[];
};

const posts: Post[] = [
  {
    slug: "kafka-outbox-idempotency",
    title: "Kafka outbox pattern and idempotent consumers in production",
    summary:
      "A practical guide to moving from best effort events to reliable pipelines with outbox tables, CDC, and idempotent consumption.",
    date: "2025-03-10",
    readTime: "6 min",
    tags: ["kafka", "events", "reliability", "distributed-systems"],
    featured: true,
    body: [
      "Event driven systems fail in boring, predictable ways: duplicates, gaps, and out of order messages. The root cause is almost always the same, you write to the database and publish to Kafka in two separate steps. If either side fails, you lose consistency. The outbox pattern fixes this by persisting events in the same transaction as the state change, then shipping them asynchronously. Pair it with idempotent consumers and you get at least once delivery with deterministic outcomes.",
      "Start with the outbox table. A minimal schema includes `id` (UUID), `aggregate_id`, `event_type`, `payload`, `created_at`, and a `published_at` or `status` column. Insert into the outbox inside the same transaction as the business write. This guarantees that if the row exists, the event exists. If you poll, select rows with `FOR UPDATE SKIP LOCKED` in small batches so multiple workers can advance without blocking each other.",
      "The transport from outbox to Kafka can be CDC or polling. CDC with Debezium is the most robust for Postgres and MySQL because it streams WAL or binlog changes and preserves ordering by primary key. If you poll, keep it lightweight and frequent. Always choose a stable message key, typically `aggregate_id`, so events for the same entity stay ordered in a partition. Ordering is not global, so design your workflows accordingly.",
      "Producer settings matter. Enable idempotence with `enable.idempotence=true`, require `acks=all`, and set `min.insync.replicas` to avoid data loss. Tune `linger.ms` and `batch.size` for throughput, but keep latency within SLOs. For topics representing state, consider log compaction with a stable key so consumers can rebuild materialized views. For event streams, use retention and do not compact unless you are sure the semantics are correct.",
      "Consumers must be idempotent by default. The simplest approach is a dedupe table keyed by `event_id` or by `topic`, `partition`, `offset`. Wrap your side effects and the dedupe insert in the same transaction, or use an upsert with a unique constraint to make duplicates no ops. If you update a record, use `INSERT ... ON CONFLICT DO UPDATE` to keep the operation safe under retries. This is where exactly once behavior is achieved in practice.",
      "Plan for retries and poison messages. Use exponential backoff and a retry topic with a dead letter queue for payloads that fail validation. Keep retries bounded and record failure reasons for debugging. A poison pill should not block a partition forever. If you need strict ordering, send failures to a separate topic and continue with later events, but document the trade off clearly.",
      "Schema evolution is part of reliability. Use a schema registry or version your payloads explicitly with `schema_version`. Favor additive changes and treat field removal as a breaking change. Consumers should ignore unknown fields and provide defaults for missing ones. For multi team systems, publish a contract per topic and treat it like an API, with review and deprecation windows.",
      "Operationally, measure what matters: outbox backlog size, CDC lag, consumer lag, and the rate of failed processing. Alert on growth rather than absolute values. Run periodic reconciliation jobs that compare aggregates and derived projections, and be ready to replay from Kafka using offsets. With outbox plus idempotent consumers, replay is a feature, not a nightmare.",
    ],
  },
  {
    slug: "rust-tokio-backpressure",
    title: "Tokio backpressure patterns for high throughput Rust services",
    summary:
      "How to keep async Rust fast and stable with bounded concurrency, timeouts, and memory discipline.",
    date: "2025-03-12",
    readTime: "6 min",
    tags: ["rust", "tokio", "async", "performance"],
    body: [
      "Async does not mean infinite concurrency. The default pattern of spawning a task per request works until it does not, and then latency and memory explode together. In Tokio, backpressure is a design choice, not a magic feature. The goal is to keep the executor busy while bounding the number of in flight operations. This post focuses on practical patterns that stabilize throughput under load.",
      "Use semaphores to cap concurrency at the service boundary. A `tokio::sync::Semaphore` gives you a fixed number of permits. Acquire a permit at the start of a request and release it when the work is done. If you want fast failure under overload, use `try_acquire` and return `429` or a custom error before you allocate more work. This keeps queues short and protects tail latency.",
      "Bounded channels provide pressure between stages. If you have a pipeline that reads, transforms, and writes, connect stages with `mpsc::channel` and a small capacity. Producers will await when the buffer is full, which prevents unbounded memory usage. Combine this with `tokio::select!` and timeouts so you can drop work when upstream clients disconnect. For HTTP servers, prefer a short internal queue over large buffers.",
      "Timeouts are mandatory. Wrap external calls in `tokio::time::timeout` and fail fast when downstreams are slow. Pair this with a connection pool that matches database capacity. A pool of 20 connections feeding a database that can only handle 10 will amplify contention. For `sqlx` or `deadpool`, set `max_connections` conservatively, monitor wait times, and reject when the pool is saturated.",
      "Separate CPU bound work from async IO. If a task performs heavy computation or blocking syscalls, move it to `spawn_blocking` or a dedicated thread pool. A few CPU bound tasks can starve the executor and cause unrelated requests to time out. If you must loop over large collections, insert `tokio::task::yield_now` in long loops to give the scheduler a chance to run other tasks.",
      "Memory pressure often hides in buffers. Use `bytes::Bytes` or `Arc<[u8]>` to avoid copies, and enforce explicit limits on payload size. In Axum or Hyper, check `Content-Length` and cap streaming bodies. Avoid unbounded caches in the hot path. If you need a cache, use a size based eviction policy and track hit rate versus memory impact.",
      "Instrumentation is the fastest way to find bottlenecks. Add `tracing` spans for each request and attach fields like queue depth and semaphore permits. The `tokio-metrics` crate can report scheduler delay and task count. For service level tuning, add `tower` layers for rate limiting, concurrency limits, and retries. Each layer should be explicit so you can see where latency is introduced.",
      "Finally, load test and iterate. Run a constant load to find steady state, then step up concurrency and observe where latency and error rate spike. Use that point to choose semaphore limits and channel capacities. Implement graceful shutdown with `tokio::signal` and drain in flight tasks before exiting. Backpressure is not a one time config, it is an operational dial you adjust as traffic changes.",
    ],
  },
  {
    slug: "postgres-logical-replication-zero-downtime",
    title: "PostgreSQL logical replication for zero downtime table rewrites",
    summary:
      "How to move a hot table to a new schema without blocking writes, using backfill, change capture, validation, and a clean cutover.",
    date: "2025-03-01",
    readTime: "9 min",
    tags: ["postgres", "replication", "migrations", "database"],
    body: [
      "Zero downtime table rewrites in PostgreSQL are not about a single magic command, they are about keeping writes flowing while you move data to a new shape. The typical triggers are changing a column type, partitioning a hot table, moving to a new collation, or consolidating bloat. The challenge is that `ALTER TABLE` often takes an ACCESS EXCLUSIVE lock. The safer approach is to build a new table, backfill, mirror changes, validate, and cut over with a short write pause. This post outlines a production ready sequence.",
      "Start by checking the replication features you will rely on. If you are moving across clusters, set `wal_level = logical`, ensure `max_replication_slots` and `max_wal_senders` are large enough, and use the `pgoutput` plugin. For logical replication on a single cluster, the same settings apply but you can publish from the source database and subscribe from a loopback connection. Set a stable primary key, or configure `REPLICA IDENTITY FULL` on the source table so updates can be identified. Increase `wal_keep_size` to avoid slot lag discarding WAL during long backfills.",
      "Design the new table with the final schema, not a temporary compromise. Use `CREATE TABLE new (LIKE old INCLUDING DEFAULTS INCLUDING CONSTRAINTS)` to copy structure, then adjust columns, indexes, and partitioning. Create heavy indexes concurrently to avoid write locks, and defer expensive foreign keys until after backfill. If you are changing data types, add new columns instead of rewriting in place, and plan a later `ALTER TABLE ... DROP COLUMN` once cutover is complete. This keeps the original table stable.",
      "Backfill in controlled batches to keep autovacuum and WAL growth under control. A common pattern is keyset pagination: `INSERT INTO new SELECT ... FROM old WHERE id > $last ORDER BY id LIMIT 5000`. Commit often to reduce long running transactions and free snapshots. For large tables, consider `synchronous_commit = off` and a higher `maintenance_work_mem` during the backfill session. Run `ANALYZE` on the new table early so the planner produces efficient index builds and validation queries.",
      "Once the new table is mostly populated, set up change capture. With logical replication across clusters, create a publication: `CREATE PUBLICATION pub FOR TABLE old`, then a subscription on the target: `CREATE SUBSCRIPTION sub CONNECTION ... PUBLICATION pub`. For same cluster moves, logical replication can still work via a loopback connection, but many teams choose triggers or application level dual writes for simplicity. The goal is the same: every insert, update, and delete must reach the new table.",
      "If you go with triggers, keep them narrow and deterministic. Use `AFTER INSERT OR UPDATE OR DELETE` on the source and apply changes to the new table with `INSERT ... ON CONFLICT` to avoid duplicates. On updates, avoid full row rewrites if only a subset of columns is changing. Track failures with a dead letter table or a retry queue so the migration does not silently diverge. For logical replication, watch `pg_stat_subscription` and `pg_stat_replication` to ensure lag stays near zero.",
      "Validation is not a single count check. Compare row counts per partition or key range, then validate critical columns with checksums such as `sum(hashtext(col1 || col2))` grouped by ranges. For wide tables, sample with `TABLESAMPLE SYSTEM` and run targeted `EXCEPT` queries on known edge cases. Verify constraints by running `ALTER TABLE new VALIDATE CONSTRAINT` and confirm indexes with `REINDEX CONCURRENTLY` if you built them early. Only proceed when differences are explainable.",
      "Cutover is a short, explicit maintenance window. Stop writers or put the application in read only mode, wait for replication lag to reach zero, then swap names in a single transaction: `ALTER TABLE old RENAME TO old_backup; ALTER TABLE new RENAME TO old;`. Update sequences with `SELECT setval(...)` and reattach foreign keys, views, and grants. Keep the old table for rollback, but revoke writes so it stays as a safety snapshot.",
      "After traffic is back, clean up the migration machinery. Drop triggers, subscriptions, and replication slots to release WAL retention. Run `VACUUM ANALYZE` on the new table and monitor bloat, especially if you used high frequency updates during backfill. Remove temporary columns and unused indexes, and update documentation to reflect the new schema. The real win is that the procedure becomes repeatable, turning risky table rewrites into a controlled, observable workflow.",
    ],
  },
  {
    slug: "kubernetes-requests-limits-qos",
    title: "Kubernetes requests and limits: performance tuning without guesswork",
    summary:
      "A technical deep dive into CPU throttling, memory OOM, QoS classes, and the metrics that make resource sizing predictable.",
    date: "2025-03-05",
    readTime: "9 min",
    tags: ["kubernetes", "sre", "performance", "containers"],
    body: [
      "Kubernetes resource tuning is often treated as a guess, but the scheduler and the kernel follow precise rules. Requests decide placement, limits decide cgroup enforcement, and both feed into autoscaling and eviction. If you do not understand those rules, you will chase OOMKills, CPU throttling, or random pod evictions. This post focuses on CPU and memory behavior under cgroups, how QoS classes are derived, and a practical strategy to pick values that keep latency stable without wasting nodes.",
      "CPU is compressible. A CPU request sets the relative share for scheduling, while the CPU limit enables CFS quota in cgroup v1 (`cpu.cfs_quota_us` and `cpu.cfs_period_us`) or `cpu.max` in cgroup v2. When a container hits its limit, it is throttled, not killed, which can stretch response times and increase tail latency. If your service is latency sensitive, consider omitting CPU limits and rely on requests plus HPA to control scale. Use `kubectl describe pod` to verify effective requests.",
      "Memory is not compressible. A memory request influences scheduling and eviction priority, but the limit is a hard cap enforced by the kernel (`memory.max` in cgroup v2). When the process exceeds that cap, the kernel kills it, and Kubernetes reports `OOMKilled`. For JVM, Go, and Node, ensure the runtime is container aware. Use `-XX:MaxRAMPercentage` for Java, `GOMEMLIMIT` for Go, and `--max-old-space-size` for Node to align heap ceilings with the container limit.",
      "QoS classes are derived from the ratio of requests to limits. Guaranteed requires CPU and memory requests equal to limits for every container. Burstable is the default when at least one request is set but it does not match the limit. BestEffort has no requests at all. Under pressure, kubelet evicts BestEffort first, then Burstable, then Guaranteed. The OOM killer also uses `oom_score_adj` based on QoS, so misclassified pods can die before the ones you care about.",
      "Autoscaling depends on the same numbers. HPA with CPU utilization targets uses `current_usage / request`, so an inflated request hides real load and delays scaling. VPA can adjust requests based on history, but it restarts pods to apply changes, which can conflict with HPA. A common pattern is to use HPA for scale out and VPA in recommendation mode for periodic request tuning. For batch jobs, VPA in auto mode can work because restarts are less disruptive.",
      "Observability is the guardrail. Track `container_cpu_cfs_throttled_seconds_total` and `container_cpu_usage_seconds_total` to spot throttling. For memory, `container_memory_working_set_bytes` shows resident usage, while `container_memory_rss` and `container_memory_cache` separate hot and reclaimable pages. Use p95 and p99, not averages. Also watch node level metrics like `node_memory_MemAvailable_bytes` and `kube_pod_container_resource_requests` to understand cluster headroom.",
      "A practical sizing strategy starts with measurement, not intuition. For CPU, set requests near p95 usage during peak hours and keep limits at 2x or remove them entirely if you can absorb bursts with scaling. For memory, set the limit close to p99 usage plus a safety margin for allocations and fragmentation, and set the request to a realistic baseline to avoid over packing. For critical services, aim for Guaranteed QoS and reserve node capacity to avoid eviction.",
      "Node level configuration matters. Ensure `kube-reserved` and `system-reserved` are set so system daemons do not steal pod resources. Tune eviction thresholds such as `evictionHard` to avoid sudden pressure. With cgroup v2, consider enabling swap with a small `memory.swap.max` if your workloads tolerate it, otherwise keep swap disabled to avoid latency spikes. Finally, align the container runtime and the kernel version so cgroup metrics are accurate.",
      "Close the loop with load tests and repeatable playbooks. Run a steady load until memory and CPU plateau, then increase concurrency and watch throttling and GC behavior. Tune runtimes for container limits, for example by setting Go `GODEBUG=madvdontneed=1` in older versions or using `GOMEMLIMIT` in newer releases. Document your targets and re-evaluate after each release. Resource tuning is not a one time task, it is operational hygiene.",
    ],
  },
];

export const getAllPosts = () =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug);
