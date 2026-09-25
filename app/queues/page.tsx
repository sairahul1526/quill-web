export default function Queues() {
  return <main><p className="eyebrow">QUEUES</p><h1>Queue health</h1><p className="lede">Concurrency and waiting tasks by queue.</p><section className="panel"><table><thead><tr><th>Queue</th><th>Waiting</th><th>Concurrency</th><th>Retry policy</th></tr></thead><tbody><tr><td>notifications</td><td>42</td><td>8</td><td>5 attempts</td></tr><tr><td>billing</td><td>17</td><td>4</td><td>5 attempts</td></tr><tr><td>exports</td><td>6</td><td>2</td><td>3 attempts</td></tr></tbody></table></section></main>;
}
