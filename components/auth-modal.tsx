"use client"

import { useState } from "react"
import { signIn } from "@/lib/auth-client"
import { useAuth } from "@/components/auth-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function detectInAppBrowser(): { isInApp: boolean; appName: string } {
  if (typeof navigator === "undefined") return { isInApp: false, appName: "" }

  const ua = navigator.userAgent || ""

  // Common in-app browser identifiers
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return { isInApp: true, appName: "Facebook" }
  if (/Instagram/i.test(ua)) return { isInApp: true, appName: "Instagram" }
  if (/Messenger/i.test(ua)) return { isInApp: true, appName: "Messenger" }
  if (/Twitter|X\//i.test(ua)) return { isInApp: true, appName: "X (Twitter)" }
  if (/Snapchat/i.test(ua)) return { isInApp: true, appName: "Snapchat" }
  if (/LinkedIn/i.test(ua)) return { isInApp: true, appName: "LinkedIn" }
  if (/TikTok|BytedanceWebview|musical_ly/i.test(ua)) return { isInApp: true, appName: "TikTok" }
  if (/Discord/i.test(ua)) return { isInApp: true, appName: "Discord" }
  if (/Slack/i.test(ua)) return { isInApp: true, appName: "Slack" }
  if (/Telegram/i.test(ua)) return { isInApp: true, appName: "Telegram" }
  if (/WhatsApp/i.test(ua)) return { isInApp: true, appName: "WhatsApp" }
  if (/Line\//i.test(ua)) return { isInApp: true, appName: "LINE" }
  if (/WeChat|MicroMessenger/i.test(ua)) return { isInApp: true, appName: "WeChat" }

  // Generic WebView detection (Android WebView or iOS UIWebView/WKWebView patterns)
  if (/\bwv\b/i.test(ua) || /WebView/i.test(ua)) return { isInApp: true, appName: "this app" }

  return { isInApp: false, appName: "" }
}

function InAppBrowserWarning({ appName }: { appName: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-4 py-2">
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-center text-sm text-amber-200">
        <p className="font-medium">
          Google sign-in doesn&apos;t work inside {appName}&apos;s browser.
        </p>
        <p className="mt-1 text-amber-200/70">
          Open this page in Safari or Chrome to sign in.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full gap-2" onClick={handleCopyLink}>
          {copied ? "Copied!" : "Copy link to open in browser"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Tap <strong>&#8943;</strong> or <strong>Open in Browser</strong> in {appName} to switch.
        </p>
      </div>
    </div>
  )
}

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuth()
  const [inAppInfo] = useState(() => detectInAppBrowser())

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            Sign in to Soundcheck
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in to rate songs, save your favorites, and more.
          </DialogDescription>
        </DialogHeader>
        {inAppInfo.isInApp ? (
          <InAppBrowserWarning appName={inAppInfo.appName} />
        ) : (
          <div className="py-2">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() =>
                signIn.social({
                  provider: "google",
                  callbackURL: window.location.href,
                })
              }
            >
              <GoogleIcon />
              Continue with Google
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
