import { execFileSync } from 'node:child_process'

const DOC_ONLY_PATTERNS = [
  /^README\.md$/i,
  /^SEO_IMPLEMENTATION_PLAN\.md$/i,
  /^CHANGELOG\.md$/i,
  /^CONTRIBUTING\.md$/i,
  /^LICENSE$/i,
  /^\.env\.example$/i,
  /^docs\//i,
]

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
}

function commitExists(sha) {
  if (!sha) return false
  try {
    git(['cat-file', '-e', `${sha}^{commit}`])
    return true
  } catch {
    return false
  }
}

function changedFiles() {
  const previousSha = process.env.VERCEL_GIT_PREVIOUS_SHA
  const currentSha = process.env.VERCEL_GIT_COMMIT_SHA || 'HEAD'

  if (commitExists(previousSha)) {
    return git(['diff', '--name-only', previousSha, currentSha]).split('\n').filter(Boolean)
  }

  if (commitExists('HEAD^')) {
    return git(['diff', '--name-only', 'HEAD^', 'HEAD']).split('\n').filter(Boolean)
  }

  return git(['show', '--pretty=', '--name-only', 'HEAD']).split('\n').filter(Boolean)
}

const files = changedFiles()

if (files.length === 0) {
  console.log('No changed files detected. Skipping Vercel build.')
  process.exit(0)
}

const isDocsOnly = files.every(file => DOC_ONLY_PATTERNS.some(pattern => pattern.test(file.replaceAll('\\', '/'))))

if (isDocsOnly) {
  console.log('Only documentation/config-example files changed. Skipping Vercel build.')
  console.log(files.map(file => `- ${file}`).join('\n'))
  process.exit(0)
}

console.log('Build-relevant files changed. Continuing Vercel build.')
console.log(files.map(file => `- ${file}`).join('\n'))
process.exit(1)
