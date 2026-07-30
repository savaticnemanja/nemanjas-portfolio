import { unsubscribe } from '@lib/actions'

/**
 * RFC 8058 one-click unsubscribe.
 *
 * This is the endpoint named in the `List-Unsubscribe` header, and it is what
 * Gmail and Apple Mail POST to when someone uses the unsubscribe control in the
 * client's own chrome rather than the link in the footer. There is no person
 * looking at the response, so the body is not the point — the status code is.
 *
 * POST only, deliberately. A GET here would be followed by every link scanner
 * and prefetcher that touches the message, and each one would unsubscribe
 * somebody who never asked to leave.
 */
export async function POST(request) {
  const url = new URL(request.url)
  const email = url.searchParams.get('e')?.trim() ?? ''
  const token = url.searchParams.get('t')?.trim() ?? ''

  const result = await unsubscribe(email, token)

  /* 400 for a bad signature, 502 when Resend refused — the sending client only
     ever reports "unsubscribe failed" to the reader, but the distinction is what
     the logs need. */
  const status = result.status === 'success' ? 200 : result.status === 'invalid' ? 400 : 502

  return Response.json({ status: result.status }, { status })
}

/**
 * Some clients probe the URL with a GET before offering the control. Answering
 * 405 with an Allow header tells them the endpoint is real and POST-only, which
 * is the honest answer; the human-facing route is /unsubscribe.
 */
export async function GET() {
  return Response.json(
    { status: 'method_not_allowed', use: '/unsubscribe' },
    { status: 405, headers: { Allow: 'POST' } },
  )
}
